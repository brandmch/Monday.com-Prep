import { useQuery, gql } from "@apollo/client";

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

export { GET_STUFF };
