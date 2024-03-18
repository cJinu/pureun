import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import dayjs from "dayjs";

import PotSwiper from "../components/Pots/PotSwiper";
import TalkTitleCard from "../components/Talk/TalkTitleCard";
import chevron from "../asset/chevron-right.svg";
import { API_URL } from "../config/config";
import _ from "lodash";

export const changeKeysToCamelCase = (obj) => {
  if (_.isArray(obj)) {
    return obj.map((value) => changeKeysToCamelCase(value));
  } else if (_.isObjectLike(obj)) {
    return _.mapValues(
      _.mapKeys(obj, (value, key) => _.camelCase(key)),
      changeKeysToCamelCase,
    );
  }
  return obj;
};

export default function MainPage() {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.auth.userInfo);

  const goPotList = function () {
    navigate("/pot");
  };

  const goTalkList = function () {
    navigate("/talk");
  };

  const [talkList, setTalkList] = useState([]);
  const [potDetailList, setPotDetailList] = useState([]);

  // axios - 화분 정보
  useEffect(() => {
    const transformData = (data) => {
      return data.map((item) => ({
        potId: item.potId,
        userImgUrl: item.user.profileImgUrl,
        userName: item.user.nickname,
        potName: item.potName,
        potImgUrl: item.potImgUrl,
        potSpecies: item.potSpecies,
        nowTemperature: item.temperature,
        temperatureStatus: item.statusDto.tempState,
        nowMoisture: item.moisture,
        moistureStatus: item.statusDto.moisState,
        daysSinceWatering: item.statusDto.lastWaterDay,
        plantDate: dayjs(item.plantingDay).format("YY/MM/DD"),
        daysSincePlanting: item.statusDto.togetherDay,
      }));
    };
    const getPotDetailList = async () => {
      try {
        const res = await axios.get(`${API_URL}/pot/${userInfo.userId}`);
        const result = changeKeysToCamelCase(res.data);
        const transformedResult = transformData(result);
        setPotDetailList(transformedResult);
      } catch (e) {
        console.log(e);
      }
    };
    getPotDetailList();
  }, [userInfo.userId]);

  // 대화
  useEffect(() => {
    axios
      .get(`${API_URL}/talk/read/${userInfo.userId}`)
      .then((res) => {
        setTalkList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userInfo.userId]);

  return (
    <div className="flex flex-col gap-8 px-6 pt-4">
      {/* 화분 상태 요약 */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h1 className="text-title">우리 화분</h1>
          <div
            onClick={goPotList}
            className="flex cursor-pointer items-center gap-1"
          >
            <p className="text-xl font-semibold">화분 목록 가기</p>
            <img src={chevron} alt="goPotList" className="w-5" />
          </div>
        </div>
        <div className="flex items-center">
          <PotSwiper potList={potDetailList} />
        </div>
      </section>

      {/* 새로운 대화 */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h1 className="text-title">새로운 대화</h1>
          <div
            onClick={goTalkList}
            className="flex cursor-pointer items-center gap-1"
          >
            <p className="text-xl font-semibold">대화 목록 가기</p>
            <img src={chevron} alt="goTalkList" className="w-5" />
          </div>
        </div>
        <div className="mt-4 flex flex-wrap justify-center gap-1">
          {talkList.length > 0 ? (
            talkList.map((talk) => (
              <TalkTitleCard key={talk.talk_id} {...talk} />
            ))
          ) : (
            <div
              className="m-4 flex aspect-[16/5] w-80 items-center justify-center overflow-hidden rounded-lg bg-amber-50 text-xl 
              font-semibold text-amber-600 shadow-lg ring ring-amber-200 ring-offset-1 ring-offset-amber-200/10"
            >
              <p>아직 새로운 대화가 없어요!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
