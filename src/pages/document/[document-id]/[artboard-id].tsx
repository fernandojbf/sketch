import ArtBoard from '../../../components/ArtBoard';

export default function DocumentIndex() {
  return <ArtBoard />;
}

// This could be removed. Only to make the side effects of the first render more equal to a client side app
// if time remove this
export async function getServerSideProps() {
  return { props: {} };
}
