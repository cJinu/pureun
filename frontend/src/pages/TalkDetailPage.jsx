import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";

import KidChatBubble from "../components/Talk/KidChatBubble";
import GptChatBubble from "../components/Talk/GptChatBubble";
import AudioPlayer from "../components/Talk/AudioPlayer";
import PotProfileImage from "../components/Pots/PotProfileImage";
import Star from "../components/UI/star";
import chevron from "../asset/chevron-left.svg";
import { API_URL } from "../config/config";

export default function TalkDetailPage() {
  const navigate = useNavigate();
  const { talkId } = useParams();
  const [talkDetail, setTalkDetail] = useState({
    talk_id: 0,
    talk_title: "",
    talk_DT: "",
    star_FG: 0,
    sentences: [],
    pot: {
      pot_id: 0,
      pot_img_url: "",
      user: {
        user_id: 0,
        profile_img_url: "",
      },
    },
  });

  // const createdAt = dayjs(created_DT).format("YYYY/MM/DD");

  // 뒤로가기
  const handleBack = () => {
    navigate("/talk");
  };

  // 즐겨찾기
  const [starState, setStarState] = useState(0);
  const handleStar = () => {
    axios({
      method: "put",
      url: `${API_URL}/talk/bookmark/${talkId}`,
    })
      .then((res) => {
        const newStarState = !starState;
        setStarState(newStarState);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 전체 오디오 리스트
  const [audioUrls, setAudioUrls] = useState([]);

  // 대화 불러오기
  useEffect(() => {
    const getTalkDetail = async () => {
      try {
        const res = await axios.get(`${API_URL}/talk/${talkId}`);
        const audioUrls = res.data.sentences.map((sentence) => sentence.audio);
        setAudioUrls(audioUrls);
        setTalkDetail(res.data);
        setStarState(res.data.star_FG);
        // console.log(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    getTalkDetail();
  }, [talkId]);

  return (
    <div>
      {/* 타이틀 */}
      <div className="fixed top-16 flex w-full max-w-page items-center justify-between gap-2 border-b-2 border-amber-600 bg-amber-100 px-4 py-3">
        {/* 뒤로가기 */}
        <img
          onClick={handleBack}
          src={chevron}
          alt="back"
          className="w-8 cursor-pointer"
        />
        {/* 제목, 화분, 날짜 */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="w-6 overflow-hidden rounded-full">
              <PotProfileImage
                imgUrl={talkDetail.pot.user.profile_img_url}
                alt="pot"
              />
            </div>
            <h1 className="max-w-52 truncate text-xl">
              {talkDetail.talk_title}
            </h1>
          </div>
          <p className="ms-auto text-xs">
            {dayjs(talkDetail.talk_DT).format("YYYY/MM/DD")}
          </p>
        </div>
        {/* 즐겨찾기 */}
        <div className="p-1">
          <Star
            onClick={handleStar}
            fill={starState ? "#FCD34D" : "#FFFFFF"}
            className="w-10 cursor-pointer"
          />
        </div>
      </div>

      {/* 대화 */}
      <div className="flex flex-col gap-6 px-6 py-4 pt-24">
        {talkDetail.sentences.map((chat, index) =>
          chat.talker === "user" ? (
            <div className="me-auto" key={index}>
              <KidChatBubble
                userImg={talkDetail.pot.user.profile_img_url}
                userName={talkDetail.pot.user.nickname}
                audioUrl={chat.audio}
              >
                {chat.content}
              </KidChatBubble>
            </div>
          ) : (
            <div className="ms-auto" key={index}>
              <GptChatBubble>{chat.content}</GptChatBubble>
            </div>
          ),
        )}
      </div>

      {/* 재생바 */}
      <div className="fixed bottom-0 flex w-full max-w-page justify-center bg-amber-100 p-4">
        <AudioPlayer audioFiles={audioUrls} />
      </div>
    </div>
  );
}
