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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { deleteUser, getAllUsers } from "../services/UserService";
import { getUserInfoFromCookiesToken } from "../utils/TokenUtil";
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
    <Grid templateColumns={"1fr 4fr"} height="90vh" margin="0px" padding="0">
      <GridItem bg={"white"} margin={"0px"}>
        <Center h="90vh">
          <VStack>
            <span>Filter by</span>
            <HStack>
              <span>ROLE:</span>
              <Select>
                <option>TESTER</option>
                <option>DEVELOPER</option>
                <option>MANAGER</option>
                <option>ADMIN</option>
              </Select>
            </HStack>
            <span>Order by</span>
            <Select>
              <option>ID</option>
              <option>Name</option>
              <option>Role</option>
            </Select>
            <span>Ordering direction</span>
            <Select>
              <option>Ascending</option>
              <option>Descending</option>
            </Select>
          </VStack>
        </Center>
      </GridItem>
      <Flex
        h={"90vh"}
        justifyContent={"flex-start"}
        flexWrap={"wrap"}
        marginLeft={"10px"}
      >
        {users.map((user) => (
          <Box key={user.id} width="30%" margin="5px">
            <Card key={user.id} padding={"10px"}>
              <CardHeader>
                <h2>Name: {user.name}</h2>
              </CardHeader>
              <CardBody>
                <span>ID: {user.id}</span>
                <h2>Role: {user.role}</h2>
              </CardBody>
              <VStack>
                <h4>Actions</h4>
                <HStack></HStack>
                <Button bg={"green"}>View profile</Button>
                {userInfo.role === "ADMIN" ? (
                  <Button bg={"red"} onClick={() => handleDeleteUser(user.id)}>
                    Delete user
                  </Button>
                ) : (
                  <div></div>
                )}
                <HStack />
              </VStack>
            </Card>
          </Box>
        ))}
      </Flex>
      <GridItem />
    </Grid>
  );
}
