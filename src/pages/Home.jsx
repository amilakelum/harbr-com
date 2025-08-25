import Pricing from "../components/Pricing";
import CalloutTwo from "../components/CalloutTwo";
import IntroVideo from "../components/IntroVideo";
import Implementation from "../components/Implementation";
import Support from "../components/Support";
import AIManager from "../components/AIManager";
import Charity from "../components/Charity";
import FreeTrial from "../components/FreeTrial";
import AiMeetings from "../components/AiMeetings";
import Callout from "../components/Callout";
import HarbrIntro from "../components/HarbrIntro";

export default function Home() {
  return (
    <>
      <IntroVideo />
      <Callout />
      {/* <Separator /> */}
      <HarbrIntro />
      <Pricing />
      <Implementation />
      <Support />
      <AIManager />
      <Charity />
      <FreeTrial />

      {/* <Hero /> */}
      <AiMeetings />
      <CalloutTwo />
    </>
  );
}
