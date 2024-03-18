export default function BaseSimpleCard({ className, children }) {
  return (
    <div
      className={`mx-3 my-4 aspect-[3/4] rounded-lg bg-emerald-100 px-3 py-2 ${className}
      ring-2 ring-emerald-300 ring-offset-1 ring-offset-emerald-200 drop-shadow-lg`}
    >
      {children}
    </div>
  );
}
