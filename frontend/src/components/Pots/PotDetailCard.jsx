import BaseDetailCard from "../UI/BaseDetailCard";
import PotProfileImage from "./PotProfileImage";

export default function PotDetailCard({
  // 화분 정보
  userName,
  potName,
  potImgUrl,
  potSpecies,
  nowTemperature,
  temperatureStatus,
  nowMoisture,
  moistureStatus,
  daysSinceWatering,
  plantDate,
  daysSincePlanting,
  // css 정보
  className,
  nameDisplay,
}) {
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

  const textSize = function (userName, potName) {
    if (!userName || !potName) {
      return "";
    }
    const totalLength =
      userName.length + selectPostposition(userName).length + potName.length;
    if (totalLength < 18) {
      return "text-lg";
    } else if (totalLength < 21) {
      return "text-base";
    } else {
      return "text-sm";
    }
  };

  return (
    <BaseDetailCard className={className}>
      <div className="grid grid-cols-12 place-content-center gap-1">
        <h1
          className={`col-span-12 flex flex-wrap font-bold ${textSize(userName, potName)} ${nameDisplay}`}
        >
          <span className="me-2">
            {userName}
            {selectPostposition(userName)}
          </span>
          <span>{potName}</span>
        </h1>

        <div className="col-span-5 place-self-center overflow-hidden rounded-xl">
          <PotProfileImage imgUrl={potImgUrl} />
        </div>

        <ul className="col-span-6 col-start-7 text-sm font-semibold">
          <li>
            품종: <span>{potSpecies}</span>
          </li>
          <li>
            현재 온도: <span>{nowTemperature}℃</span> (
            <span
              className={`${temperatureStatus === "적정" ? "text-green-700" : "text-orange-500"}`}
            >
              {temperatureStatus}
            </span>
            )
          </li>
          <li>
            현재 습도: <span>{nowMoisture}%</span> (
            <span
              className={`${temperatureStatus === "적정" ? "text-green-700" : "text-orange-500"}`}
            >
              {moistureStatus}
            </span>
            )
          </li>
          <li>
            물 준 날: <span>{daysSinceWatering}</span>일 전
          </li>
          <li>
            심은 날: <span>{plantDate}</span>
          </li>
          <li>
            <span className="text-xl font-bold text-green-500">
              {daysSincePlanting}
            </span>
            일째 함께하는 중
          </li>
        </ul>
      </div>
    </BaseDetailCard>
  );
}
