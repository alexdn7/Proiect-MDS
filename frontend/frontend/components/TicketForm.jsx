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
import { getAllProjects, getProjectMembers } from "../services/ProjectService";
import { createTicket } from "../services/TicketService";

export default function TicketForm({ userDetails }) {
  const [projectMembers, setProjectMembers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [details, setDetails] = useState({
    title: "",
    description: "",
    priority: "",
    createdByUserId: userDetails.userId,
    projectId: "",
    assignedToUserId: "",
    status: "CREATED",
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

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = createTicket(details);
    } catch (error) {
      console.error(error);
    }
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

  function isCompleted() {
    if (
      Object.values(details).some(
        (value) =>
          value === "" || (value instanceof Array && value.length === 0)
      )
    ) {
      return false;
    }
    return true;
  }

  return (
    <Flex
      justifyContent="center"
      width="100%"
      height="100%"
      alignItems="center"
    >
      {/* "Admins can create a ticket, same as a Tester", for this reason we have to check if the user is an admin or a tester */}
      {userDetails.role === "TESTER" || userDetails.role === "ADMIN" ? (
        <VStack
          width="30%"
          border="1.5px solid black"
          borderRadius="5px"
          padding="2%"
          boxShadow="0px 0px 10px 10px black"
          zIndex="1"
          justifyContent="center"
        >
          <Heading>Add a new ticket</Heading>
          <form style={{ width: 100 + "%" }} onSubmit={handleSubmit}>
            <VStack width="100%" justifyContent="center">
              <FormControl isRequired="true" width="90%">
                <FormLabel>Title</FormLabel>
                <InputGroup>
                  <Input
                    as="textarea"
                    type="text"
                    width="100%"
                    value={details.title}
                    onChange={(e) =>
                      setDetails({ ...details, title: e.target.value })
                    }
                  />
                </InputGroup>
              </FormControl>
              <FormControl isRequired="true" width="90%">
                <FormLabel>Description</FormLabel>
                <InputGroup>
                  <Input
                    as="textarea"
                    type="text"
                    width="100%"
                    value={details.description}
                    onChange={(e) =>
                      setDetails({ ...details, description: e.target.value })
                    }
                  />
                </InputGroup>
              </FormControl>
              <FormControl isRequired={true} width="90%">
                <FormLabel>Priority</FormLabel>
                <InputGroup>
                  <select
                    value={details.priority}
                    onChange={(e) => {
                      setDetails({
                        ...details,
                        priority: e.target.value,
                      });
                    }}
                    style={{ width: 100 + "%" }}
                  >
                    <option>LOW</option>
                    <option>MEDIUM</option>
                    <option>HIGH</option>
                  </select>
                </InputGroup>
              </FormControl>
              <FormControl isRequired={true} width="90%">
                <FormLabel htmlFor="selectProject">Project</FormLabel>
                <InputGroup>
                  <select
                    id="selectProject"
                    value={details.projectId}
                    onChange={(e) => {
                      setDetails({
                        ...details,
                        projectId: e.target.value,
                      });
                    }}
                    style={{ width: 100 + "%" }}
                  >
                    <option disabled value="">
                      Choose project
                    </option>
                    {projects.length === 0 ? (
                      <option disabled>
                        There are no projects, try again!
                      </option>
                    ) : null}
                    {projects.map((project) => (
                      <option key={project.id} value={project.id}>
                        {project.title}
                      </option>
                    ))}
                  </select>
                </InputGroup>
              </FormControl>
              {details.projectId === "" ? null : (
                <FormControl isRequired={true} width="90%">
                  <FormLabel htmlFor="selectDeveloper">Assign to</FormLabel>
                  <InputGroup>
                    <select
                      id="selectDeveloper"
                      onClick={() => getAndSetProjectInfo(details.projectId)}
                      value={details.assignedToUserId}
                      onChange={(e) => {
                        setDetails({
                          ...details,
                          assignedToUserId: e.target.value,
                        });
                      }}
                      style={{ width: 100 + "%" }}
                    >
                      <option disabled value="">
                        Choose developer
                      </option>

                      {projectMembers.length === 0 ? (
                        <option disabled>
                          There are no members for this project, try again!
                        </option>
                      ) : null}

                      {projectMembers.map((member) => (
                        <option key={member.id} value={member.id}>
                          {member.name} - {member.role}
                        </option>
                      ))}
                    </select>
                  </InputGroup>
                </FormControl>
              )}
              <Button
                type="submit"
                width="80%"
                isDisabled={!isCompleted()}
                marginTop="15px"
              >
                Create
              </Button>
            </VStack>
          </form>
        </VStack>
      ) : (
        <VStack>
          <Heading>
            Only testers or admins are allowed to create tickets!
          </Heading>
        </VStack>
      )}
    </Flex>
  );
}
