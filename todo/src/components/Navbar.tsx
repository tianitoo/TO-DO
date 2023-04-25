import Link from "next/link";
import { useState } from "react";

function ResponsiveNavbar({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void; }) {
  return (
    <div
      className={`md:hidden absolute rounded-3xl top-0 w-full z-30 bg-slate-300 shadow-md shadow-slate-300 transform ${
        open ? "-translate-y-0" : "-translate-y-full"
      } transition-transform duration-300 ease-in-out filter`}
    >
      <div className="flex flex-col justify-center items-center mt-28">
        <Link href="/" className="text-2xl font-bold my-4">
          Projects
        </Link>
        <Link href="/" className="text-2xl font-bold my-4">
          Documentation
        </Link>
        <Link href="/" className="text-2xl font-bold my-4">
          login
        </Link>
      </div>
    </div>
  );
}

const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="w-screen">
      <ResponsiveNavbar open={open} setOpen={setOpen} />
      <div className="w-full bg-slate-100 fixed top-0 left-0 h-14 z-50 m-0 flex flex-row items-center">
        <div className="h-full w-screen flex flex-row items-center justify-center">
          <Link className="" href="/">
            To-Do
          </Link>
          <div className="w-3/5 md:w-1/3 lg:w-1/2"></div>
          <div className="md:hidden items-center">
            <div
              className="group relative w-6 h-5 cursor-pointer flex-col justify-between items-center flex"
              onClick={() => {
                setOpen(!open);
              }}
            >
              <span
                className={`h-1 bg-black rounded-lg transform transition duration-300 ease-in-out ${
                  open ? "w-0" : "w-full"
                }`}
              />
              <div className="h-full w-full relative items-center flex ">
                <span
                  className={`h-1 bg-black rounded-lg transform transition duration-300 ease-in-out ${
                    open ? "rotate-45 traslate-y-2.5 w-full" : "w-full"
                  }`}
                />
                <span
                  className={`h-1 bg-black rounded-lg transform transition duration-300 ease-in-out ${
                    open
                      ? "-rotate-45 traslate-y-2.5 w-full"
                      : "rotate-0 traslate-y-2.5 w-full"
                  }`}
                />
              </div>
              <span
                className={`h-1 bg-black rounded-lg transform transition duration-300 ease-in-out ${
                  open ? "w-0" : "w-full"
                }`}
              />
            </div>
          </div>
          <div className="hidden md:flex">
            <button className=" text-slate-700 md:mx-7">Projects</button>
            <button className=" text-slate-700 md:mx-7">Documentation</button>
            <button className=" text-slate-700 md:mx-7">Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
