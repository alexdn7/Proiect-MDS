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

export default function ProjectForm() {
  const [users, setUsers] = useState([]);
  const [details, setDetails] = useState({
    title: "",
    description: "",
    managedByUserId: "",
    members: [1],
  });

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
  return (
    <Flex justifyContent="center" width="100%" height={"100%"} alignItems={"center"}>
      <VStack
        width="30%"
        border="1.5px solid black"
        borderRadius="5px"
        padding="2%"
        backgroundColor="white"
      >
        <Heading>Add a new project</Heading>
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
            <FormLabel>Manager</FormLabel>
            <InputGroup>
              <Select
                onClick={getAndSetUsers()}
                value={details.managedByUserId}
                onChange={(e) => {
                  setDetails({ ...details, managedByUserId: e.target.value });
                }}
              >
                {users.map((user) => (
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
              </Select>
            </InputGroup>
          </FormControl>
          <FormControl isRequired={true} marginBottom="10px">
            <FormLabel htmlFor="selectMembers">Select Members</FormLabel>
            <InputGroup>
              <select
                size="3"
                style={{width: 100 + "%"}}
                id="selectMembers"
                multiple={true}
                onChange={(e) =>
                  setDetails({
                    ...details,
                    members: Array.from(e.target.selectedOptions, option => option.value)
                  })
                }
              >
                {users.map((user) => (
                  <option
                    key={user.id}
                    value={user.id}
                  >
                    {user.name} - {user.role}
                  </option>
                ))}
              </select>
            </InputGroup>
          </FormControl>
          <Button type="submit">Create</Button>
        </form>
      </VStack>
    </Flex>
  );
}
