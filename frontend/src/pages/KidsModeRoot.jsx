import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Navigation from "../components/Navigation";

export default function KidsModeRootLayout() {
  const navigate = useNavigate();

  const isAuth = useSelector((state) => state.auth.isAuth);
  const isKidsMode = useSelector((state) => state.auth.isKidsMode);

  // 비로그인 상태에서 랜딩 페이지로 이동
  useEffect(() => {
    if (!isAuth) {
      navigate("/hello");
    } else if (!isKidsMode) {
      navigate("/");
    }
  }, [isAuth, isKidsMode, navigate]);

  return (
    <>
      <header>
        <Navigation />
      </header>

      <main className="px-6 py-20">
        <Outlet />
      </main>
    </>
  );
}
