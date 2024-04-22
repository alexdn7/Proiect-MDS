import { Grid, GridItem } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import UsersList from "./UsersList";
import Header from "./Header";
import ProjectForm from "./ProjectForm";
import Footer from "./Footer";
export default function GridContent() {
  return (
    <Grid
      templateAreas={`"header"
                  "main"
                  "footer"`}
      gridTemplateRows={"10% 85% 5%"}
      height="100vh"
      width="100%"
      margin="0"
      fontWeight="bold"
    >
      <GridItem area={"header"} margin="0" position="sticky" top="0">
        <Header isLogged={true} />
      </GridItem>
      <GridItem area={"main"} overflow="auto">
        <Routes>
          <Route path="/users" element={<UsersList />} />
          <Route path="/projects/add" element={<ProjectForm />} />
        </Routes>
      </GridItem>
      <GridItem area={"footer"} backgroundColor={"teal"}>
        <Footer />
      </GridItem>
    </Grid>
  );
}
