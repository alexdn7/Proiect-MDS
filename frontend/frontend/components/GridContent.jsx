import { Grid, GridItem } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import UsersList from "./UsersList";
import Header from "./Header";
export default function GridContent() {
  return (
    <Grid
      templateAreas={`"header"
                  "main"
                  "footer"`}
      gridTemplateRows={"12% 76% 12%"}
      height="100%"
      width="100%"
      margin="0"
      fontWeight="bold"
    >
      <GridItem
        area={"header"}
        margin="0"
        position="sticky"
        top="0"
      >
        <Header isLogged={true} />
      </GridItem>
      <GridItem area={"main"} overflow="auto">
        <Routes>
          <Route path="/users" element={<UsersList />} />
        </Routes>
      </GridItem>
    </Grid>
  );
}
