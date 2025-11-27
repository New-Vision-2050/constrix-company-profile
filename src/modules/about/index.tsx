import PartnersSection from "./components/partners-section";
import WhoWeAre from "./components/who-we-are";

export default function AboutView() {
  return (
    <div style={{ width: '100%', overflow: 'hidden' }}>
      <WhoWeAre />
      <PartnersSection />
    </div>
  );
}