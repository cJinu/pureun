import DeviceBaseCard from "./DeviceBaseCard";
import plus from "../../asset/plus_circle_slate.svg";

export default function DeviceAddCard() {
  return (
    <DeviceBaseCard>
      <div className="flex items-center justify-center gap-1">
        <p className="text-lg font-semibold text-slate-900">화분 추가하기</p>
        <img src={plus} alt="plus" className="w-11" />
      </div>
    </DeviceBaseCard>
  );
}
