import { useQuery, gql } from "@apollo/client";

const GET_STUFF = gql`
  {
    boards {
      columns {
        id
        title
      }
      items {
        name
        id
        group {
          title
        }
        column_values {
          id
          text
          title
        }
      }
    }
  }
`;

export { GET_STUFF };
