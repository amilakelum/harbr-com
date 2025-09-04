import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Menu as MenuIcon, X, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/harbr-logo3.svg";
import { cn } from "../lib/utils";
import { trackEvent } from "../lib/analytics";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Harbr AI", href: "/ai-marina-manager" },
  {
    name: "Features",
    href: "/features",
    dropdown: [
      { name: "Bookings & Berth Management", href: "/bookings-features" },
      { name: "Finance Management", href: "/finance-management-features" },
      {
        name: "Online Bookings & Customer Portal",
        href: "/online-bookings-features",
      },
      { name: "CRM", href: "/crm-features" },
    ],
  },
  { name: "Pricing", href: "/pricing" },
  { name: "Blog", href: "/blog" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredDropdown, setHoveredDropdown] = useState(null);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [dropdownTimeout, setDropdownTimeout] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";

  const handleDropdownEnter = (itemName) => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
    }
    setHoveredDropdown(itemName);
  };

  const handleDropdownLeave = () => {
    const timeout = setTimeout(() => {
      setHoveredDropdown(null);
    }, 150); // 150ms delay before hiding
    setDropdownTimeout(timeout);
  };

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (dropdownTimeout) {
        clearTimeout(dropdownTimeout);
      }
    };
  }, [dropdownTimeout]);

  const handleNavClick = (e, href) => {
    // Close mobile menu for all navigation clicks
    setMobileMenuOpen(false);

    if (href.startsWith("/#")) {
      e.preventDefault();
      const element = document.querySelector(href.substring(1));
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setMobileMenuOpen(false);
  };

  const handleLogoClick = (e) => {
    e.preventDefault();

    // Track the logo click event
    trackEvent("navigation_logo_click", {
      location: location.pathname,
      destination: isHomePage ? "scroll_top" : "home",
    });

    if (isHomePage) {
      // If already on home page, just scroll to top
      scrollToTop();
    } else {
      // If on another page, navigate to home
      navigate("/");
    }
  };

  return (
    <div
      className={cn(
        "sticky top-0 z-50 backdrop-blur-md  bg-[color(display-p3_0.9843_0.9843_0.9882)]/80 transition-shadow duration-300",
        {
          "shadow-[0_24px_24px_-12px_#16223b08] bg-white": hasScrolled,
        }
      )}
    >
      <header className="">
        <nav
          aria-label="Global"
          className="container mx-auto flex items-center justify-between p-4 sm:p-6 lg:px-8"
        >
          <div className="flex lg:flex-1">
            <a
              href="/"
              className="-m-1.5 p-1.5 flex items-center gap-x-2"
              onClick={handleLogoClick}
            >
              <span className="sr-only">Harbr</span>
              <img alt="Harbr Logo" src={logo} className="h-7 sm:h-6 w-auto" />
              <span className="font-semibold text-lg">Harbr</span>
            </a>
          </div>
          {navigation.length > 0 && (
            <div className="flex lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-zinc-700 hover:text-zinc-900 transition-colors duration-200 hover:bg-zinc-100/80"
              >
                <span className="sr-only">Open main menu</span>
                <MenuIcon className="w-5 h-5 stroke-[1.5px]" />
              </button>
            </div>
          )}
          {navigation.length > 0 && (
            <div className="hidden lg:flex lg:gap-x-12">
              {navigation.map((item) =>
                item.dropdown ? (
                  <div
                    key={item.name}
                    className="relative"
                    onMouseEnter={() => handleDropdownEnter(item.name)}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <Link
                      to="/features"
                      className="flex items-center gap-x-1 text-sm/6 text-zinc-600 hover:text-zinc-950"
                    >
                      {item.name}
                      <ChevronDown className="h-3 w-3" aria-hidden="true" />
                    </Link>

                    {hoveredDropdown === item.name && (
                      <div className="absolute left-1/2 z-10 -mt-1 flex w-80 -translate-x-1/2 pt-3">
                        <div className="w-full flex-auto overflow-hidden rounded-2xl bg-white text-sm/6 shadow-lg ring-1 ring-zinc-900/5">
                          <div className="p-3">
                            {item.dropdown.map((dropdownItem) => (
                              <div
                                key={dropdownItem.name}
                                className="group relative rounded-lg hover:bg-zinc-50"
                              >
                                <Link
                                  to={dropdownItem.href}
                                  className="block text-sm/6 text-zinc-600 hover:text-zinc-950 px-3 py-2 w-full"
                                >
                                  {dropdownItem.name}
                                </Link>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="text-sm/6 text-zinc-600 hover:text-zinc-950"
                  >
                    {item.name}
                  </Link>
                )
              )}
            </div>
          )}
        </nav>
        {navigation.length > 0 && (
          <Transition
            appear
            show={mobileMenuOpen}
            as="div"
            className="lg:hidden"
          >
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
                        <a
                          href="/"
                          className="-m-1.5 p-1.5 flex items-center gap-x-2"
                          onClick={handleLogoClick}
                        >
                          <span className="sr-only">Harbr</span>
                          <img
                            alt="Harbr Logo"
                            src={logo}
                            className="h-7 sm:h-6 w-auto"
                          />
                          <span className="font-semibold text-lg">Harbr</span>
                        </a>
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
                            {navigation.map((item) =>
                              item.dropdown ? (
                                <div key={item.name}>
                                  <div className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-zinc-900">
                                    {item.name}
                                  </div>
                                  <div className="ml-4 space-y-1">
                                    {item.dropdown.map((dropdownItem) => (
                                      <Link
                                        key={dropdownItem.name}
                                        to={dropdownItem.href}
                                        onClick={(e) =>
                                          handleNavClick(e, dropdownItem.href)
                                        }
                                        className="-mx-3 block rounded-lg px-3 py-1.5 text-sm/6 text-zinc-600 hover:bg-zinc-50"
                                      >
                                        {dropdownItem.name}
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              ) : (
                                <Link
                                  key={item.name}
                                  to={item.href}
                                  onClick={(e) => handleNavClick(e, item.href)}
                                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 text-zinc-900 hover:bg-zinc-50"
                                >
                                  {item.name}
                                </Link>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    </DialogPanel>
                  </TransitionChild>
                </div>
              </div>
            </Dialog>
          </Transition>
        )}
      </header>
    </div>
  );
}
