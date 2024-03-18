import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";

import PotDetailCard from "../components/Pots/PotDetailCard";
import PotCalander from "../components/Pots/PotCalander";
import PotChart from "../components/Pots/PotChart";
import Button from "../components/UI/Button";
import chevron from "../asset/chevron-left.svg";
import { API_URL } from "../config/config";

export default function PotDetailPage() {
  const { potId } = useParams();
  const navigate = useNavigate();

  // 뒤로가기
  const handleBack = () => {
    navigate("/pot");
  };

  // params가 숫자인지 확인
  const [potInfo, setPotInfo] = useState({});
  useEffect(() => {
    if (isNaN(potId)) {
      navigate("/error");
    }

    // 화분 정보 받아오기
    const getPotInfo = async (potId) => {
      try {
        const res = await axios({
          method: "get",
          url: `${API_URL}/pot/detail/${potId}`,
        });

        const potInfo = {
          potId: potId,
          potName: res.data.pot_name,
          userId: res.data.user.user_id,
          userName: res.data.user.nickname,
          potImgUrl: res.data.pot_img_url,
          potSpecies: res.data.pot_species,
          nowTemperature: res.data.temperature,
          temperatureStatus: res.data.statusDto.temp_state,
          nowMoisture: res.data.moisture,
          moistureStatus: res.data.statusDto.mois_state,
          daysSinceWatering: res.data.statusDto.lastWaterDay,
          plantDate: dayjs(res.data.planting_day).format("YY/MM/DD"),
          daysSincePlanting: res.data.statusDto.together_day,
        };

        setPotInfo(potInfo);
      } catch (err) {
        console.log(err);
      }
    };

    getPotInfo(potId);
  }, [potId, navigate]);

  // 화분 그래프
  const [potStatus, setPotStatus] = useState({ temperature: [], moisture: [] });
  useEffect(() => {
    const getPotStatus = async () => {
      try {
        const res = await axios({
          method: "get",
          url: `${API_URL}/pot-state/yesterday/${potId}`,
        });

        const data = {
          temperature: res.data.temperature.map((item) => ({
            mesure_DT: item.measure_DT.replace("T", " ").replace(".000Z", ""),
            data: item.data,
          })),
          moisture: res.data.moisture.map((item) => ({
            mesure_DT: item.measure_DT.replace("T", " ").replace(".000Z", ""),
            data: item.data,
          })),
        };
        setPotStatus(data);
      } catch (err) {
        console.log(err);
      }
    };
    getPotStatus();
  }, [potId]);

  // 이름이 받침으로 끝나는지 확인
  function hasCoda(name) {
    if (!name) {
      return false;
    }
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

  // 성장완료 컬렉션 이동
  const growthComplete = async () => {
    const isConfirmed = window.confirm(
      `${potInfo.potName}${selectPostposition(potInfo.potName)} 성장이 끝났나요?`,
    );

    if (isConfirmed) {
      const collectingPot = async () => {
        try {
          const res = await axios({
            method: "put",
            url: `${API_URL}/pot/collection/${potId}`,
          });

          navigate(`/collection/${potInfo.userId}`);
        } catch (err) {
          console.log(err);
        }
      };
      collectingPot();
    }
  };

  return (
    <>
      <div className="mb-2 mt-2 flex items-center gap-1 px-6">
        <img
          onClick={handleBack}
          src={chevron}
          alt="back"
          className="w-6 cursor-pointer"
        />
        <h1 className="text-2xl font-bold">
          <span className="me-2">
            {potInfo.userName}
            {selectPostposition(potInfo.userName)}
          </span>
          <span>{potInfo.potName}</span>
        </h1>
      </div>
      <div className="flex flex-col gap-4 px-6">
        {/* 화분 상태 정보 */}
        <div className="flex justify-center">
          <PotDetailCard
            {...potInfo}
            className="h-44 w-80"
            nameDisplay="hidden"
          />
        </div>

        {/* 캘린더 */}
        <section>
          <h2 className="mb-2 text-section">함께 한 기록</h2>
          <div className="max-w-[30rem] overflow-hidden rounded-xl border bg-white shadow-md">
            <PotCalander potId={potId} />
          </div>
        </section>

        {/* 온,습도 그래프 */}
        <section>
          <div className="mb-4">
            <h2 className="mb-2 text-section">어제의 온도</h2>
            <div className="flex w-full justify-center rounded-xl border bg-white shadow-md">
              {potStatus.temperature.length > 0 ? (
                <div className="w-11/12  overflow-auto">
                  <div className="h-96 min-w-[48rem] bg-white">
                    <PotChart
                      potData={potStatus.temperature}
                      id="온도"
                      scheme="pastel1"
                      type="temperature"
                    />
                  </div>
                </div>
              ) : (
                <div className="te flex w-full justify-center p-4">
                  <p>내일이 되면 오늘의 기록을 볼 수 있어요!</p>
                </div>
              )}
            </div>
          </div>
          <div>
            <h2 className="mb-2 text-section">어제의 습도</h2>
            <div className="flex w-full justify-center rounded-xl border bg-white shadow-md">
              {potStatus.temperature.length > 0 ? (
                <div className="w-11/12  overflow-auto">
                  <div className="h-96 min-w-[48rem] bg-white">
                    <PotChart
                      potData={potStatus.moisture}
                      id="습도"
                      scheme="paired"
                      type="moisture"
                    />
                  </div>
                </div>
              ) : (
                <div className="te flex w-full justify-center p-4">
                  <p>내일이 되면 오늘의 기록을 볼 수 있어요!</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 성장완료 버튼 */}
        <div className="mt-6 grid place-items-center">
          <Button
            onClick={growthComplete}
            className="w-32 bg-amber-300 text-white hover:bg-amber-400"
          >
            성장완료
          </Button>
        </div>
      </div>
    </>
  );
}
