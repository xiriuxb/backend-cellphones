const PhoneInfoSkeleton = () => {
  return (
    <div className="flex max-w-screen-md w-screen gap-6 px-4 py-2 rounded-lg hover:bg-zinc-700/10 hover:shadow-sm transition-all">
      <div className="skeleton h-32 w-32"></div>
      <section className="skeleton border border-primary-content p-4 rounded-lg shadow-xl flex-1 flex gap-2">
      </section>
    </div>
  );
};

export default PhoneInfoSkeleton;
