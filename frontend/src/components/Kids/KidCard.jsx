import BaseSimpleCard from "../UI/BaseSimpleCard";
import KidProfileImage from "./KidProfileImage";

export default function KidCard(props) {
  return (
    <BaseSimpleCard className={props.className}>
      <div className="flex h-full flex-col justify-evenly items-center">
        <div className="w-full overflow-hidden rounded-lg">
          <KidProfileImage imgUrl={props.profile_img_url} />
        </div>
        <span className="text-xl font-semibold">{props.nickname}</span>
      </div>
    </BaseSimpleCard>
  );
}
