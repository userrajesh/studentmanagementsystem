import React, { useEffect, useState } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";

import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import databseconfiguration from "../../../appwrite/dbConfig";
import { LogoutBtn } from "../index";

function Header() {
  const [school, setSchool] = useState(null);

  const navigate = useNavigate();

  const userData = useSelector(
    (state) => state.user_authentication.userData,
  );

  const authStatus = useSelector(
    (state) => state.user_authentication.loginStatus,
  );

  // ==========================
  // FETCH SCHOOL DATA
  // ==========================
 const schoolData = useSelector(
  (state) => state.user_authentication.schoolData
);
  const navItems = [
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  const loginSignup = [
    {
      name: "Signup",
      slug: "/registeruser",
      active: !authStatus,
    },
  ];

  return (
    <Disclosure as="nav" className="bg-gray-800 shadow-md">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Mobile Menu Button */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white">
              <Bars3Icon className="block h-6 w-6 group-data-open:hidden" />
              <XMarkIcon className="hidden h-6 w-6 group-data-open:block" />
            </DisclosureButton>
          </div>

          {/* Left Section */}
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            {/* School Logo/Name */}
            <div className="flex flex-col justify-center">
              <span className="text-white font-semibold text-lg">
                {schoolData?.school_name || "School ERP"}
              </span>

              <span className="text-gray-400 text-xs">
                School Management System
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden sm:ml-8 sm:block">
              <div className="flex space-x-4">
                {navItems
                  .filter((item) => item.active)
                  .map((item) => (
                    <button
                      key={item.name}
                      onClick={() => navigate(item.slug)}
                      className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition"
                    >
                      {item.name}
                    </button>
                  ))}
              </div>
            </div>
          </div>

          {/* Signup Button */}
          {loginSignup
            .filter((item) => item.active)
            .map((item) => (
              <button
                key={item.name}
                className="rounded-md px-3 py-2 text-sm text-gray-300 hover:text-white"
                onClick={() => navigate(item.slug)}
              >
                {item.name}
              </button>
            ))}

          {/* Right Section */}
          {authStatus && (
            <div className="absolute inset-y-0 right-0 flex items-center gap-2 pr-2 sm:static sm:ml-6 sm:pr-0">
              {/* Welcome */}
              {userData && (
                <label className="text-gray-300 text-sm">
                  Welcome{" "}
                  <span className="font-medium">
                    {userData?.name?.split(" ")[0]}
                  </span>
                </label>
              )}

              {/* Notification */}
              <button className="rounded-full p-1 text-gray-400 hover:text-white">
                <BellIcon className="h-6 w-6" />
              </button>

              {/* Profile Dropdown */}
              <Menu as="div" className="relative ml-2">
                <MenuButton className="flex rounded-full focus:outline-none">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
                    alt="profile"
                    className="h-8 w-8 rounded-full object-cover"
                  />
                </MenuButton>

                <MenuItems className="absolute right-0 z-10 mt-2 w-48 rounded-md bg-gray-800 shadow-lg ring-1 ring-black/10 focus:outline-none">
                  <MenuItem>
                    {({ active }) => (
                      <button
                        className={`block w-full px-4 py-2 text-left text-sm ${
                          active
                            ? "bg-gray-700 text-white"
                            : "text-gray-300"
                        }`}
                      >
                        Profile
                      </button>
                    )}
                  </MenuItem>

                  <MenuItem>
                    <LogoutBtn />
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navItems
            .filter((item) => item.active)
            .map((item) => (
              <DisclosureButton
                key={item.name}
                as="button"
                onClick={() => navigate(item.slug)}
                className="block w-full rounded-md px-3 py-2 text-left text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                {item.name}
              </DisclosureButton>
            ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}

export default Header;