import { Fragment } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Disclosure, Menu, Switch, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

import KidsmodeDeactivate from "./Kids/KidsmodeDeactivatemodal";
import UserProfileImage from "../components/Users/UserProfileImage";
import navImg from "../asset/log.svg";
import { authActions } from "../store/auth-slice";
import { uiActions } from "../store/ui-slice";

const navigation = [
  { name: "화분 목록", href: "/pot", current: false },
  { name: "아이 목록", href: "/kids", current: false },
  { name: "대화 목록", href: "/talk", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navigation() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const isKidsMode = useSelector((state) => state.auth.isKidsMode);

  const logoutHandler = () => {
    dispatch(authActions.logout());
    navigate("/hello");
  };

  // 키즈모드 dispatch
  const switchKidsMode = () => {
    if (isKidsMode) {
      // 키즈모드 해제 모달
      dispatch(uiActions.kidsmodeModalOpen());
    } else {
      dispatch(authActions.activateKidsMode());
      navigate("/kidsmode");
    }
  };

  return (
    <Disclosure
      as="nav"
      className="fixed top-0 z-20 w-full max-w-page bg-green-200"
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4">
            <div className="relative flex h-16 items-center justify-between">
              {/* Mobile menu button*/}
              {/* 키즈모드에서는 메뉴 버튼 안보이게 설정 */}
              {!isKidsMode && (
                <div className="flex items-center">
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:bg-green-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              )}

              <div className="flex items-center justify-center">
                <div className="flex flex-shrink-0 items-center">
                  <Link to={!isKidsMode ? "/" : "/kidsmode"}>
                    <img className="h-9 w-auto" src={navImg} alt="푸른" />
                  </Link>
                </div>
                {/* 웹 화면 메뉴 */}
                {/* <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-green-600 text-white"
                            : "text-black hover:bg-green-400 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium",
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div> */}
              </div>

              {/* Profile dropdown */}
              <div className="flex items-center px-1">
                <Menu as="div" className="">
                  <div>
                    <Menu.Button className="relative flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-400">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      {/* 프로필 이미지 */}
                      {userInfo && (
                        <div className="h-8 w-8 overflow-hidden rounded-full ring-2 ring-amber-300">
                          <UserProfileImage imgUrl={userInfo.userImgUrl} />
                        </div>
                      )}
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        <Switch.Group>
                          <div className="flex items-center">
                            <Switch.Label className="block px-4 py-2 text-sm text-gray-700">
                              키즈 모드
                            </Switch.Label>
                            <Switch
                              checked={isKidsMode}
                              onChange={switchKidsMode}
                              className={`${
                                isKidsMode ? "bg-green-600" : "bg-gray-200"
                              } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2`}
                            >
                              <span
                                className={`${
                                  isKidsMode ? "translate-x-6" : "translate-x-1"
                                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                              />
                            </Switch>
                          </div>
                        </Switch.Group>
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/profile"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700",
                            )}
                          >
                            내 프로필
                          </Link>
                        )}
                      </Menu.Item>
                      {/* <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#!"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700",
                            )}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item> */}
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={logoutHandler}
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "w-full px-4 py-2 text-start text-sm text-gray-700",
                            )}
                          >
                            로그아웃
                          </button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
          {/* 키즈모드 해제 모달 */}
          <KidsmodeDeactivate />

          <Disclosure.Panel className="">
            {({ close }) => (
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={
                      (item.current
                        ? "bg-green-600 text-white"
                        : "text-black hover:bg-green-400 hover:text-white",
                      "block rounded-md px-3 py-2 text-base font-medium")
                    }
                    aria-current={item.current ? "page" : undefined}
                    onClick={() => close()}
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
            )}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
