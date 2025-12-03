import PartnersView from "@/sections/home/partners/partners-view";
import WhoWeAre from "./components/who-we-are";
import KeySuccessCardsSection from "./components/key-success-cards-section";

export default function AboutView() {
  return (
    <div style={{ width: '100%', overflow: 'hidden' }}>
      <WhoWeAre />
      <PartnersView />
      <KeySuccessCardsSection />
    </div>
  );
}