import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import Button from "../components/UI/Button";
import logImg from "../asset/log.svg";
import Input from "../components/UI/Input";
import { authActions } from "../store/auth-slice";
import { API_URL } from "../config/config";

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goLanding = () => {
    navigate("/hello");
  };

  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (event) => {
    setUserEmail(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  // 로그인
  const login = async (event) => {
    event.preventDefault();

    const loginData = {
      user_email: userEmail,
      user_password: password,
    };

    try {
      const res = await axios({
        method: "post",
        url: `${API_URL}/user-login`,
        data: loginData,
      });

      const { user_id, user_email, profile_img_url } = res.data;

      const userInfo = {
        userId: user_id,
        userEmail: user_email,
        userImgUrl: profile_img_url,
      };

      dispatch(authActions.login(userInfo));

      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-8 py-12">
        <div className="">
          <img
            onClick={goLanding}
            className="mx-auto h-10 w-auto"
            src={logImg}
            alt="purun"
          />
          <h1 className="mx-2 my-4 text-title">로그인</h1>
        </div>

        <div className="mt-10 ">
          <form onSubmit={login}>
            <div className="space-y-6">
              <section>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  이메일
                </label>
                <div className="mt-2">
                  <Input
                    id="email"
                    type="email"
                    onChange={handleEmail}
                    value={userEmail}
                    placeholder="email@google.com"
                    required
                    className="block w-full placeholder:text-gray-400 focus:ring-green-400 "
                  />
                </div>
              </section>

              <section>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    비밀번호
                  </label>
                  {/* <div className="text-sm">
                  <a href="#" className="font-semibold text-green-400 hover:text-green-500">
                    비밀번호 찾기
                  </a>
                </div> */}
                </div>
                <div className="mt-2">
                  <Input
                    id="password"
                    type="password"
                    onChange={handlePassword}
                    value={password}
                    required
                    className="block w-full focus:ring-green-400"
                  />
                </div>
              </section>
            </div>

            <Button
              type="submit"
              className="mt-10 w-full bg-green-300 text-white shadow-sm hover:bg-green-400"
            >
              로그인
            </Button>
          </form>

          <p className="text-m mt-6 text-center text-gray-500">
            서비스를 이용하고 싶으신가요?{" "}
            <NavLink
              to="/signup"
              className="font-semibold leading-6 text-green-400 hover:text-green-500 
                focus-visible:outline-offset-2 focus-visible:outline-gray-300"
            >
              회원가입 바로가기
            </NavLink>
          </p>
        </div>
      </div>
    </>
  );
}