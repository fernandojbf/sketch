import Head from "next/head";
import { useQuery, gql } from "@apollo/client";

const GET_DOCUMENT = gql`
  query GetDocument {
    share(shortId: "Y8wDM") {
      shortId
      version {
        document {
          name
          artboards {
            entries {
              name
              isArtboard
              files {
                url
                height
                width
                scale
                thumbnails {
                  url
                  height
                  width
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default function Home() {
  // TODO: MOVE TO OTHER PLACE. ONLY HERE TO TEST INTEGRATION WITH API
  const { data } = useQuery(GET_DOCUMENT);

  return (
    <div>
      <Head>
        <title>Sketch Test</title>
        <link rel="icon" href="sketch-logo.svg" />
      </Head>

      <main>Ola tudo bem</main>

      <footer></footer>
    </div>
  );
}
