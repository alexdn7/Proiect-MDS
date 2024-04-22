import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  Select,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  getAllProjects,
  getProjectMembers,
} from "../services/ProjectService";

export default function TicketForm() {
  const [projectMembers, setProjectMembers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [details, setDetails] = useState({
    title: "",
    description: "",
    priority: "",
    createdBy: "1",
    projectId: "",
    assignedTo: "",
    status: "CREATED"
  });

  useEffect(() => {
    getAndSetProjects();
  }, []);

  function getAndSetProjectInfo(projectId) {
    getProjectMembers(projectId)
      .then((response) => {
        setProjectMembers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function getAndSetProjects() {
    getAllProjects()
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  return (
    <Flex
      justifyContent="center"
      width="100%"
      height={"100%"}
      alignItems={"center"}
    >
      <VStack
        width="30%"
        border="1.5px solid black"
        borderRadius="5px"
        padding="2%"
        backgroundColor="white"
      >
        <Heading>Add a new ticket</Heading>
        <form style={{ width: 100 + "%", padding: 10 }}>
          <FormControl isRequired="true" marginBottom="5px">
            <FormLabel>Title</FormLabel>
            <InputGroup>
              <Input
                as="textarea"
                type="text"
                value={details.title}
                onChange={(e) =>
                  setDetails({ ...details, title: e.target.value })
                }
              />
            </InputGroup>
          </FormControl>
          <FormControl isRequired="true" marginBottom="5px">
            <FormLabel>Description</FormLabel>
            <InputGroup>
              <Input
                as="textarea"
                type="text"
                value={details.description}
                onChange={(e) =>
                  setDetails({ ...details, description: e.target.value })
                }
              />
            </InputGroup>
          </FormControl>
          <FormControl isRequired={true} marginBottom="5px">
            <FormLabel>Priority</FormLabel>
            <InputGroup>
              <Select
                value={details.priority}
                onChange={(e) => {
                  setDetails({
                    ...details,
                    priority: e.target.value,
                  });
                }}
              >
                <option>LOW</option>
                <option>MEDIUM</option>
                <option>HIGH</option>
              </Select>
            </InputGroup>
          </FormControl>
          <FormControl isRequired={true} marginBottom="5px">
            <FormLabel>Project</FormLabel>
            <InputGroup>
              <Select
                value={details.projectId}
                onChange={(e) => {
                  setDetails({
                    ...details,
                    projectId: parseInt(e.target.value),
                  });
                }}
                color="black"
              >
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.title}
                  </option>
                ))}
              </Select>
            </InputGroup>
          </FormControl>
          {details.projectId === "" ? null : (
            <FormControl isRequired={true} marginBottom="5px">
              <FormLabel>Assign to</FormLabel>
              <InputGroup>
                <Select
                  onClick={() => getAndSetProjectInfo(details.projectId)}
                  value={details.projectId}
                  onChange={(e) => {
                    setDetails({
                      ...details,
                      projectId: parseInt(e.target.value),
                    });
                  }}
                >
                  {projectMembers.map((member) => (
                    <option key={member.id} value={member.id}>
                      {member.name} - {member.role}
                    </option>
                  ))}
                </Select>
              </InputGroup>
            </FormControl>
          )}
          <Button
            type="submit"
            width="80%"
            // isDisabled={!isCompleted()}
            backgroundColor={"teal"}
            marginTop="15px"
          >
            Create
          </Button>
        </form>
      </VStack>
    </Flex>
  );
}
