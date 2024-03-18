import { NavLink } from "react-router-dom";

export default function KidsModeNavigation() {
  return (
    <div className="my-4 flex gap-2 text-center">
      <NavLink
        to=""
        end
        className={({ isActive }) =>
          `${isActive ? "cursor-default bg-emerald-500 text-white" : "bg-green-100 text-green-400"} basis-1/2 rounded-md py-3 text-lg font-semibold`
        }
      >
        성장 중
      </NavLink>
      <NavLink
        to="collection"
        className={({ isActive }) =>
          `${isActive ? "cursor-default bg-emerald-500 text-white" : "bg-green-100 text-green-400"} basis-1/2 rounded-md py-3 text-lg font-semibold`
        }
      >
        성장 완료
      </NavLink>
    </div>
  );
}
