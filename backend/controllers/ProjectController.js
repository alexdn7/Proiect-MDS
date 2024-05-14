const { PrismaClient } = require("@prisma/client");
const { request, response } = require("express");
const { StatusCodes } = require("http-status-codes");
const prisma = new PrismaClient();

const createProject = async (request, response) => {
  try {
    const { title, description, managedByUserId, members } = request.body;
    const createdProject = await prisma.project.create({
      data: {
        title,
        description,
        managedByUserId,
        members: {
          create: members.map((member) => ({
            user: {
              connect: {
                id: member,
              },
            },
          })),
        },
      },
      include: {
        members: true,
      },
    });

    response.status(StatusCodes.CREATED).json(createdProject);
  } catch (error) {
    response.status(StatusCodes.BAD_REQUEST).json(`${error}`);
  }
};

const getAllProjects = async (request, response) => {
  try {
    const projects = await prisma.project.findMany({
      include: {
        managedByUser: {
          select: {
            name: true
          }
        }
      }
    });
    response.status(StatusCodes.OK).json(projects);
  } catch (error) {
    response.status(StatusCodes.BAD_REQUEST).json(`${error}`);
  }
};

const getProjectById = async (request, response) => {
  try {
    const project = await prisma.project.findFirstOrThrow({
      where: {
        id: parseInt(request.params.id),
      },
      include: {
        members: true,
      },
    });
    response.status(StatusCodes.OK).json(project);
  } catch (error) {
    if (error.code === "P2025") {
      response
        .status(StatusCodes.BAD_REQUEST)
        .json(`Project with given ID doesn't exist!`);
    } else {
      response.status(StatusCodes.BAD_REQUEST).json(`${error}`);
    }
  }
};

const getProjectMembers = async (request, response) => {
  try {
    const projectMembers =
      await prisma.$queryRaw`select u.id, u.name, u.role from proiect_mds.user u
    join proiect_mds.projects_users pu on pu.userId = u.id
      where pu.projectID = ${request.params.id}`;
    response.status(StatusCodes.OK).json(projectMembers);
  } catch (error) {
    if (error.code === "P2025") {
      response
        .status(StatusCodes.BAD_REQUEST)
        .json(`Project with given ID doesn't exist!`);
    } else {
      response.status(StatusCodes.BAD_REQUEST).json(`${error}`);
    }
  }
};

const deleteProject = async (request, response) => {
  try {
    const { id } = request.params;

    const deletedProject = await prisma.project.delete({
      where: {
        id: id,
      },
    });
    
    response
      .status(StatusCodes.OK)
      .json(`Project with ID ${deletedProject.id} was successfully deleted!`);
  } catch (error) {
    if (error.code === "P2025") {
      response
        .status(StatusCodes.BAD_REQUEST)
        .json(`Project with given ID doesn't exist!`);
    } else {
      response.status(StatusCodes.BAD_REQUEST).json(`${error}`);
    }
  }
};

module.exports = {
  createProject,
  getAllProjects,
  getProjectById,
  getProjectMembers,
  deleteProject,
};
