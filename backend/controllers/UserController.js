const { PrismaClient } = require("@prisma/client");
const { request, response } = require("express");
const { StatusCodes } = require("http-status-codes");
const prisma = new PrismaClient();

const getAllUsers = async (request, response) => {
  try {
    const users = await prisma.user.findMany();
    const usersWithoutPassword = users.map((user) => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
    response.status(StatusCodes.OK).json(usersWithoutPassword);
  } catch (error) {
    response
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: `Errro fetching data ${error}` });
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
    response.status(StatusCodes.BAD_REQUEST).json(error.message);
  }
};

module.exports = { getAllUsers, deleteUser };
