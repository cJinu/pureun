import deviceImg from "../../asset/device.svg";

export default function DeviceCard({ deviceName, serialNum }) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center">
        <img src={deviceImg} className="w-8" alt="deviceImg" />
        <p className="w-full font-semibold">{deviceName}</p>
      </div>
      <p className="text-xs text-slate-700">{serialNum}</p>
    </div>
  );
}
