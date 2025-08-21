import { useEffect, useState } from "react";
import logoImg from "../../assets/Logo/Logo-Full-Light.png";
import { Link, matchPath, useLocation } from "react-router-dom";
import { MdArrowDropDown } from "react-icons/md";
import { FaCartShopping, FaBars } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";

import { NavbarLinks } from "../../data/navbar-links";
import { useSelector } from "react-redux";
import ProfileDropDown from "../core/HomePage/Auth/ProfileDropDown";
import { apiConnector } from "../../services/apiconnector";
import { categories } from "../../services/apis";

const Navbar = () => {
  // now fetch all values from store reducer slice (redux )
  const token = useSelector((state) => state.auth.token); // token is defined in auth slice
  const user = useSelector((state) => state.profile.user);
  const totalItems = useSelector((state) => state.cart.totalItems);

  // api call for catalog section
  const [subLinks, setsubLinks] = useState([]);
  const fetchSubLinks = async () => {
    try {
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      console.log("printing sub links result", result?.data);

      // safe set (if data is missing → fallback to [])
      setsubLinks(result?.data?.allCategorys ?? []);
      localStorage.setItem(
        "subLinks",
        JSON.stringify(result?.data?.allCategorys ?? [])
      );
    } catch (error) {
      console.log("could not fetch catalog category", error);
      setsubLinks([]); // fallback to empty array on error
    }
  };

  useEffect(() => {
    fetchSubLinks();
  }, []);

  const location = useLocation();
  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  // hamburger menu toggle
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative flex h-14 items-center justify-between border-b-[1px] border-b-richblack-700 bg-richblack-800 z-50">
      <div className="flex mx-auto w-11/12 max-w-maxContent items-center justify-between">
        <Link to={"/"}>
          <img
            src={logoImg}
            loading="lazy"
            width="160"
            height="42"
            alt="logoImg"
          />
        </Link>

        {/* nav links */}
        <nav className="hidden lg:flex">
          <ul className="text-richblack-25 flex gap-x-6">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <div className="relative flex items-center gap-2 group">
                    <p>{link.title}</p>
                    <MdArrowDropDown />
                    <div
                      className="invisible absolute left-[50%] translate-x-[-50%] translate-y-[15%]
                    top-[50%] flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[300px] "
                    >
                      <div
                        className="absolute left-[50%] top-0 translate-x-[80%]
                      translate-y-[-45%] h-6 w-6 rotate-45 rounded bg-richblack-5 "
                      ></div>

                      {subLinks?.length > 0 ? (
                        subLinks.map((subLink, index) => (
                          <div
                            key={index}
                            className="px-4 py-2 hover:bg-gray-200"
                          >
                            {subLink.name}
                          </div>
                        ))
                      ) : (
                        <div className="text-sm text-gray-500">
                          No categories found
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`${
                        matchRoute(link?.path ?? "")
                          ? "text-yellow-25 "
                          : "text-richblack-25"
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* login buttons */}
        <div className="hidden lg:flex gap-x-4 items-center">
          {
            // Cart Icon
            user && user?.accountType !== "Instructor" && (
              <Link to={"/dashbord/cart"} className="relative text-richblack-5 ">
                <FaCartShopping className=" fill-richblack-25 w-7 h-7" />
                {totalItems > 0 && (
                  <span className="absolute -top-3 -right-2 bg-pink-300 text-white text-xs px-2 py-1 rounded-full">
                    {totalItems}
                  </span>
                )}
              </Link>
            )
          }
          {token === null && (
            <Link to="/login">
              <button className="w-[70px] bg-richblack-800 py-1 px-3 text-richblack-100 border border-richblack-700 hover:border-richblack-500 transition-all duration-200 rounded-md">
                Log in
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button className="w-[80px] bg-richblack-800 py-1 px-3  text-richblack-100 border border-richblack-700 hover:border-richblack-500 transition-all duration-200 rounded-md">
                Sign up
              </button>
            </Link>
          )}
          {token !== null && <ProfileDropDown />}
        </div>

        {/* hamburger menu button for small screen */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-richblack-25"
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* mobile dropdown menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-richblack-800 px-6 py-4 space-y-4 text-richblack-25 absolute top-14 left-0 w-full shadow-md z-40">
          {NavbarLinks.map((link, index) => (
            <div key={index}>
              {link.title === "Catalog" ? (
                <div className="flex flex-col space-y-2">
                  <p className="font-semibold">{link.title}</p>
                  {subLinks?.length > 0 ? (
                    subLinks.map((subLink, idx) => (
                      <div key={idx} className="pl-4 hover:text-yellow-25">
                        {subLink.name}
                      </div>
                    ))
                  ) : (
                    <div className="pl-4 text-sm text-gray-500">
                      No categories
                    </div>
                  )}
                </div>
              ) : (
                <Link to={link.path} onClick={() => setIsMenuOpen(false)}>
                  <p
                    className={`${
                      matchRoute(link.path ?? "")
                        ? "text-yellow-25"
                        : "text-richblack-25"
                    }`}
                  >
                    {link.title}
                  </p>
                </Link>
              )}
            </div>
          ))}

          {token === null ? (
            <>
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                <button className="w-full bg-richblack-700 text-left py-2 px-4 rounded">
                  Log in
                </button>
              </Link>
              <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                <button className="w-full bg-richblack-700 text-left py-2 px-4 rounded">
                  Sign up
                </button>
              </Link>
            </>
          ) : (
            <ProfileDropDown />
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
