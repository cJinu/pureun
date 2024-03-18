export default function KidProfileImage({ imgUrl }) {
  return (
    <div className="flex aspect-square items-center overflow-hidden">
      <img
        src={imgUrl}
        alt="kidImg"
        className="min-h-full min-w-full object-cover"
      />
    </div>
  );
}
