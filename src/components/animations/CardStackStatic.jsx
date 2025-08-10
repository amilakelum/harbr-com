const cardData = [
  {
    id: 1,
    title: "Jack your appointment is moved ahead!",
    text: "Thursday 10:00 AM",
  },
  {
    id: 2,
    title: "Erin your appointment is moved ahead!",
    text: "Sunday 2:00 PM",
  },
  {
    id: 3,
    title: "Natalie your appointment is moved ahead!",
    text: "Monday 9:00 AM",
  },
  {
    id: 4,
    title: "Hugo your appointment is moved ahead!",
    text: "Wednesday 3:00 PM",
  },
];

export default function CardStackStatic() {
  return (
    <div className="relative w-full max-w-md mx-auto h-96 flex items-center justify-center">
      <div className="relative w-full h-24">
        <div className="absolute top-0 left-0 transform -translate-y-6 scale-90 right-0 bg-white rounded-lg p-4 border border-zinc-100">
          <div className="flex flex-col">
            <h3 className="text-sm font-semibold text-zinc-600">
              {cardData[0].title}
            </h3>
            <p className="text-xs text-zinc-400 mt-1">{cardData[0].text}</p>
          </div>
        </div>
        <div className="absolute top-0 left-0 transform -translate-y-3 scale-95 right-0 bg-white rounded-lg p-4 border border-zinc-100">
          <div className="flex flex-col">
            <h3 className="text-sm font-semibold text-zinc-600">
              {cardData[0].title}
            </h3>
            <p className="text-xs text-zinc-400 mt-1">{cardData[0].text}</p>
          </div>
        </div>
        <div className="absolute top-0 left-0 right-0 bg-white rounded-lg fancy-shadow p-4 border border-zinc-100">
          <div className="flex flex-col">
            <h3 className="text-sm font-semibold text-zinc-600">
              {cardData[0].title}
            </h3>
            <p className="text-xs text-zinc-400 mt-1">{cardData[0].text}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
