import React, { useState } from "react";
import {
  Card,
  CardBody,
  Center,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  HStack,
  VStack,
  Flex,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { login } from "../services/AuthService";
import { Link } from "react-router-dom";
import Cookies from 'js-cookie';

export default function LoginComponent() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError(false);
      const { email, password } = credentials;
      const response = await login({ email, password });
      const token = response.data.token;

      if (!token) {
        throw new Error("Token not found!");
      }

      Cookies.set("token", token);
    } catch (error) {
      setError(true);
      console.error(error);
    }
  }

  function handleClick() {
    setShowPassword(!showPassword);
  }

  return (
    <Flex h="90vh" justifyContent="center">
      <Center>
        <Card p="6" borderRadius="10px">
          <CardBody>
            <VStack>
              <form onSubmit={handleSubmit}>
                <FormControl isRequired="true">
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    value={credentials.email}
                    onChange={(e) => {
                      setCredentials({ ...credentials, email: e.target.value });
                    }}
                  ></Input>
                </FormControl>
                <FormControl isRequired="true">
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={credentials.password}
                      onChange={(e) => {
                        setCredentials({
                          ...credentials,
                          password: e.target.value,
                        });
                      }}
                    ></Input>
                    <InputRightElement>
                      <Button size="md" onClick={handleClick}>
                        {showPassword ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                {error ? (
                  <Text color="red">Invalid credentials! Try again!</Text>
                ) : null}
                <Button
                  marginTop="10px"
                  type="submit"
                  bg="aqua"
                  isDisabled={
                    credentials.email === "" || credentials.password === ""
                      ? true
                      : false
                  }
                >
                  Sign in
                </Button>
              </form>
              <HStack>
                <Text>New here?</Text>
                <Link to="/register">
                  <Button>Create an account</Button>
                </Link>
              </HStack>
            </VStack>
          </CardBody>
        </Card>
      </Center>
    </Flex>
  );
}
