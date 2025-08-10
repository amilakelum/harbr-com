import { ChevronsDown } from "lucide-react";

export default function Separator() {
  return (
    <div className="flex w-full items-center my-16 sm:my-24">
      <div className="flex-1 border-b border-zinc-100"></div>
      <span className="text-sm px-8 py-3 text-slate-200">
        <ChevronsDown />
      </span>
      <div className="flex-1 border-b border-zinc-100"></div>
    </div>
  );
}
