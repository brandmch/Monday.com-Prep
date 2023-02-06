import "./App.css";
import { useQuery } from "@apollo/client";
import { GET_STUFF } from "./graphQL/queries";
import { Typography, Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const GetThings = () => {
  const { loading, error, data } = useQuery(GET_STUFF);

  if (loading) {
    console.log(loading);
  }
  if (error) {
    console.log(error);
  }
  if (data) {
    console.log(data);
    let { items, columns } = data.boards[0];
    const tempColumns = columns.reduce(
      (acc, curr) => [
        ...acc,
        {
          field: curr.id,
          headName: curr.title.toUpperCase(),
          id: curr.id,
          width: 150,
        },
      ],
      []
    );
    const rows = items.reduce((acc, curr, ind) => {
      let newRow = { id: ind, name: curr.name };
      curr.column_values.map((curr) => {
        newRow[curr.id] = curr.text;
      });
      return [...acc, newRow];
    }, []);

    console.log(tempColumns);
    console.log(rows);

    return (
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          sx={{ backgroundColor: "dimgray" }}
          rows={rows}
          columns={tempColumns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </Box>
    );
  }
};

function App() {
  return (
    <Box height="100vh" backgroundColor="black">
      <GetThings />
    </Box>
  );
}

export default App;
