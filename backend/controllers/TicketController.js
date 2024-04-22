const { PrismaClient } = require("@prisma/client");
const { request, response } = require("express");
const { StatusCodes, CREATED } = require("http-status-codes");
const prisma = new PrismaClient();

const createTicket = async (request, response) => {
  try {
    const { title, description, priority, projectId, assignedTo } =
      request.body;
    const createdTicket = await prisma.ticket.create({
      data: {
        title: title,
        description: description,
        priority: priority,
        createdByUserId: 1,
        projectId: projectId,
        assignedToUserId: assignedTo,
        status: "CREATED",
      },
    });
    response.status(StatusCodes.CREATED).json(createTicket);
  } catch (error) {
    response.status(StatusCodes.BAD_REQUEST).json(`${error}`);
  }
};

module.exports = { createTicket };