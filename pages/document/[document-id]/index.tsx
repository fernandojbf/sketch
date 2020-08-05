import { useRouter } from "next/router";
import SketchDocument from "../../../components/SketchDocument";

export default function DocumentIndex() {
  return <SketchDocument />;
}

// This could be removed. Only to make the side effects of the first render more equal to a client side app
// if time remove this
export async function getServerSideProps() {
  return { props: {} };
}
