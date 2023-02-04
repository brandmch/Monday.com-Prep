import logo from "./logo.svg";
import "./App.css";
import { useQuery, gql } from "@apollo/client";

function App() {
  console.log("swagola");

  // fetch("https://api.monday.com/v2", {
  //   method: "post",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization:
  //       "eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjIzNDU5OTMwOSwidWlkIjozOTE4NDY4MiwiaWFkIjoiMjAyMy0wMi0wNFQyMDowMjowOS44MjRaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MTUwOTE3NzUsInJnbiI6InVzZTEifQ.9vew5bVPxWTRi6sNWTYp0lD7cT7PPGwcmb2HfH3fne8",
  //   },
  //   body: JSON.stringify({
  //     query: "{me {name}}",
  //   }),
  // })
  //   .then((res) => res.json())
  //   .then((data) => console.log(data));

  const GET_STUFF = gql`
    query {
      me {
        name
      }

      boards(limit: 1) {
        name

        columns {
          title
          id
          type
        }

        groups {
          title
          id
        }

        items {
          name
          group {
            id
          }

          column_values {
            id
            value
            text
          }
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_STUFF);
  if (loading) {
    console.log("loading");
  }
  if (error) {
    console.log(error);
  }
  if (data) {
    console.log(data);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
