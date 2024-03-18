import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "../components/UI/Button";
import log from "../asset/log_icon.svg";
import { useEffect } from "react";

export default function LandingPage() {
  const navigate = useNavigate();

  const isAuth = useSelector((state) => state.auth.isAuth);
  const isKidsMode = useSelector((state) => state.auth.isKidsMode);

  // 로그인 상태에서 메인 페이지로 이동
  useEffect(() => {
    if (isAuth) {
      if (!isKidsMode) {
        navigate("/");
      } else {
        navigate("/kidsmode");
      }
    }
  }, [isAuth, isKidsMode, navigate]);

  const goSignUp = () => {
    navigate("/signup");
  };

  const goLogIn = () => {
    navigate("/login");
  };

  return (
    <div className="bg-green-50">
      <div className="flex min-h-screen items-center justify-center bg-amber-200 bg-opacity-15">
        <div className="flex flex-col items-center gap-3 px-6">
          <div className="flex flex-wrap items-end justify-center gap-1">
            <img src={log} alt="img" className="w-32" />
            <h1 className="font-katuri text-9xl text-green-950">푸른</h1>
          </div>
          <p className="font-KCCMurukmuruk text-xl text-green-800 ">
            아이와 함께 성장하는 화분
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-6">
            <Button
              className="w-36 bg-green-300 text-lg font-semibold text-slate-50 hover:bg-green-400"
              onClick={goLogIn}
            >
              로그인
            </Button>
            <Button
              className="w-36 bg-green-300 text-lg font-semibold text-slate-50 hover:bg-green-400"
              onClick={goSignUp}
            >
              회원가입
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
