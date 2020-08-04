import { useRouter } from "next/router";
import Header from "../../../components/Header";
import Text from "../../../components/Text";

export default function DocumentIndex() {
  const { query } = useRouter();
  return (
    <>
      <Header
        preContent={<img alt="Logo" src="/sketch-logo.svg" />}
        content={
          <>
            <Text as="h1">{query["document-id"]}</Text>
            <Text as="h1" variant="small" color="secondary">
              {query["document-id"]}
            </Text>
          </>
        }
      />
      Document Page
    </>
  );
}
