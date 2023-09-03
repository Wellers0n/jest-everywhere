"use client";
import { TextField } from "@mui/material";
import {
  Control,
  Controller,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  control: Control<any>;
  name: string;
  label: string;
  rules?: RegisterOptions;
}

const Input = ({ name, control, rules, label, type }: InputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          onChange={onChange}
          value={value}
          error={!!error}
          helperText={error ? error.message : null}
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          label={label}
          type={type}
        />
      )}
    />
  );
};

export { Input };
