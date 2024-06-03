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
            name: true,
          },
        },
      },
    });
    response.status(StatusCodes.OK).json(projects);
  } catch (error) {
    response.status(StatusCodes.BAD_REQUEST).json(`${error}`);
  }
};

const getProjectById = async (request, response) => {
  try {
    const { id } = request.params;

    const project = await prisma.project.findFirstOrThrow({
      where: {
        id: id,
      },
      include: {
        members: {
          select: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                role: true,
              },
            },
          },
        },
        managedByUser: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
    response.status(StatusCodes.OK).json(project);
  } catch (error) {
    if (error.code === "P2025") {
      response
        .status(StatusCodes.BAD_REQUEST)
        .json(`Project with given ID doesn't exist!`);
    } else {
      response.status(StatusCodes.BAD_REQUEST).send(error.message);
    }
  }
};

const getProjectsCount = async (request, response) => {
  try {
    const count = await prisma.project.count();
    response.status(StatusCodes.OK).json({ total: count });
  } catch (error) {
    response.status(StatusCodes.BAD_REQUEST).send(error.message);
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

const updateProject = async (request, response) => {
  try {
    const { id } = request.params;
    const { title, description, members } = request.body;

    const updatedProject = await prisma.project.update({
      where: {
        id: id,
      },
      data: {
        title,
        description,
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
    response.status(StatusCodes.OK).json(updatedProject);
  } catch (error) {
    response.status(StatusCodes.BAD_REQUEST).json(`${error}`);
  }
};

const removeUserFromProject = async (request, response) => {
  try {
    const { projectId, userId } = request.params;
    await prisma.projects_Users.delete({
      where: {
        projectId_userId: {
          projectId: projectId,
          userId: userId,
        },
      },
    });

    response
      .status(StatusCodes.OK)
      .send(
        `User with ID ${userId} removed succesfully from project ${projectId}!`
      );
  } catch (error) {
    response.status(StatusCodes.BAD_REQUEST).json(`${error}`);
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

    // In order to give explicit errors, I compared the error code to P2025 (prisma error for record not found);
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
  getProjectsCount,
  getProjectMembers,
  updateProject,
  removeUserFromProject,
  deleteProject,
};
