import {
  CardBody,
  CardHeader,
  Center,
  Flex,
  Card,
  VStack,
  HStack,
  Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function HomePage({ isLogged }) {
  return (
    <>
      {isLogged ? (
        <p>Welcome back!</p>
      ) : (
        <Flex h="90vh" justifyContent="center">
          <Center>
            <VStack>
              <Card>
                <CardHeader>
                  <h1>You must be logged in to acces this page!</h1>
                </CardHeader>
                <CardBody>
                  <VStack>
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
                </CardBody>
              </Card>
            </VStack>
          </Center>
        </Flex>
      )}
    </>
  );
}
