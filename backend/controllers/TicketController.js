const { PrismaClient } = require("@prisma/client");
const { request, response } = require("express");
const { StatusCodes } = require("http-status-codes");
const prisma = new PrismaClient();

const createTicket = async (request, response) => {
    try {
        
        const createdTicket = await prisma.ticket.create();
        response.status(StatusCodes.CREATED).json(`${error}`);
    } catch(error) {
        response.status(StatusCodes.BAD_REQUEST).json(`${error}`);
    }
}