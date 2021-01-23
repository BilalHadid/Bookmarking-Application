import * as React from "react";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";

const All_Query = gql`
  {
    AllBook {
      desc
      url
    }
  }
`;
const IndexPage = () => {
  const { loading, error, data } = useQuery(All_Query);
  console.log(data);
  return (
    <div>
      <title>Page Title</title>
      <h2>This is my book mark app</h2>
      {loading && <p>Loading Client Side Querry...</p>}
      {error && <p>Error: ${error.message}</p>}

      {data &&
        data.AllBook &&
        data.AllBook.map((data, i) => {
          return (
            <div key={i}>
              <p>{data.desc}</p>
              <p>{data.url}</p>
            </div>
          );
        })}
    </div>
  );
};

export default IndexPage;
