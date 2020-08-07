import Link from 'next/link';

import PageGrid from '../../components/PageGrid';
import Header from '../../components/Header';
import Box from '../../components/Box';
import Text from '../../components/Text';

export default function DocumentHome() {
  return (
    <PageGrid>
      <Header />
      <section>
        <Box py="4">
          <Text as="h1">Choose one Document:</Text>
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
      </section>
    </PageGrid>
  );
}
