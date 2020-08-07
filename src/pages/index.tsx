import Link from 'next/link';

import Header from '../components/molecules/Header';
import PageGrid from '../components/atoms/PageGrid';
import Box from '../components/atoms/Box';
import Text from '../components/atoms/Text';

export default function Home() {
  return (
    <PageGrid>
      <Header />
      <section>
        <Box py="4">
          <Text as="h1">Sketch Challenge</Text>
        </Box>
        <Box py="2">
          <Link href="/document/[document-id]" as="/document/Y8wDM">
            <Text as="a">Link for Y8wDM Document</Text>
          </Link>
        </Box>

        <Box py="2">
          <Link href="/document/[document-id]" as="/document/4W43q">
            <Text as="a">Link for 4W43q Document</Text>
          </Link>
        </Box>
        <Box py="2">
          <Text as="p">Made by: Fernando Ferreira</Text>
        </Box>
      </section>
    </PageGrid>
  );
}
