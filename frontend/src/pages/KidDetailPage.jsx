import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

import KidProfileImage from "../components/Kids/KidProfileImage";
import PotSimpleCard from "../components/Pots/PotSimpleCard";
import Button from "../components/UI/Button";
import chevron from "../asset/chevron-left.svg";
import cog from "../asset/cog-8-tooth.svg";
import { API_URL } from "../config/config";

export default function KidDetailPage() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const now = location.pathname;

  // 뒤로가기
  const handleBack = () => {
    if (now === "/profile") {
      navigate("/");
    } else {
      navigate("/kids");
    }
  };

  const [user, setUser] = useState({
    user_id: userId,
    profile_img_url: "",
    nickname: "",
    birth_DT: "",
    gender: "",
    parent_id: 0,
    pots: [],
  });

  // 아이 화분 상세정보로 가기
  const goDetailPot = (pot_id) => {
    return () => navigate(`/pot/${pot_id}`);
  };

  // 아이 컬렉션으로 가기
  const goCollection = (user_id) => {
    return () => navigate(`/collection/${user_id}`);
  };

  // 아이 대화 목록으로 가기
  const goTalkList = (userId) => {
    return () => navigate(`/talk?user=${userId}`);
  };

  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    const newState = !isOpen;
    setIsOpen(newState);
  };

  const deleteKid = async () => {
    const isConfirmed = window.confirm("정말 삭제하시겠어요?");

    if (isConfirmed) {
      try {
        const response = await axios.delete(
          `${API_URL}/user/${userId}`,
        );
        // console.log(response);
        handleOpen();
      } catch (e) {
        console.log(e);
      } finally {
        navigate("/kids");
      }
    }
  };

  useEffect(() => {
    const id = now === "/profile" ? userInfo.userId : userId;
    const getUser = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/user/${id}`,
        );
        setUser(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    getUser();
  }, [userId]);

  return (
    <div className="px-6">
      <div className="mb-12 mt-4 flex flex-col gap-4">
        <div className="relative mx-2 mb-3 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <img
              onClick={handleBack}
              src={chevron}
              alt="back"
              className="w-6 cursor-pointer"
            />
            <h1 className="text-2xl font-bold">
              {now === "/profile" ? "내 프로필" : "우리 아이"}
            </h1>
          </div>
          {now !== "/profile" && (
            <img
              onClick={handleOpen}
              src={cog}
              alt="cog"
              className="w-7 cursor-pointer"
            />
          )}
          <ul
            className={`absolute right-1 top-9 z-10 w-32 overflow-hidden rounded-xl border bg-white ${isOpen ? "" : "hidden"}`}
          >
            <li onClick={deleteKid} className="px-4 py-2 hover:bg-gray-100">
              삭제하기
            </li>
          </ul>
        </div>
        <div className="grid grid-flow-row-dense grid-cols-8 place-items-center gap-2 rounded-3xl border border-amber-100 bg-amber-50 px-4 py-6 shadow-lg ring ring-inset ring-amber-200 ring-offset-2">
          <div className="col-span-4 p-2">
            <KidProfileImage imgUrl={user.profile_img_url} />
          </div>
          <div className="col-span-4">
            <ul className="text-base font-semibold">
              <li className="pb-1 text-xl">
                <span>{user.nickname}</span>
              </li>
              <li className="py-1">
                <span>생일: {user.birth_DT}</span>
              </li>
              {/* <li className="py-1">
                <span>성별: {user.gender}</span>
              </li> */}
              <li className="py-1">
                <Button
                  onClick={goCollection(userId)}
                  className="bg-amber-400 text-sm text-white hover:bg-amber-500"
                >
                  컬렉션 바로가기
                </Button>
              </li>
              {now !== "/profile" && (
                <li className="py-1">
                  <Button
                    onClick={goTalkList(userId)}
                    className="bg-green-500 text-sm text-white hover:bg-green-600"
                  >
                    대화 바로가기
                  </Button>
                </li>
              )}
            </ul>
          </div>
        </div>
        <section className="mt-4 rounded-lg border border-emerald-100/70 bg-emerald-50 px-0.5 pt-4 shadow-sm">
          <h1 className="px-6 text-xl font-bold">화분 정보</h1>
          {user.pots.length > 0 ? (
            <div className="my-2 grid w-full grid-cols-2 place-items-center">
              {user.pots.map((pot) => (
                <div
                  key={pot.pot_id}
                  onClick={goDetailPot(pot.pot_id)}
                  className="cursor-pointer"
                >
                  <PotSimpleCard
                    userImgUrl={user.profile_img_url}
                    potName={pot.pot_name}
                    potImgUrl={pot.pot_img_url}
                    className="w-36"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="m-4 flex flex-col items-center justify-center rounded-lg bg-emerald-100 p-4 text-green-800 shadow-md">
              <p>아직 화분이 없어요!</p>
              <p>화분을 추가해 보세요</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
