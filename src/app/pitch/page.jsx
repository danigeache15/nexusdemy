import Pitch from "../../pitch/Pitch";
import "../../pitch/pitch.css";
import BRAND from "../../brand";

export const metadata = {
  title: `${BRAND.name} · Investor Pitch`,
  description: "The Nexusdemy investor pitch: the problem, the solution, traction, go-to-market, financials, team and the ask.",
  robots: { index: false },
};

export default function Page() {
  return <Pitch />;
}
