import { FaqPage } from "../../site/Site";
import "../../site/site.css";
import BRAND from "../../brand";

export const metadata = {
  title: `FAQ — ${BRAND.name}`,
  description: "Answers to the questions people ask before their first free class: what happens in it, what level you need, and how it fits around your week.",
};

export default function Page() {
  return <FaqPage />;
}
