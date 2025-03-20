import logo from "../assets/harbr-logo3.svg";
import InstagramIcon from "./icons/Instagram";
import XIcon from "./icons/X";
import YouTubeIcon from "./icons/YouTube";

export default function Footer() {
  return (
    <footer className="bg-zinc-50 pt-12 sm:pt-24">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr_1fr] gap-8 sm:gap-4  px-6 lg:px-8 text-sm">
          <div className="grow">
            <div
              href="#"
              className="-m-1.5 p-1.5 flex items-center gap-x-2 text-zinc-900"
            >
              <span className="sr-only">Harbr</span>
              <img alt="" src={logo} className="h-6 w-auto" />
              <span className="font-semibold text-lg">Harbr</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
            <div>
             
            </div>
            <div>
              <h3 className="text-zinc-400 mb-2">Legal</h3>
              <ul className="text-zinc-900 space-y-2">
                
                <li>
                  <a
                    href="/terms"
                    className="hover:text-zinc-500  transition-colors duration-200"
                  >
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a
                    href="/privacy"
                    className="hover:text-zinc-500  transition-colors duration-200"
                  >
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="sm:text-right">
            <h3 className=" text-zinc-400 mb-2">Follow Us</h3>
            <div className="flex sm:justify-end space-x-4">
              <a href="#" className="text-zinc-400">
                <InstagramIcon className="text-2xl fill-zinc-500 hover:fill-zinc-700 transition-colors duration-200" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 py-8 border-t border-zinc-100 text-center text-xs text-zinc-400">
          <p>
            &copy; {new Date().getFullYear()} Harbr Pty Ltd (ABN: 15 685 512 154). All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
