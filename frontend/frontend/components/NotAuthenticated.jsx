import { Button, Flex, HStack, Heading, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function NotAuthenticated() {
  return (
    <Flex height="100vh" justifyContent="center">
      <VStack
        alignSelf="center"
        border="1px solid black"
        boxShadow="0px 0px 10px 10px black"
        zIndex="1"
        padding="50px"
      >
        <Heading>You must be logged in to acces this page!</Heading>
        <HStack>
          <h2>Already have an account?</h2>
          <Link to="/login">
            <Button marginTop="10px" type="submit">
              Login
            </Button>
          </Link>
        </HStack>
        <HStack>
          <h2>Do you want to create an account?</h2>
          <Link to="/register">
            <Button marginTop="10px" type="submit">
              Register
            </Button>
          </Link>
        </HStack>
      </VStack>
    </Flex>
  );
}
