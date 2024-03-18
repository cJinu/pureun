import BaseSimpleCard from "./BaseSimpleCard";
import plus from "../../asset/plus_circle_emerald.svg";

export default function AddSimpleCard({className, text}) {
  return (
    <BaseSimpleCard className={className}>
      <div className="flex h-full flex-col items-center justify-center">
        <img src={plus} alt="plus" className="w-3/5" />
        <div className="font-semibold text-center text-emerald-600">{text}</div>
      </div>
    </BaseSimpleCard>
  );
}
