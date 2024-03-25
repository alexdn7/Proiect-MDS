const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const { request, response } = require("express");
const { StatusCodes } = require("http-status-codes");
const SECRET_KEY = process.env.SECRET_KEY;
const jwt = require("jsonwebtoken");
const prisma = new PrismaClient();

const register = async (request, response) => {
  try {
    const { name, email, role, password } = request.body;
    if (await prisma.user.findUnique({ where: { email: email } })) {
      throw new Error("Already exista an user with this email!");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const savedUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        role: role,
        password: hashedPassword,
      },
    });
    const { id } = savedUser;
    const token = jwt.sign(
      {
        id,
        name,
        email,
        role,
      },
      SECRET_KEY,
      {
        expiresIn: "2h",
      }
    );

    response.status(StatusCodes.CREATED).json({ token });
  } catch (error) {
    response.status(StatusCodes.BAD_REQUEST).json({ message: `${error}` });
  }
};

const login = async (request, response) => {
  try {
    const { email, password } = request.body;
    const existingUser = await prisma.user.findUniqueOrThrow({
      where: { email: email },
    });
    if (!bcrypt.compare(password, existingUser.password)) {
      throw new Error("Incorrect password!");
    }

    const { id, name, role } = existingUser;
    const token = jwt.sign(
      {
        id,
        name,
        email,
        role,
      },
      SECRET_KEY,
      {
        expiresIn: "2h",
      }
    );

    response.status(StatusCodes.OK).json({ token });
  } catch (error) {
    response.status(StatusCodes.BAD_REQUEST).json({ message: `${error}` });
  }
};

const logout = async (request, response) => {
  try {
    response.clearCookie("userInfo");
    response.status(StatusCodes.OK).json({ message: "Logout succesful" });
  } catch (error) {
    response.status(StatusCodes.BAD_REQUEST).json({ message: `${error}` });
  }
};

module.exports = { register, login, logout };
