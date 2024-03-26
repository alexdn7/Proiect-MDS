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
    const user = await prisma.user.findUniqueOrThrow({
      where: { id: parseInt(id) },
    });

    await prisma.user.delete({
      where: { id: parseInt(id) },
    });
    response
      .status(StatusCodes.OK)
      .json({ message: `User with ID ${id} succesfully deleted!` });
  } catch (error) {
    response
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: `Error deleting user! ${error}` });
  }
};

module.exports = { getAllUsers, deleteUser };
