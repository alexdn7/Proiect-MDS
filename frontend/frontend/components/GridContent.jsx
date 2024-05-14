import { Grid, GridItem } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import UsersList from "./UsersList";
import Header from "./Header";
import ProjectForm from "./ProjectForm";
import Footer from "./Footer";
import ProjectsList from "./ProjectsList";
import TicketForm from "./TicketForm";
import TicketsList from "./TicketsList";
import TicketComponent from "./TicketComponent";
import HomePage from "./HomePage";
import ActionsPanel from "./ActionsPanel";
export default function GridContent({ userDetails }) {
  console.log(userDetails);
  return (
    <Grid
      templateAreas={`"header"
                  "main"
                  "footer"`}
      gridTemplateRows={"7% 88% 5%"}
      height="100vh"
      width="100%"
      margin="0"
      fontWeight="bold"
      backgroundColor="#242424"
    >
      <GridItem area={"header"} margin="0" position="sticky" top="0">
        <Header
          isLogged={userDetails ? "true" : "false"}
          userDetails={userDetails}
        />
      </GridItem>
      <GridItem area={"main"} overflow="auto">
        <Routes>
          <Route
            path="/home"
            element={<HomePage isLogged={true} userDetails={userDetails} />}
          />
          <Route path="/users" element={<UsersList />} />
          <Route
            path="/projects/add"
            element={<ProjectForm userDetails={userDetails} />}
          />
          <Route path="/projects" element={<ProjectsList />} />
          <Route
            path="/tickets/add"
            element={<TicketForm userDetails={userDetails} />}
          />
          <Route
            path="/tickets"
            element={<TicketsList userDetails={userDetails} />}
          />
          <Route
            path="/tickets/:id"
            element={<TicketComponent userDetails={userDetails} />}
          />
          <Route
            path="/auth/actions"
            element={<ActionsPanel userDetails={userDetails} />}
          />
        </Routes>
      </GridItem>
      <GridItem area={"footer"}>
        <Footer />
      </GridItem>
    </Grid>
  );
}
