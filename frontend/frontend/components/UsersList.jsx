import {
  Grid,
  GridItem,
  Center,
  HStack,
  Flex,
  Card,
  CardBody,
  VStack,
  Button,
  CardHeader,
  Text,
  Select,
  Box,
  Heading,
  Spacer,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { deleteUser, getAllUsers } from "../services/UserService";
import { getUserInfoFromCookiesToken } from "../utils/TokenUtil";
import { Link } from "react-router-dom";
export default function UsersList() {
  const [users, setUsers] = useState([]);
  const userInfo = getUserInfoFromCookiesToken();

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

  async function handleDeleteUser(id) {
    try {
      await deleteUser(id);
      getAndSetUsers();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Flex justifyContent="center" width="100%" height="auto">
      <VStack
        width="93%"
        height="auto full"
        justifyContent="center"
        border="2px solid black"
        boxShadow="0px 0px 10px 5px black"
        paddingY="1%"
        marginTop="3%"
        borderRadius="20px"
      >
        <Heading>All users</Heading>
        <HStack
          width="90%"
          paddingX="2%"
          height="auto full"
          borderRadius="30px"
          border="2px solid black"
          boxShadow="5px 5px 5px 5px black"
          marginBottom="50px"
        >
          <h3>Filter</h3>
          <Spacer />
          <select
            // onChange={(e) => handleChange(e, "priority")}
            defaultValue=""
            style={{ width: 15 + "%" }}
          >
            <option disabled value="">
              Role
            </option>
            <option key="ADMIN" value="ADMIN">
              ADMIN
            </option>
            <option key="TESTER" value="TESTER">
              TESTER
            </option>
            <option key="DEVELOPER" value="DEVELOPER">
              DEVELOPER
            </option>
            <option key="MANAGER" value="MANAGER">
              MANAGER
            </option>
          </select>
        </HStack>
        <Grid
          templateColumns="1fr 1fr 1fr"
          width="93%"
          gap="2%"
          minWidth="fit-content"
        >
          {users.map((user) => (
            <GridItem
              key={user.id}
              width="100%"
              boxShadow="0px 0px 10px 10px black"
              borderRadius="20px"
              marginBottom="5%"
            >
              <Heading>{user.name}</Heading>
              <Text>{user.email}</Text>
              <Text>{user.role}</Text>

              <VStack>
                <Text>Actions</Text>
                <HStack marginBottom="10px">
                  <Link to={`/users/${user.id}`}>
                    <Button bg={"green"}>View profile</Button>
                  </Link>
                  
                  {userInfo.role === "ADMIN" ? (
                    <Button
                      bg={"red"}
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      Delete user
                    </Button>
                  ) : (
                    <div></div>
                  )}
                </HStack>
              </VStack>
            </GridItem>
          ))}
        </Grid>
      </VStack>
    </Flex>
  );
}
