import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import play from "../../asset/play.svg";
import pause from "../../asset/pause.svg";
import rewind from "../../asset/forward-solid_back.svg";
import foward from "../../asset/forward-solid_front.svg";

export default function AudioPlayer({ audioFiles }) {
  const location = useLocation();

  const [currentFileIndex, setCurrentFileIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio(audioFiles[0]));

  useEffect(() => {
    audioRef.current = new Audio(audioFiles[0]);
    audioRef.current.onended = () => {
      setIsPlaying(false); // 오디오 재생이 끝나면 isPlaying 상태를 false로 변경
    };
    return () => {
      audioRef.current.onended = null; // 컴포넌트가 언마운트되면 이벤트 핸들러를 제거
    };
  }, [audioFiles]);

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
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const nextAudio = useCallback(() => {
    if (currentFileIndex < audioFiles.length - 1) {
      audioRef.current.pause();
      setCurrentFileIndex(currentFileIndex + 1);
    }
  }, [currentFileIndex, audioFiles.length]);

  const prevAudio = () => {
    if (currentFileIndex > 0) {
      audioRef.current.pause();
      setCurrentFileIndex(currentFileIndex - 1);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    audioRef.current = new Audio(audioFiles[currentFileIndex]);
    audioRef.current.onended = nextAudio;
    if (isPlaying) {
      playAudio();
    }
  }, [currentFileIndex, isPlaying, audioFiles, nextAudio]);

  useEffect(() => {
    if (isPlaying) {
      playAudio();
    } else {
      pauseAudio();
    }
  }, [isPlaying]);

  return (
    <>
      <div className="flex w-full max-w-80 justify-between gap-4">
        <img
          onClick={prevAudio}
          src={rewind}
          className="w-10 cursor-pointer"
          alt="rewind button"
        />
        <img
          onClick={() => setIsPlaying(!isPlaying)}
          src={isPlaying ? pause : play}
          className="w-8 cursor-pointer"
          alt="play button"
        />
        <img
          onClick={nextAudio}
          src={foward}
          className="w-10 cursor-pointer"
          alt="foward button"
        />
      </div>
    </>
  );
}
