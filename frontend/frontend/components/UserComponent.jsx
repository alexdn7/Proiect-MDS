import { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { deleteUser, getUserById } from "../services/UserService";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Flex,
  Heading,
  VStack,
  HStack,
  Text,
  Button,
  Box,
} from "@chakra-ui/react";
import { getUserInfoFromCookiesToken } from "../utils/TokenUtil";
import { Link } from "react-router-dom";

export default function UserComponent() {
  const [userDetails, setUserDetails] = useState(null);
  const { id } = useParams();
  const userInfo = getUserInfoFromCookiesToken();

  useEffect(() => {
    getAndSetUser();
  }, []);

  async function getAndSetUser() {
    getUserById(id)
      .then((response) => {
        setUserDetails(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async function handleDeleteUser(id) {
    try {
      await deleteUser(id);
      setUserDetails(null);
    } catch (error) {
      console.error(error);
    }
  }

  if (!userDetails) {
    return (
      <Center>
        <Heading color={"red"}>User with given ID doesn't exist!</Heading>
      </Center>
    );
  }

  return (
    <Flex justifyContent={"center"}>
      <Center>
        <Card>
          <CardHeader>
            <h1>{userDetails.name}'s profile</h1>
          </CardHeader>
          <CardBody>
            <VStack>
              <Text>ID: {userDetails.id}</Text>
              <Text>Role: {userDetails.role}</Text>
              <Text>Projects: </Text>
              <Text>Tickets: </Text>
              <HStack>
                <Link to={"/users/"}>
                  <Button bg={"green"}>Go back</Button>
                </Link>
                {userInfo.role === "ADMIN" ? (
                  <HStack>
                    <Button bg={"orange"}>Update user</Button>
                    <Link to={"/users/"}>
                      <Button
                        bg={"red"}
                        onClick={() => handleDeleteUser(userDetails.id)}
                      >
                        Delete user
                      </Button>
                    </Link>
                  </HStack>
                ) : null}
              </HStack>
            </VStack>
          </CardBody>
        </Card>
      </Center>
    </Flex>
  );
}
