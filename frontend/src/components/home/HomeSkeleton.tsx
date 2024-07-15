import PhoneInfoSkeleton from "../phones/PhoneInfoSkeleton";

const HomeSkeleton = () => {
  return (
    <div className="overflow-y-hidden">
      <PhoneInfoSkeleton />
      <PhoneInfoSkeleton />
      <PhoneInfoSkeleton />
      <PhoneInfoSkeleton />
    </div>
  );
};

export default HomeSkeleton;
