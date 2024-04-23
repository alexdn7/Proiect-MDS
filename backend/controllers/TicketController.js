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

const getAllTickets = async (request, response) => {
  try {
    const queryKeys = Object.keys(request.query);
    const createdQuery = {};

    if (queryKeys.length !== 0) {
      {
        queryKeys.forEach((key) => {
          if (
            ![
              "priority",
              "createdByUserId",
              "assignedToUserId",
              "status",
            ].includes(key)
          ) {
            throw new Error("Invalid query parameter!");
          } else {
            if (key === "createdByUserId" || key === "assignedToUserId") {
              createdQuery[key] = parseInt(request.query[key]);
            } else {
              createdQuery[key] = request.query[key];
            }
          }
        });
      }
    }
    const tickets = await prisma.ticket.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        priority: true,
        createdByUserId: true,
        createdBy: {
          select: {
            name: true
          }
        },
        projectId: true,
        project: {
          select: {
            title: true,
          },
        },
        assignedToUserId: true,
        assignedTo: {
          select: {
            name: true,
          },
        },
        status: true,
      },
      where: {
        ...createdQuery,
      },
    });
    response.status(StatusCodes.OK).json(tickets);
  } catch (error) {
    response.status(StatusCodes.BAD_REQUEST).json(`${error}`);
  }
};
module.exports = { createTicket, getAllTickets };
