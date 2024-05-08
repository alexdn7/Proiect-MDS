import {
  CardBody,
  CardHeader,
  Center,
  Flex,
  Card,
  VStack,
  HStack,
  Button,
  Heading,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function HomePage({ isLogged, userDetails }) {
  return (
    <>
      {isLogged === true ? (
        <Flex justifyContent="center">
          <VStack bg="teal" width="90%" marginTop="30px">
            <Heading>Welcome back, {userDetails.name}!</Heading>
          </VStack>
        </Flex>
      ) : (
        <Flex height="100vh" justifyContent="center" bg="teal">
          <VStack
            alignSelf="center"
            border="1px solid black"
            backgroundColor="white"
            boxShadow="0px 0px 10px 10px #135D66"
            zIndex="1"
            padding="50px"
          >
            <Heading>You must be logged in to acces this page!</Heading>
            <HStack textAlign={"center"}>
              <h2>Already have an account?</h2>
              <Link to="/login">
                <Button marginTop="10px" type="submit" bg="aqua">
                  Login
                </Button>
              </Link>
            </HStack>
            <HStack textAlign={"center"}>
              <h2>Do you want to create an account?</h2>
              <Link to="/register">
                <Button marginTop="10px" type="submit" bg="aqua">
                  Register
                </Button>
              </Link>
            </HStack>
          </VStack>
        </Flex>
      )}
    </>
  );
}
