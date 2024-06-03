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
  Heading,
  Spacer,
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

  const inputStyle = {
    width: "100%",
    borderRadius: "5px",
    height: "30px",
  };
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const { name, email, role, password } = userDetails;
      const response = await register({ name, email, role, password });
      const token = response.data.token;

      if (!token) {
        throw new Error("Token not found");
      }

      Cookies.set("token", token, {
        expires: 45 / (24 * 60),
        secure: true,
      });

      if (response.status === 201) {
        navigate("/home");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Flex justifyContent="center" width="100%" height="100%">
      <VStack
        width="30%"
        minWidth="fit-content"
        border="2px solid black"
        boxShadow="0px 0px 10px 10px black"
        borderRadius="15px"
      >
        <Heading>Register on our page</Heading>
        <form onSubmit={handleSubmit} style={{ width: 80 + "%" }}>
          <VStack width="90%" gap="15px">
            <FormControl isRequired="true" width="100%">
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                value={userDetails.name}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, name: e.target.value })
                }
                placeholder="Enter your full name"
                {...inputStyle}
              />
            </FormControl>

            <FormControl isRequired="true" width="100%">
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={userDetails.email}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, email: e.target.value })
                }
                placeholder="Enter your email address"
                {...inputStyle}
              />
            </FormControl>

            <FormControl isRequired="true" width="100%">
              <HStack width="100%">
                <FormLabel>Role </FormLabel>
                <Spacer />
                <select
                  placeholder="Select your role"
                  name="role"
                  value={userDetails.role}
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, role: e.target.value })
                  }
                  style={{
                    width: 80 + "%",
                    textAlign: "center",
                    borderRadius: 5 + "px",
                  }}
                >
                  <option value="" disabled>
                    Select your role
                  </option>
                  <option>TESTER</option>
                  <option>DEVELOPER</option>
                  <option>MANAGER</option>
                </select>
              </HStack>
            </FormControl>

            <FormControl isRequired="true " width="100%">
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
                width="100%"
                borderRadius="5px"
              />
            </FormControl>
            <Button
              marginTop="10px"
              type="submit"
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
          </VStack>
        </form>
        <HStack minWidth="fit-content" margin="0 10px 5px 10px">
          <Text>Already have an account?</Text>
          <Link to="/login">
            <Button>Login</Button>
          </Link>
        </HStack>
      </VStack>
    </Flex>
  );
}
