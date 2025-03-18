import { CalendarDays } from "lucide-react";
import CardStackStatic from "./CardStackStatic";

const appointments = [
  {
    name: "Jack Hay",
    type: "Dental Appointment",
    status: "Appointment Refilled",
    duration: "2 min 34 sec",
  },
  {
    name: "Erin Moresby",
    type: "Medical Checkup",
    status: "Appointment Refilled",
    duration: "3 min 12 sec",
  },
  {
    name: "Natalie McGowan",
    type: "Treatment",
    status: "Appointment Refilled",
    duration: "1 min 45 sec",
  },
  {
    name: "Hugo Barrow",
    type: "Medical Checkup",
    status: "Appointment Refilled",
    duration: "2 min 15 sec",
  },
];

export default function WaitlistAnimation() {
  return (
    <div className="relative h-56 my-4 flex items-center">
      <div className="grow z-10">
        <CardStackStatic />
      </div>
      <div className="absolute top-1/3 right-0 transform translatse-x-1/3 -translate-y-1/2">
        <CalendarDays size={256} className="text-zinc-100" />
      </div>
    </div>
  );
}
