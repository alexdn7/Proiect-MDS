import {
  Button,
  Grid,
  Text,
  HStack,
  Heading,
  GridItem,
  Box,
  Flex,
  VStack,
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
    <Flex
      justifyContent="center"
      width="100%"
      height="100%"
      minHeight="fit-content"
    >
      <VStack
        width="90%"
        minWidth="fit-content"
        border="2px solid black"
        boxShadow="0px 0px 10px 5px black"
        borderRadius="15px"
        alignSelf="center"
      >
        <Heading>All projects</Heading>
        <Grid
          templateColumns="33% 33% 33%"
          padding="30px"
          gap="15px"
          minWidth="fit-content"
          width="95%"
        >
          {projects.map((project) => (
            <GridItem
              padding="1%"
              border="2px solid black"
              boxShadow="5px 5px 5px 5px black"
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
                <Button
                  size="sm"
                  onClick={() => handleDeleteProject(project.id)}
                >
                  Delete
                </Button>
              </HStack>
            </GridItem>
          ))}
        </Grid>
      </VStack>
    </Flex>
  );
}
