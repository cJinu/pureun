import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import PotDetailCard from "./PotDetailCard";
import AddDetailCard from "../UI/AddDetailCard";

export default function PotSwiper({ potList }) {
  const navigate = useNavigate();

  const goPotDetail = function (potId) {
    return () => navigate(`/pot/${potId}`);
  };

  const goCreatPot = function () {
    navigate("/pot/create");
  };

  return (
    <Swiper slidesPerView={"auto"} loop={false}>
      {potList && potList.map((pot) => (
        <SwiperSlide key={pot.potId} className="me-2 w-auto-important">
          <div onClick={goPotDetail(pot.potId)} className="cursor-pointer">
            <PotDetailCard {...pot} className="w-80 h-48" />
          </div>
        </SwiperSlide>
      ))}
      <SwiperSlide className="me-4 w-auto-important">
        <div onClick={goCreatPot} className="cursor-pointer">
          <AddDetailCard text="화분 추가하기" className="w-80 h-48" />
        </div>
      </SwiperSlide>
    </Swiper>
  );
}
