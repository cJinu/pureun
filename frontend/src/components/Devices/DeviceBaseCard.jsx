export default function DeviceBaseCard(props) {
  return (
    <div className="grid h-20 w-48 place-items-center rounded-lg border bg-slate-50 p-2">
      {props.children}
    </div>
  );
}
