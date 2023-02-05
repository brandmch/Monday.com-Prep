import logo from "./logo.svg";
import "./App.css";
import { useQuery, gql } from "@apollo/client";
import { GET_STUFF } from "./graphQL/queries";
import { Paper, Typography, Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
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
    const rows = data.boards[0].items.reduce((acc, curr, ind) => {
      let thisRow = { id: ind, name: curr.name, group: curr.group.title };
      let values = curr.column_values.reduce((acc2, curr2) => {
        return { ...acc2, [curr2.id.toLowerCase()]: curr2.text };
      }, {});
      return [...acc, { ...thisRow, ...values }];
    }, []);

    const columns = data.boards[0].columns.reduce((acc, curr) => {
      return [
        ...acc,
        {
          field: curr.title.toLowerCase(),
          headerName: curr.title.toLowerCase(),
          width: 150,
        },
      ];
    }, []);

    console.log(rows);

    return (
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          sx={{ backgroundColor: "dimgray" }}
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </Box>
    );
  }
};

function App() {
  const [boardData, setBoardData] = useState();

  return (
    <Box height="100vh" backgroundColor="black">
      <GetThings />
    </Box>
  );
}

export default App;
