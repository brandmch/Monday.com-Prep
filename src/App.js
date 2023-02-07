import "./App.css";
import { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
// import { GET_STUFF } from "./graphQL/queries";
import { Typography, Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const GET_STUFF = gql`
  {
    boards {
      id
      groups {
        id
        title
      }
      columns {
        id
        title
      }
      items {
        id
        name
        group {
          id
        }
        column_values {
          text
          title
        }
      }
    }
  }
`;

function parseData(data) {
  let { items, columns, groups, id: boardID } = data.boards[0];

  let tempGroups = groups.reduce((acc, curr) => {
    return [...acc, { headerName: curr.title, id: curr.id }];
  }, []);

  const tempColumns = columns.reduce(
    (acc, curr) => [
      ...acc,
      {
        field: curr.title.toUpperCase(),
        headName: curr.title.toUpperCase(),
        id: curr.title.toUpperCase(),
        width: 150,
      },
    ],
    []
  );

  const rows = items.reduce((acc, curr, ind) => {
    let newRow = {
      id: curr.id,
      NAME: curr.name.toUpperCase(),
      group: curr.group.id,
    };
    curr.column_values.map((curr) => {
      newRow[curr.title.toUpperCase()] = curr.text;
    });
    return [...acc, newRow];
  }, []);

  return {
    boardID: boardID,
    rows: rows,
    columns: tempColumns,
    groups: tempGroups,
  };
}

const GetThings = ({ state, setState }) => {
  const { loading, error, data } = useQuery(GET_STUFF);

  if (loading) {
    console.log(loading);
  }
  if (error) {
    console.log(error);
  }
  if (data) {
    const { rows, columns, groups, boardID } = parseData(data);
    // setState({ rows, columns, groups, boardID });
    console.log(state);

    // console.log("BOARDID", boardID);
    // console.log("ROWS", rows);
    // console.log("COLUMNS", columns);
    // console.log("GROUPS", groups);

    return groups.map((curr, ind) => {
      return (
        <Box width={1000} key={ind} marginBottom={3}>
          <Typography color="white">{curr.headerName}</Typography>
          <DataGrid
            sx={{ backgroundColor: "dimgray" }}
            rows={rows.filter((row) => row.group === curr.id)}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            autoHeight
          />
        </Box>
      );
    });
  }
};

function App() {
  const [data, setData] = useState({});
  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100vh"
      backgroundColor="black"
      justifyContent="center"
      alignItems="center"
    >
      <GetThings state={data} setState={setData} />
    </Box>
  );
}

export default App;

// 3926222683
