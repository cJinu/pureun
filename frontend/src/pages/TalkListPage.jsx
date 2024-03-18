import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

import TalkTitleCard from "../components/Talk/TalkTitleCard";
import Filter from "../components/UI/Filter";
import chevron from "../asset/chevron-left.svg";
import { API_URL } from "../config/config";

export default function TalkListPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const queryParams = new URLSearchParams(location.search);
  const user = queryParams.get("user");

  const [isStar, setIsStar] = useState(false);
  const [talkList, setTalkList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [filteredTalks, setFilteredTalks] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [userName, setUserName] = useState("");

  // 뒤로가기
  const handleBack = () => {
    if (user) {
      navigate(`/kid/${user}`);
    } else {
      navigate("/");
    }
  };

  const handleClickAll = () => {
    setIsStar(false);
  };
  const handleClickFavorite = () => {
    setIsStar(true);
  };

  // 대화 리스트
  useEffect(() => {
    const userId = user ? user : userInfo.userId;
    axios
      .get(`${API_URL}/talk/all/${userId}`)
      .then((res) => {
        setTalkList(res.data.reverse()); // 최신 대화가 위에 보이도록 설정
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userInfo.userId, user]);

  // 유저 리스트 (필터목록)
  useEffect(() => {
    axios
      .get(`${API_URL}/user/child/${userInfo.userId}`)
      .then((res) => {
        const userList = res.data.map((item) => ({
          userId: item.user_id,
          userName: item.nickname,
        }));

        setUserList(userList);

        const foundUser = userList.find((item) => item.userId === Number(user));
        if (foundUser) {
          setUserName(foundUser.userName);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userInfo.userId, user, isStar]);

  // 전체 보기, 즐겨찾기
  useEffect(() => {
    // isStar 상태값이 변경될 때마다 필터링을 수행합니다.
    if (isStar) {
      setFilteredData(talkList.filter((item) => item.star_FG === 1)); // isStar가 true일 때, star_FG가 1인 데이터만 필터링
    } else {
      setFilteredData(talkList); // isStar가 false일 때, 모든 데이터를 표시
    }
  }, [isStar, talkList]);

  // 주인 필터링 확인
  useEffect(() => {
    if (selectedUser) {
      setFilteredTalks(
        filteredData.filter((talk) => talk.pot.user.user_id === selectedUser),
      );
    } else {
      setFilteredTalks(filteredData);
    }
  }, [selectedUser, filteredData, isStar]);

  // 필터링된 주인 화분만 띄우기
  const handleUserChange = (value) => {
    setSelectedUser(value);
  };

  // 대화 즐겨찾기
  const handleStar = (talk_id) => {
    axios({
      method: "put",
      url: `${API_URL}/talk/bookmark/${talk_id}`,
    })
      .then((res) => {
        setTalkList(
          talkList.map((talk) => {
            if (talk.talk_id === talk_id) {
              return { ...talk, star_FG: talk.star_FG === 1 ? 0 : 1 };
            } else {
              return talk;
            }
          }),
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
    if (!name) {
      return "";
    }
    return hasCoda(name) ? "의" : "이의";
  }

  return (
    <div className="">
      <div className="fixed top-16 w-full max-w-page bg-amber-overlay pt-2">
        <div className="flex items-center gap-1 px-6 pt-4">
          <img
            onClick={handleBack}
            src={chevron}
            alt="back"
            className="w-8 cursor-pointer"
          />
          <h1 className="text-title">
            <span className="me-3">
              {user ? (
                <>
                  {userName}
                  {selectPostposition(userName)}
                </>
              ) : (
                "우리"
              )}
            </span>
            대화
          </h1>
        </div>

        {/* 전체 | 즐겨찾기 필터 */}
        <div className="flex border-amber-300 text-center text-xl font-semibold">
          <p
            onClick={handleClickAll}
            className={`basis-1/2 cursor-pointer py-3 ${isStar ? "text-amber-cloudy" : "text-slate-950"}`}
          >
            전체
          </p>
          <div className="my-3 box-border w-0.5 bg-amber-300"></div>
          <p
            onClick={handleClickFavorite}
            className={`basis-1/2 cursor-pointer py-3 ${isStar ? "text-slate-950" : "text-amber-cloudy"}`}
          >
            즐겨찾기
          </p>
        </div>
        {/* 주인 선택 필터 */}
        {!user && (
          <div className="mb-4 me-8 ms-auto w-64">
            <Filter
              targetList={userList}
              filterKey="userId"
              filterValue="userId"
              option="userName"
              onFilterChange={handleUserChange}
              allTarget={true}
            />
          </div>
        )}
      </div>

      {/* 대화 목록 */}
      <div
        className={`mx-2 flex flex-wrap gap-1 px-6 ${user ? "pt-28" : "pt-40"}`}
      >
        {filteredTalks.length > 0 ? (
          filteredTalks
            .filter((talk) => !isStar || talk.star_FG)
            .map((talk) => (
              <TalkTitleCard
                key={talk.talk_id}
                handleStar={handleStar}
                {...talk}
              />
            ))
        ) : (
          <div
            className="m-4 flex aspect-[16/5] w-80 items-center justify-center overflow-hidden rounded-lg bg-amber-50 text-xl 
              font-semibold text-amber-600 shadow-lg ring ring-amber-200 ring-offset-1 ring-offset-amber-300"
          >
            <p>
              {isStar
                ? "아직 즐겨찾기한 대화가 없어요!"
                : "아직 새로운 대화가 없어요!"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
