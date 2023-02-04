import logo from "./logo.svg";
import "./App.css";
import { useQuery, gql } from "@apollo/client";
import { GET_STUFF } from "./graphQL/queries";
import { Paper, Typography, Box } from "@mui/material";
import { useState } from "react";

const GetThings = () => {
  const { loading, error, data } = useQuery(GET_STUFF);

  if (loading) {
    return <Typography>Loading</Typography>;
  }
  if (error) {
    console.log(error);
  }
  if (data) {
    return <Typography>Got it</Typography>;
  }
};

function App() {
  const [boardData, setBoardData] = useState();

  return (
    <Box height="100vh" backgroundColor="black">
      <Paper>
        <GetThings />
      </Paper>
    </Box>
  );
}

export default App;
