import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  InputGroup,
  Select,
  Spacer,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getAllProjects, getProjectMembers } from "../services/ProjectService";
import { createTicket } from "../services/TicketService";
import { useNavigate } from "react-router-dom";

export default function TicketForm({ userDetails }) {
  const navigate = useNavigate();
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
      const response = await createTicket(details);

      if (response.status === 201) {
        navigate("/tickets");
      }
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
          minWidth="fit-content"
          border="1.5px solid black"
          borderRadius="15px"
          padding="2%"
          boxShadow="0px 0px 10px 10px black"
          zIndex="1"
          justifyContent="center"
        >
          <Heading>Add a new ticket</Heading>
          <form style={{ width: 100 + "%" }} onSubmit={handleSubmit}>
            <VStack width="100%" justifyContent="center" gap="20px">
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
                    borderRadius="5px"
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
                    borderRadius="5px"
                  />
                </InputGroup>
              </FormControl>

              <FormControl isRequired={true} width="90%">
                <HStack>
                  <FormLabel>Priority</FormLabel>
                  <Spacer />
                  <InputGroup>
                    <select
                      value={details.priority}
                      onChange={(e) => {
                        setDetails({
                          ...details,
                          priority: e.target.value,
                        });
                      }}
                      style={{ width: 90 + "%", borderRadius: 5 + "px" }}
                    >
                      <option value="" disabled>
                        Select priority
                      </option>
                      <option>LOW</option>
                      <option>MEDIUM</option>
                      <option>HIGH</option>
                    </select>
                  </InputGroup>
                </HStack>
              </FormControl>

              <FormControl isRequired={true} width="90%">
                <HStack>
                  <FormLabel htmlFor="selectProject">Project</FormLabel>
                  <Spacer />
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
                      style={{ width: 90 + "%", borderRadius: 5 + "px" }}
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
                </HStack>
              </FormControl>

              {details.projectId === "" ? null : (
                <FormControl isRequired={true} width="90%">
                  <HStack>
                    <FormLabel htmlFor="selectDeveloper" width="30%">Assign to</FormLabel>
                    <Spacer />
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
                        style={{ width: 88 + "%",  borderRadius: 5 + "px" }}
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
                  </HStack>
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
