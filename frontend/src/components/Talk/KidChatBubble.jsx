import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

import UserProfileImage from "../Users/UserProfileImage";
import play from "../../asset/play_circle.svg";
import pause from "../../asset/pause_circle.svg";

export default function KidChatBubble({
  children,
  userImg,
  userName,
  audioUrl,
}) {
  const location = useLocation();

  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio(audioUrl));

  useEffect(() => {
    audioRef.current = new Audio(audioUrl);
    audioRef.current.onended = () => {
      setIsPlaying(false); // 오디오 재생이 끝나면 isPlaying 상태를 false로 변경
    };
    return () => {
      audioRef.current.onended = null; // 컴포넌트가 언마운트되면 이벤트 핸들러를 제거
    };
  }, [audioUrl]);

  useEffect(() => {
    if (audioRef.current) {
      pauseAudio();
    }
  }, [location.pathname]);

  const playAudio = async () => {
    try {
      await audioRef.current.play();
      setIsPlaying(true);
    } catch (error) {
      console.log(error);
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      // audioRef.current가 null인지 확인
      audioRef.current.pause();
    }
    setIsPlaying(false);
  };

  useEffect(() => {
    if (isPlaying) {
      playAudio();
    } else {
      pauseAudio();
    }
  }, [isPlaying]);

  return (
    <div className="flex items-start gap-2">
      <div className="w-10 overflow-hidden rounded-full border-2 border-amber-400">
        <UserProfileImage imgUrl={userImg} />
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="font-semibold">{userName}</span>

          <audio id="audioContainer">
            <source id="audioSource" src={audioUrl}></source>
          </audio>

          {/* 음성 재생 */}
          <img
            onClick={() => setIsPlaying(!isPlaying)}
            src={isPlaying ? pause : play}
            className="w-6 cursor-pointer"
            alt="play button"
          />
        </div>

        {/* 텍스트 */}
        <div className="max-w-56 text-wrap rounded-b-2xl rounded-tr-2xl bg-amber-200 p-4">
          <p>{children}</p>
        </div>
      </div>
    </div>
  );
}
