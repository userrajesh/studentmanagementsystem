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

import {  LogoutBtn } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import userAuth from "../../../appwrite/authConfig";

function Header() {
  const userData = useSelector((state) => state.user_authentication.userData);
  console.log(userData);
  const authStatus = useSelector(
    (state) => state.user_authentication.loginStatus,
  );
  const navigate = useNavigate();

  const navItems = [
    // { name: "Home", slug: "/", active: true },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ];

  const loginSignup = [
    { name: "Signup", slug: "/registeruser", active: !authStatus },
  ];

  return (
    <Disclosure as="nav" className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Mobile Menu Button */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white">
              <Bars3Icon className="block size-6 group-data-open:hidden" />
              <XMarkIcon className="hidden size-6 group-data-open:block" />
            </DisclosureButton>
          </div>

          {/* Logo */}
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center text-white font-bold text-lg">
              FaceBook by Rajesh.
            </div>

            {/* Desktop Menu */}
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navItems
                  .filter((item) => item.active)
                  .map((item) => (
                    <button
                      key={item.name}
                      onClick={() => navigate(item.slug)}
                      className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                      {item.name}
                    </button>
                  ))}
              </div>
            </div>
          </div>

          {/* Right Section */}
          {loginSignup
            .filter((item) => item.active)
            .map((item) => (
              <button
                className="rounded-full p-1 text-gray-400 hover:text-white"
                onClick={() => navigate(item.slug)}
              >
                {item.name}
              </button>
            ))}

          {authStatus && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:ml-6 sm:pr-0">
              {/* Notification */}
              {userData ? (
                <label className="text-gray-400 mx-1.5 hover:text-white">
                  Welcome {userData.name.split(" ")[0]}
                </label>
              ) : (
                ""
              )}
              <button className="rounded-full p-1 text-gray-400 hover:text-white">
                <BellIcon className="size-6" />
              </button>

              {/* Profile Dropdown */}
              <Menu as="div" className="relative ml-3">
                <MenuButton className="flex rounded-full">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
                    className="size-8 rounded-full"
                  />
                </MenuButton>

                <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-gray-800 py-1 shadow-lg">
                  <MenuItem>
                    <button className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 w-full text-left">
                      Profile
                    </button>
                  </MenuItem>

                  <MenuItem>
                    <LogoutBtn className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 w-full text-left" />
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
                onClick={() => navigate(item.slug)}
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
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
