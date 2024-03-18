import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { RadioGroup } from "@headlessui/react";
import axios from "axios";

import Button from "../components/UI/Button";
import Input from "../components/UI/Input";
import logImg from "../asset/log.svg";
import { API_URL } from "../config/config";
import { authActions } from "../store/auth-slice";

export default function SignUpPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goLanding = () => {
    navigate("/hello");
  };

  // 유저 이름
  const [userName, setUserName] = useState("");
  const handleUserName = (event) => {
    setUserName(event.target.value);
  };

  // 이메일
  const [email, setEmail] = useState("");
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  // 비밀번호
  const [userPassword, setUserPassword] = useState(null);
  const handlePassword = (event) => {
    setUserPassword(event.target.value);
  };

  // 비밀번호 확인
  const [confirmPassword, setConfirmPassword] = useState(null);
  const handleConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };

  // 닉네임
  const [nickname, setNickname] = useState("");
  const handleNickname = (event) => {
    setNickname(event.target.value);
  };

  // 생년월일
  const [birthDate, setBirthDate] = useState("1990-01-01");
  const handleBirthDate = (event) => {
    setBirthDate(event.target.value);
  };

  // 성별
  const [selectedGender, setSelectedGender] = useState("M");

  // 버튼 활성화
  const isFormValid =
    userName &&
    email &&
    userPassword &&
    confirmPassword &&
    nickname &&
    userPassword === confirmPassword;

  // 회원가입
  const signUp = async (event) => {
    event.preventDefault();

    const signUpData = {
      nickname: nickname,
      birth_DT: birthDate,
      gender: selectedGender,
      user_name: userName,
      user_email: email,
      user_password: userPassword,
    };

    try {
      const res = await axios({
        method: "post",
        url: `${API_URL}/user-login/save`,
        data: signUpData,
      });

      if (res.data === "SUCCESS") {
        const loginData = {
          user_email: email,
          user_password: userPassword,
        };

        const loginRes = await axios({
          method: "post",
          url: `${API_URL}/user-login`,
          data: loginData,
        });

        const { user_id, user_email, profile_img_url } = loginRes.data;

        const userInfo = {
          userId: user_id,
          userEmail: user_email,
          userImgUrl: profile_img_url,
        };

        dispatch(authActions.login(userInfo));
        dispatch(authActions.deactivateKidsMode());
        navigate("/kid/create");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="px-8 py-12">
      <div>
        <img
          onClick={goLanding}
          className="mx-auto h-10 w-auto"
          src={logImg}
          alt="purun"
        />
        <h1 className="mx-2 my-4 text-title">회원가입</h1>
      </div>

      <form onSubmit={signUp} className="my-6 flex flex-col gap-2">
        <section className="mb-3">
          <label htmlFor="">이름</label>
          <Input
            type="text"
            name="userName"
            onChange={handleUserName}
            className="w-full focus:ring-green-400"
            required
          />
        </section>

        <section className="mb-3">
          <label htmlFor="">이메일</label>
          <Input
            type="email"
            name="email"
            onChange={handleEmail}
            className="w-full focus:ring-green-400"
            required
          />
        </section>

        <section className="mb-3">
          <label htmlFor="">비밀번호</label>
          <Input
            type="password"
            name="password"
            onChange={handlePassword}
            className="w-full focus:ring-green-400"
            required
          />
        </section>

        <section className="mb-3">
          <label htmlFor="">비밀번호확인</label>
          <Input
            type="password"
            name="confirmPassword"
            onChange={handleConfirmPassword}
            className="w-full focus:ring-green-400"
            required
          />
          {confirmPassword && userPassword !== confirmPassword && (
            <p className="mt-1 text-sm text-red-700">
              비밀번호가 일치하지 않습니다!
            </p>
          )}
        </section>

        <section className="mb-3">
          <label htmlFor="">닉네임</label>
          <Input
            type="text"
            name="nickname"
            onChange={handleNickname}
            className="w-full focus:ring-green-400"
            required
          />
        </section>

        <div className="flex flex-wrap gap-4">
          <section className="mb-3">
            <span>생년월일</span>
            <Input
              type="date"
              name="birthDate"
              value={birthDate}
              onChange={handleBirthDate}
              className="block focus:ring-green-400"
              required
            />
          </section>

          <section className="mb-3">
            <RadioGroup
              value={selectedGender}
              onChange={setSelectedGender}
              name="gender"
            >
              <RadioGroup.Label>성별</RadioGroup.Label>
              <div className="flex gap-3">
                <RadioGroup.Option
                  value="M"
                  className={({ checked }) =>
                    `${
                      checked
                        ? "bg-blue-400 text-white ring ring-blue-400 ring-opacity-50 ring-offset-1"
                        : "bg-blue-200 text-slate-800"
                    } mt-2 rounded-lg px-3 py-1.5 font-semibold`
                  }
                >
                  남자
                </RadioGroup.Option>
                <RadioGroup.Option
                  value="F"
                  className={({ checked }) =>
                    `${
                      checked
                        ? "bg-red-400 text-white ring ring-red-400 ring-opacity-50 ring-offset-1"
                        : "bg-red-200 text-slate-800"
                    } mt-2 rounded-lg px-3 py-1.5 font-semibold`
                  }
                >
                  여자
                </RadioGroup.Option>
              </div>
            </RadioGroup>
          </section>
        </div>

        <div className="mt-8 grid place-content-center">
          <Button
            type="submit"
            isDisabled={!isFormValid}
            className="w-40 cursor-pointer bg-green-300 text-white hover:bg-green-400"
          >
            회원가입하기
          </Button>
        </div>
      </form>

      <p className="text-md text-center text-gray-500">
        이미 계정이 있으신가요?{" "}
        <Link
          to="/login"
          className="font-semibold leading-6 text-green-400 hover:text-green-500
              focus-visible:outline-offset-2 focus-visible:outline-gray-300"
        >
          로그인 바로가기
        </Link>
      </p>
    </div>
  );
}
