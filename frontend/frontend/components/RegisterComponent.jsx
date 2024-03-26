import {
  Flex,
  Center,
  Card,
  CardBody,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Select,
  HStack,
  Text,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import { register } from "../services/AuthService";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function RegisterComponent() {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const { name, email, role, password } = userDetails;
      const response = await register({ name, email, role, password });
      const token = response.data.token;

      if (!token) {
        throw new Error("Token not found");
      }
      Cookies.set("token", token);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Flex h="90vh" justifyContent="center">
      <Center>
        <Card p="6" borderRadius="10px">
          <CardBody>
            <VStack>
              <form onSubmit={handleSubmit}>
                <FormControl isRequired="true">
                  <FormLabel>Name</FormLabel>
                  <Input
                    type="text"
                    value={userDetails.name}
                    onChange={(e) =>
                      setUserDetails({ ...userDetails, name: e.target.value })
                    }
                  />
                </FormControl>
                <FormControl isRequired="true">
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    value={userDetails.email}
                    onChange={(e) =>
                      setUserDetails({ ...userDetails, email: e.target.value })
                    }
                  />
                </FormControl>
                <FormControl isRequired="true">
                  <FormLabel>Role</FormLabel>
                  <Select
                    placeholder="Select your role"
                    name="role"
                    value={userDetails.role}
                    onChange={(e) =>
                      setUserDetails({ ...userDetails, role: e.target.value })
                    }
                  >
                    <option>TESTER</option>
                    <option>DEVELOPER</option>
                    <option>MANAGER</option>
                  </Select>
                </FormControl>
                <FormControl isRequired="true">
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    value={userDetails.password}
                    onChange={(e) =>
                      setUserDetails({
                        ...userDetails,
                        password: e.target.value,
                      })
                    }
                  />
                </FormControl>
                <Button
                  marginTop="10px"
                  type="submit"
                  bg="aqua"
                  isDisabled={
                    userDetails.email === "" ||
                    userDetails.password === "" ||
                    userDetails.name === "" ||
                    userDetails.role === ""
                      ? true
                      : false
                  }
                >
                  Register
                </Button>
              </form>
              <HStack>
                <Text>Already have an account?</Text>
                <Link to="/login">
                  <Button marginTop="10px">Login</Button>
                </Link>
              </HStack>
            </VStack>
          </CardBody>
        </Card>
      </Center>
    </Flex>
  );
}
