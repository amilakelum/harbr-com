import Callout from "../components/Callout";
import CalloutTwo from "../components/CalloutTwo";
import Hero from "../components/Hero";
import IntroVideo from "../components/IntroVideo";
import Separator from "../components/Separator";
import Story from "../components/Story";

export default function Home() {
  return (
    <>
      <IntroVideo />
      {/* <Separator /> */}
      <Callout />
      <Hero />
      <Story />
      <CalloutTwo />
    </>
  );
} 