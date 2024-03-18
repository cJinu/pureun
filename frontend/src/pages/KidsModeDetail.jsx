import { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import KidsModeNavigation from "../components/KidsModeNavigation";
import chevron from "../asset/chevron-left.svg";
import { API_URL } from "../config/config";

export default function KidsModeDetailLayout() {
  const navigate = useNavigate();
  const { userId } = useParams();

  // 뒤로가기
  const handleBack = () => {
    navigate("/kidsmode");
  };

  // 아이 이름
  const [userName, setUserName] = useState("");
  useEffect(() => {
    const getUserName = async () => {
      try {
        const res = await axios({
          method: "get",
          url: `${API_URL}/user/${userId}`,
        });

        // console.log(res.data);
        setUserName(res.data.nickname);
      } catch (err) {
        console.log(err);
      }
    };
    getUserName();
  }, [userId]);

  // 이름이 받침으로 끝나는지 확인
  function hasCoda(name) {
    const lastChar = name.charAt(name.length - 1); // 이름의 마지막 글자
    const uni = lastChar.charCodeAt(0); // 마지막 글자의 유니코드
    // 한글의 유니코드 범위(0xAC00 ~ 0xD7A3) 내에 있고, 마지막 글자가 받침을 가지는지 확인
    if (uni >= 0xac00 && uni <= 0xd7a3) {
      return (uni - 0xac00) % 28 === 0;
    }
    return true;
  }

  // 이름 뒤의 조사 선택
  function selectPostposition(name) {
    return hasCoda(name) ? "의" : "이의";
  }

  return (
    <>
      <div className="mb-6 mt-3 flex items-center gap-1">
        <img
          onClick={handleBack}
          src={chevron}
          alt="back"
          className="w-8 cursor-pointer"
        />
        <h1 className="text-title">
          <span className="me-3">
            {userName}
            {selectPostposition(userName)}
          </span>
          <span>화분</span>
        </h1>
      </div>
      <KidsModeNavigation />
      <Outlet />
    </>
  );
}
