import {
  Button,
  Grid,
  Text,
  HStack,
  Heading,
  VStack,
  GridItem,
  Center,
  Box,
} from "@chakra-ui/react";
import { deleteProject, getAllProjects } from "../services/ProjectService";
import { useEffect, useState } from "react";

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
      padding="20px"
      gap="10px"
      width="100%"
    >
      {projects.map((project) => (
        <GridItem padding="2" backgroundColor="teal" key={project.id}>
          <Heading>{project.title}</Heading>
          <Box overflowX="auto scroll">
            <Text>{project.description}</Text>
          </Box>
          <Text>Manager: {project.managedByUserId}</Text>
          <HStack justifyContent={"center"} marginTop="2">
            <Button size="sm">View details</Button>
            <Button size="sm" onClick={() => handleDeleteProject(project.id)}>Delete</Button>
          </HStack>
        </GridItem>
      ))}
    </Grid>
  );
}
