import Head from "next/head";
import Link from "next/link";
import { useQuery, gql } from "@apollo/client";

import Text from "../components/Text";

const GET_DOCUMENT = gql`
  query GetDocument($shortId: String!) {
    share(shortId: $shortId) {
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
  const { data } = useQuery(GET_DOCUMENT, {
    variables: { shortId: "Y8wDM" },
  });

  return (
    <main>
      <Text as="p">Hi. Hope this page finds you well.</Text>

      <Link href="/document/[document-id]" as="/document/Y8wDM">
        <Text as="a" variant="small">
          Link for Y8wDM Document
        </Text>
      </Link>
    </main>
  );
}
