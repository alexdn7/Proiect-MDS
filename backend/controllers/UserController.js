const { PrismaClient } = require("@prisma/client");
const { request, response } = require("express");
const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcryptjs");
const prisma = new PrismaClient();

const getAllUsers = async (request, response) => {
  try {
    // If we want to get only users with a specified role, we have to add it in a where condition
    const { role } = request.query;
    console.log(role);
    const users = await prisma.user.findMany({
      where: {
        role: role,
      },
    });
    const usersWithoutPassword = users.map((user) => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
    response.status(StatusCodes.OK).json(usersWithoutPassword);
  } catch (error) {
    response.status(StatusCodes.BAD_REQUEST).send(error.message);
  }
};

const getUsersCount = async (request, response) => {
  try {
    const roles = ["ADMIN", "TESTER", "DEVELOPER", "MANAGER"];

    // I want to know the total number and the number of users grouped per role.
    // So, I have to count for every role and append in a JSON.
    const counts = await Promise.all(
      roles.map(async (role) => {
        const count = await prisma.user.count({
          where: {
            role: role,
          },
        });
        return { role: role, count: count };
      })
    );

    counts.push({
      total: counts.map((count) => count.count).reduce((a, b) => a + b),
    });

    response.status(StatusCodes.OK).json({ counts });
  } catch (error) {
    response.status(StatusCodes.BAD_REQUEST).send(error.message);
  }
};

const getUserById = async (request, response) => {
  try {
    const { id } = request.params;
    const user = await prisma.user.findFirstOrThrow({
      where: {
        id: id,
      },
      select: {
        name: true,
        email: true,
        role: true,
        registeredOn: true,
        projects: {
          select: {
            project: {
              select: {
                id: true,
                title: true,
              },
            },
          },
        },
      },
    });

    response.status(StatusCodes.OK).json(user);
  } catch (error) {
    response.status(StatusCodes.BAD_REQUEST).send(error.message);
  }
};

const updateUser = async (request, response) => {
  try {
    const { id } = request.params;
    const { name, role, password } = request.body;
    const updateDto = { name, role };

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateDto.password = hashedPassword;
    }

    const updatedUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
        ...updateDto,
      },
    });

    response.status(StatusCodes.OK).json(updatedUser);
  } catch (error) {
    response.status(StatusCodes.BAD_GATEWAY).send(error.message);
  }
};

const deleteUser = async (request, response) => {
  try {
    const { id } = request.params;

    const deletedUser = await prisma.user.delete({
      where: { id: id },
    });
    response
      .status(StatusCodes.OK)
      .json({ message: `User with ID ${deletedUser.id} succesfully deleted!` });
  } catch (error) {
    response.status(StatusCodes.BAD_REQUEST).send(error.message);
  }
};

module.exports = {
  getAllUsers,
  getUsersCount,
  getUserById,
  updateUser,
  deleteUser,
};
