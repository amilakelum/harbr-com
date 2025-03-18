import { TimerReset } from "lucide-react";
import { Marquee } from "./Marquee";

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

export default function StaffTimeAnimation() {
  return (
    <div className="h-56 my-4 flex items-center">
      <Marquee pauseOnHover className="px-0 py-4 [--duration:10s]">
        {appointments.map((appointment) => (
          <div
            key={appointment.name}
            className="p-4 bg-white text-zinc-900 shadow-lg border border-zinc-100 rounded-lg flex flex-col gap-1"
          >
            <div className="flex items-center gap-1.5">
              <div className="p-1 bg-sky-100 flex items-center justify-center size-6 rounded-lg">
                <TimerReset className="text-sky-700" size={14} />
              </div>
              <div className="text-sm">{appointment.name}</div>
            </div>
            <div className="text-xs text-sky-600">{appointment.status}</div>
            <div className="text-xs text-zinc-400">{appointment.type}</div>
            <div className="text-xs text-zinc-400">
              <span>Call Duration — </span>
              <span className="text-zinc-900">{appointment.duration}</span>
            </div>
          </div>
        ))}
      </Marquee>
    </div>
  );
}
