import PotProfileImage from "./PotProfileImage";
import BaseSimpleCard from "../UI/BaseSimpleCard";
import UserProfileImage from "../Users/UserProfileImage";

export default function PotSimpleCard({
  userImgUrl,
  potName,
  potImgUrl,
  className,
}) {
  return (
    <BaseSimpleCard className={className}>
      <div className="flex h-full flex-col justify-evenly">
        {/* 화분 사진 */}
        <div className="mx-auto w-full overflow-hidden rounded-lg">
          <PotProfileImage imgUrl={potImgUrl} />
        </div>

        {/* 아이 사진 & 화분 이름 */}
        <div className="flex items-center gap-2">
          <div className="basis-1/3 overflow-hidden rounded-full border border-amber-500">
            <UserProfileImage imgUrl={userImgUrl} />
          </div>
          <div className="text- basis-3/4">{potName}</div>
        </div>
      </div>
    </BaseSimpleCard>
  );
}
