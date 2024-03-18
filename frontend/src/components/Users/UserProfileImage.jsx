export default function UserProfileImage({ imgUrl }) {
  return (
    <div className="flex items-center overflow-hidden aspect-square">
      <img
        src={imgUrl}
        alt="userImg"
        className="min-h-full min-w-full object-cover"
      />
    </div>
  );
}
