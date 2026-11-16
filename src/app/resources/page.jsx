import { ResourcesPage } from "../../site/Site";
import "../../site/site.css";
import BRAND from "../../brand";

export const metadata = {
  title: `Free resources — ${BRAND.name}`,
  description: "Free mini-lessons on English and professional communication: job interviews, presentations, networking and your LinkedIn profile in English.",
};

export default function Page() {
  return <ResourcesPage />;
}
