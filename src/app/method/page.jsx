import { MethodPage } from "../../site/Site";
import "../../site/site.css";
import BRAND from "../../brand";

export const metadata = {
  title: `The method — ${BRAND.name}`,
  description: "Learn, practise, get feedback, apply: the four-step cycle in every class that takes you from understanding English to speaking it.",
};

export default function Page() {
  return <MethodPage />;
}
