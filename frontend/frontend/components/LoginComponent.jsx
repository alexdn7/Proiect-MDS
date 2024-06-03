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
import { loginUser } from "../services/AuthService";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { BiSolidHide, BiShow } from "react-icons/bi";
import { useAuth } from "./AuthProvider";

export default function LoginComponent() {
  const navigate = useNavigate();
  const { login } = useAuth();
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
      const response = await loginUser({ email, password });
      const token = response.data.token;

      if (!token) {
        throw new Error("Token not found!");
      }

      Cookies.set("token", token, {
        expires: 45 / (24 * 60),
        secure: true,
      });

      login(token);
      
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
        minWidth="fit-content"
        border="2px solid black"
        borderRadius="15px"
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
                borderRadius="5px"
                height="20px"
                placeholder="Enter your email address"
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
                  height="30px"
                  borderRadius="5px"
                  placeholder="Enter your password"
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
        <HStack margin="0 10px 10px 10px">
          <Text>New here?</Text>
          <Link to="/register">
            <Button>Create an account</Button>
          </Link>
        </HStack>
      </VStack>
    </Flex>
  );
}
