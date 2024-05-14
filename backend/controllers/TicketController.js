const { PrismaClient, Status } = require("@prisma/client");
const { request, response } = require("express");
const { StatusCodes, CREATED } = require("http-status-codes");
const prisma = new PrismaClient();

const createTicket = async (request, response) => {
  try {
    const { title, description, createdByUserId, priority, projectId, assignedToUserId } =
      request.body;
    const createdTicket = await prisma.ticket.create({
      data: {
        title: title,
        description: description,
        priority: priority,
        createdByUserId: createdByUserId,
        createdOn: new Date(),
        projectId: projectId,
        assignedToUserId: assignedToUserId,
        status: "CREATED",
      },
    });
    response.status(StatusCodes.CREATED).json(createdTicket);
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
            createdQuery[key] = request.query[key];
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
        createdOn: true,
        createdByUserId: true,
        createdBy: {
          select: {
            name: true,
          },
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
        lastModifiedOn: true,
        editedBy: {
          select: {
            name: true,
          },
        },
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

const getTicketById = async (request, response) => {
  try {
    const { id } = request.params;

    const ticket = await prisma.ticket.findFirstOrThrow({
      select: {
        id: true,
        title: true,
        description: true,
        priority: true,
        createdOn: true,
        createdByUserId: true,
        createdBy: {
          select: {
            name: true,
          },
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
        lastModifiedOn: true,
        editedBy: {
          select: {
            name: true,
          },
        },
      },
      where: {
        id: id,
      },
    });
    response.status(StatusCodes.OK).json(ticket);
  } catch (error) {
    response.status(StatusCodes.BAD_REQUEST).json(`${error}`);
  }
};

const updateTicket = async (request, response) => {
  try {
    const { id } = request.params;
    const {
      title,
      description,
      priority,
      assignedToUserId,
      status,
      editedByUserId,
    } = request.body;

    const updatedTicket = await prisma.ticket.update({
      where: {
        id: id,
      },
      data: {
        title: title,
        description: description,
        priority: priority,
        assignedToUserId: assignedToUserId,
        status: status,
        lastModifiedOn: new Date(),
        editedByUserId: editedByUserId,
      },
    });
    response.status(StatusCodes.OK).json(updatedTicket);
  } catch (error) {
    response.status(StatusCodes.BAD_REQUEST).json(`${error}`);
  }
};

const deleteTicket = async (request, response) => {
  try {
    const { id } = request.params;

    const deletedTicket = await prisma.ticket.delete({
      where: {
        id: id,
      },
    });

    response
      .status(StatusCodes.OK)
      .json(`Ticket with ID ${deletedTicket.id} was succesfully deleted!`);
  } catch (error) {
    if (error.code === "P2025") {
      response
        .status(StatusCodes.BAD_REQUEST)
        .json(`Ticket with given ID doesn't exist!`);
    } else {
      response.status(StatusCodes.BAD_REQUEST).json(`${error}`);
    }
  }
};
module.exports = {
  createTicket,
  getAllTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
};
