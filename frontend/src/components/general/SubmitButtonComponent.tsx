const SumbitButtonComponent = ({
  message,
  loading,
  disabled,
}: {
  message: string;
  loading: boolean;
  disabled: boolean;
}) => {
  return (
    <button
      disabled={disabled || loading}
      className="btn btn-neutral self-center py-3 px-2 w-full text-base font-semibold my-8"
      type="submit"
    >
      {loading ? <span className="loading loading-spinner text-primary"></span> : `${message}`}
    </button>
  );
};

export default SumbitButtonComponent;