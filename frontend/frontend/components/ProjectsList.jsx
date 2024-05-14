import {
  Button,
  Grid,
  Text,
  HStack,
  Heading,
  GridItem,
  Box,
} from "@chakra-ui/react";
import { deleteProject, getAllProjects } from "../services/ProjectService";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ProjectsList() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getAndSetProjects();
  }, []);

  function getAndSetProjects() {
    getAllProjects()
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async function handleDeleteProject(id) {
    try {
      await deleteProject(id);
      getAndSetProjects();
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <Grid
      templateColumns="33% 33% 33%"
      padding="30px"
      gap="10px"
      maxWidth="100%"
    >
      {projects.map((project) => (
        <GridItem
          padding="1%"
          backgroundColor="#242424"
          border="2px solid black"
          boxShadow="1px 1px 5px 2px black"
          key={project.id}
          borderRadius="10px"
        >
          <Heading>{project.title}</Heading>
          <Box overflowX="auto scroll">
            <Text>{project.description}</Text>
          </Box>

          <Text>
            Manager:{" "}
            <Link
              to={`/users/${project.managedByUserId}`}
              style={{ textDecoration: "none", color: "white" }}
            >
              {project.managedByUser.name}
            </Link>
          </Text>
          <HStack justifyContent={"center"} marginTop="2">
            <Link to={`/projects/${project.id}`}>
              <Button size="sm">View details</Button>
            </Link>
            <Button size="sm" onClick={() => handleDeleteProject(project.id)}>
              Delete
            </Button>
          </HStack>
        </GridItem>
      ))}
    </Grid>
  );
}
