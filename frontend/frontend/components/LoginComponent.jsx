import { useState } from "react";
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
  Heading,
  InputRightAddon,
} from "@chakra-ui/react";
import { login } from "../services/AuthService";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { BiSolidHide, BiShow } from "react-icons/bi";

export default function LoginComponent() {
  const navigate = useNavigate();
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

      Cookies.set("token", token, {
        expires: 45 / (24 * 60),
        secure: true,
      });

      if (response.status == 200) {
        navigate("/home");
      }
    } catch (error) {
      setError(true);
      console.error(error);
    }
  }

  function handleClick() {
    setShowPassword(!showPassword);
  }

  return (
    <Flex height="100%" justifyContent="center">
      <VStack
        width="30%"
        border="2px solid black"
        boxShadow="0px 0px 10px 10px black"
      >
        <Heading>Login</Heading>
        <form onSubmit={handleSubmit} style={{ width: 80 + "%" }}>
          <VStack width="100%">
            <FormControl isRequired="true" width="80%">
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={credentials.email}
                onChange={(e) => {
                  setCredentials({ ...credentials, email: e.target.value });
                }}
                width="100%"
              ></Input>
            </FormControl>
            <FormControl isRequired="true" width="80%">
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
                  width="100%"
                ></Input>
                <InputRightAddon>
                  <Button onClick={handleClick}>
                    {showPassword ? <BiSolidHide /> : <BiShow />}
                  </Button>
                </InputRightAddon>
              </InputGroup>
            </FormControl>
            {error ? (
              <Text color="red">Invalid credentials! Try again!</Text>
            ) : null}
            <Button
              marginTop="10px"
              type="submit"
              isDisabled={
                credentials.email === "" || credentials.password === ""
                  ? true
                  : false
              }
            >
              Sign in
            </Button>
          </VStack>
        </form>
        <HStack>
          <Text>New here?</Text>
          <Link to="/register">
            <Button>Create an account</Button>
          </Link>
        </HStack>
      </VStack>
    </Flex>
  );
}
