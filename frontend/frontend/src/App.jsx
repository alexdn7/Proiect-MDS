import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Box, Flex, Stack, HStack, VStack } from "@chakra-ui/react";
import { px } from "framer-motion";
import LoginComponent from "../components/LoginComponent";
import RegisterComponent from "../components/RegisterComponent";

function App() {
  return (
    <div className="App">
      {/* <LoginComponent/> */}
      <RegisterComponent />
    </div>
  );
}

export default App;
