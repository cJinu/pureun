import BaseDetailCard from "./BaseDetailCard";
import plus from "../../asset/plus_circle_amber.svg";

export default function AddDetailCard({text, className}) {
  return (
    <BaseDetailCard className={className}>
      <div className="grid place-items-center justify-center">
        <img src={plus} alt="plus" className="w-18" />
        <p className="text-lg font-semibold text-amber-600">{text}</p>
      </div>
    </BaseDetailCard>
  );
}
