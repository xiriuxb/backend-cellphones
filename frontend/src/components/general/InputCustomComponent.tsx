import {
  FieldValues,
  FormState,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";
import InputErrorMessage from "./InputErrorMessage";

interface InputCustomProps<T extends FieldValues>
  extends React.InputHTMLAttributes<HTMLInputElement> {
  register: UseFormRegister<T>;
  registerOptions: RegisterOptions<T>;
  name: Path<T>;
  className: string;
  formState: FormState<T>
}
export function InputCustom<T extends FieldValues>({
  register,
  registerOptions,
  name,
  formState,
  className,
  ...inputProps
}: InputCustomProps<T>) {
    const {errors} = formState;
    const p:string|undefined = errors[name.toString()]?.message?.toString()
  return (
    <>
    <input
      {...inputProps}
      className={`${className} ${p && "border-red-600 border"}`}
      {...register(name, registerOptions)}
    />
    <InputErrorMessage message={p} />
    </>
  );
}
