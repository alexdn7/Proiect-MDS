import { Grid, GridItem } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import UsersList from "./UsersList";
import Header from "./Header";
import ProjectForm from "./ProjectForm";
import Footer from "./Footer";
import ProjectsList from "./ProjectsList";
import TicketForm from "./TicketForm";
import TicketsList from "./TicketsList";
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
          <Route path="/projects" element={<ProjectsList />} />
          <Route path="/tickets/add" element={<TicketForm />} />
          <Route path="/tickets" element={<TicketsList />} />
        </Routes>
      </GridItem>
      <GridItem area={"footer"} backgroundColor={"teal"}>
        <Footer />
      </GridItem>
    </Grid>
  );
}
