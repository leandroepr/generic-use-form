import { Input } from "../ui/input";

export type TextInputProps = {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  placeholder?: string;
  type?: "text" | "email" | "password";
};

export const TextInput = (props: TextInputProps) => {
  return (
    <div className="flex flex-col">
      {props.label && <label>{props.label}</label>}
      <Input
        type={props.type || "text"}
        value={props.value}
        onChange={(e) => props.onChange?.(e.target.value)}
        placeholder={props.placeholder}
      />
      <span className="text-red-500">{props.error}</span>
    </div>
  );
};
