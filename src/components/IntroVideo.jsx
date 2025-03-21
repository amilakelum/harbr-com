import screenshot from "../assets/screenshot-23.png";
import Reveal from "./animations/Reveal";
import { HeroVideoDialog } from "./VideoDialog";

export default function IntroVideo() {
  return (
    <Reveal
      delay={0.4}
      className="container mx-auto px-4 sm:px-20 overflow-hidden"
    >
      <div className="p-2 sm:p-4 bg-zinc-100 rounded-2xl sm:rounded-3xl">
        <HeroVideoDialog
          className="rounded-xl sm:rounded-2xl ring ring-zinc-100 bg-zinc-100 shadow-xl lg:shadosw-xl"
          animationStyle="from-center"
          videoSrc="https://www.youtube.com/embed/dQw4w9WgXcQ?si=z291dvnyN3uMPan5"
          thumbnailSrc={screenshot}
          thumbnailAlt="Hero Video"
        />
      </div>
    </Reveal>
  );
}
