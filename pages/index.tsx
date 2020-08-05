import Link from "next/link";

import Text from "../components/Text";

export default function Home() {
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
