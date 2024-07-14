const InputErrorMessage = ({ message }: { message: string | undefined }) => {
  return (
    <span
      role="alert"
      className={`block text-sm bg-transparent text-red-500 transition-all w-full ${
        message ? "h-6" : "h-0"
      }`}
    >
      {message}
    </span>
  );
};

export default InputErrorMessage;
