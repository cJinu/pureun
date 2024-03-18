export default function BaseDetailCard({className, children}) {
  return (
    <div
      className={`m-4 aspect-[16/9] rounded-xl flex items-center justify-center bg-amber-50 px-4 py-3
      ring-2 ring-amber-200 ring-offset-1 ring-offset-amber-100 drop-shadow-lg ${className}`}
    >
      {children}
    </div>
  );
}
