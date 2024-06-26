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
import { getAllUsers } from "../services/UserService";
import { useEffect, useState } from "react";
import { createProject } from "../services/ProjectService";
import { useNavigate } from "react-router-dom";

export default function ProjectForm({ userDetails }) {
  const [users, setUsers] = useState([]);
  const [details, setDetails] = useState({
    title: "",
    description: "",
    managedByUserId: userDetails.userId,
    members: [],
  });
  const navigate = useNavigate();

  useEffect(() => {
    getAndSetUsers();
  }, []);

  function getAndSetUsers() {
    getAllUsers()
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await createProject(details);
      if (response.status == 201) {
        navigate("/projects");
      }
    } catch (error) {
      console.error(error);
    }
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
      <VStack
        width="30%"
        border="1.5px solid black"
        borderRadius="15px"
        padding="2%"
        boxShadow="0px 0px 10px 10px black"
        justifyContent="center"
        zIndex="1"
      >
        <Heading>Add a new project</Heading>
        <form style={{ width: 95 + "%", padding: 10 }} onSubmit={handleSubmit}>
          <FormControl isRequired="true" marginBottom="5px">
            <FormLabel htmlFor="titleInput">Title</FormLabel>
            <InputGroup>
              <Input
                id="titleInput"
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

          <FormControl isRequired="true" marginBottom="5px">
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

          <FormControl isRequired={true} marginBottom="5px">
            <FormLabel htmlFor="selectManager">Manager</FormLabel>
            <InputGroup>
              <select
                id="selectManager"
                onClick={getAndSetUsers()}
                value={details.managedByUserId}
                onChange={(e) => {
                  setDetails({
                    ...details,
                    managedByUserId: e.target.value,
                  });
                }}
                style={{
                  width: 100 + "%",
                  borderRadius: 5 + "px",
                  height: "30px",
                }}
              >
                {users
                  .filter((user) => user.role === "MANAGER")
                  .map((user) => (
                    <option
                      key={user.id}
                      value={user.id}
                      style={{
                        zIndex: 1,
                        overflow: "scroll",
                      }}
                    >
                      {user.name} - {user.role}
                    </option>
                  ))}
              </select>
            </InputGroup>
          </FormControl>

          <FormControl isRequired={true} marginBottom="10px">
            <FormLabel htmlFor="selectMembers">Select Members</FormLabel>
            <InputGroup>
              <select
                size="4"
                style={{ width: 100 + "%", borderRadius: 5 + "px" }}
                id="selectMembers"
                multiple={true}
                onChange={(e) =>
                  setDetails({
                    ...details,
                    members: Array.from(
                      e.target.selectedOptions,
                      (option) => option.value
                    ),
                  })
                }
              >
                {users
                  .filter(
                    (user) => user.role !== "MANAGER" && user.role !== "ADMIN"
                  )
                  .map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name} - {user.role}
                    </option>
                  ))}
              </select>
            </InputGroup>
          </FormControl>
          <Button type="submit" width="80%" isDisabled={!isCompleted()}>
            Create
          </Button>
        </form>
      </VStack>
    </Flex>
  );
}
