import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/harbr-logo3.svg";
import { cn } from "../lib/utils";

const navigation = [

];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNavClick = (e, href) => {
    if (href.startsWith("/#")) {
      e.preventDefault();
      const element = document.querySelector(href.substring(1));
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
      setMobileMenuOpen(false);
    }
  };

  return (
    <div
      className={cn(
        "sticky top-0 z-50 backdrop-blur-md  bg-[color(display-p3_0.9843_0.9843_0.9882)]/80 transition-shadow duration-300",
        {
          "shadow-[0_24px_24px_-12px_#16223b08] bg-white/80": hasScrolled,
        },
      )}
    >
      <header className="">
        <nav
          aria-label="Global"
          className="container mx-auto flex items-center justify-between p-6 lg:px-8"
        >
          <div className="flex lg:flex-1">
            <Link to="/" className="-m-1.5 p-1.5 flex items-center gap-x-2">
              <span className="sr-only">Your Company</span>
              <img alt="" src={logo} className="h-6 w-auto" />
              <span className="font-semibold text-lg">Harbr</span>
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-zinc-700"
            >
              <span className="sr-only">Open main menu</span>
              <Menu />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-sm/6 text-zinc-600 hover:text-zinc-950"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </nav>
        <Transition appear show={mobileMenuOpen} as="div" className="lg:hidden">
          <Dialog
            as="div"
            className="relative z-50"
            onClose={setMobileMenuOpen}
          >
            <TransitionChild
              as="div"
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              className="fixed inset-0 bg-white bg-opacity-25"
            />
            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-end justify-end p-0 text-center sm:items-center">
                <TransitionChild
                  as="div"
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                  className="w-full sm:max-w-sm"
                >
                  <DialogPanel className="relative transform overflow-y-auto bg-white px-6 py-6 text-left shadow-xl transition-all w-full h-screen sm:h-auto sm:max-w-sm sm:ring-1 sm:ring-zinc-900/10">
                    <div className="flex items-center justify-between">
                      <Link
                        to="/"
                        className="-m-1.5 p-1.5 flex items-center gap-x-2"
                      >
                        <span className="sr-only">Your Company</span>
                        <img alt="" src={logo} className="h-6 w-auto" />
                        <span className="font-semibold text-lg">Harbr</span>
                      </Link>
                      <button
                        type="button"
                        onClick={() => setMobileMenuOpen(false)}
                        className="-m-2.5 rounded-md p-2.5 text-zinc-700"
                      >
                        <span className="sr-only">Close menu</span>
                        <X />
                      </button>
                    </div>
                    <div className="mt-6 flow-root">
                      <div className="-my-6 divide-y divide-zinc-500/10">
                        <div className="space-y-2 py-6">
                          {navigation.map((item) => (
                            <Link
                              key={item.name}
                              to={item.href}
                              onClick={(e) => handleNavClick(e, item.href)}
                              className="-mx-3 block rounded-lg px-3 py-2 text-base/7 text-zinc-900 hover:bg-zinc-50"
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </div>
          </Dialog>
        </Transition>
      </header>
    </div>
  );
}
