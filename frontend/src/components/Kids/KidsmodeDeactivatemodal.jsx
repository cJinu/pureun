import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";

import Button from "../UI/Button";
import Input from "../UI/Input";
import logImg from "../../asset/log_icon.svg";
import { authActions } from "../../store/auth-slice";
import { uiActions } from "../../store/ui-slice";
import { API_URL } from "../../config/config";

export default function KidsmodeDeactivate() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const isOpen = useSelector((state) => state.ui.kidsmodeModalIsOpen);

  const [password, setPassword] = useState("");
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  // 모달창 닫기
  const handleClose = () => {
    dispatch(uiActions.kidsmodeModalClose());
    setPassword(null);
  };

  // 로그인
  const kidsmodeDeactivate = async (event) => {
    event.preventDefault();

    const loginData = {
      user_email: userInfo.userEmail,
      user_password: password,
    };

    try {
      const res = await axios({
        method: "post",
        url: `${API_URL}/user-login`,
        data: loginData,
      });

      // console.log(res)
      dispatch(uiActions.kidsmodeModalClose());
      dispatch(authActions.deactivateKidsMode());
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-30" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white px-8 py-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="my-2 flex items-end gap-2 text-title text-gray-900"
                >
                  <span>키즈모드 해제하기</span>
                  <img className="w-10" src={logImg} alt="purun" />
                </Dialog.Title>
                <form
                  onSubmit={kidsmodeDeactivate}
                  className="mt-6 flex flex-col gap-4"
                >
                  <div>
                    <label
                      htmlFor="deviceName"
                      className="text-lg font-semibold"
                    >
                      비밀번호
                    </label>

                    <div className="mt-2">
                      <Input
                        id="password"
                        type="password"
                        onChange={handlePassword}
                        value={password}
                        placeholder="사용자 비밀번호"
                        required
                        className="block w-full placeholder:text-gray-400 focus:ring-green-400"
                      />
                    </div>
                  </div>

                  <div className="mt-3 flex">
                    <Button
                      type="submit"
                      className="ms-auto bg-green-400 text-white shadow-sm shadow-amber-100
                    hover:bg-green-500 hover:shadow-green-600 disabled:shadow-none"
                      isDisabled={!password}
                    >
                      키즈모드 해제
                    </Button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
