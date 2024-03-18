export default function PotProfileImage({ imgUrl }) {
  return (
    <div className="flex items-center overflow-hidden aspect-square">
      <img
        src={imgUrl}
        alt="potImg"
        className="min-h-full min-w-full object-cover"
      />
    </div>
  );
}
