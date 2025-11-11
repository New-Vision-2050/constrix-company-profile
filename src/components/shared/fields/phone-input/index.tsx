import React from "react";
import { MuiTelInput, MuiTelInputProps } from "mui-tel-input";

interface PhoneInputProps extends Omit<MuiTelInputProps, "value" | "onChange"> {
  value: string | null;
  onChange: (value: string | null) => void;
}

export default function PhoneInput({
  value,
  onChange,
  ...props
}: PhoneInputProps) {
  return (
    <MuiTelInput
      {...props}
      value={value ?? ""}
      onChange={(val) => onChange(val === "" ? null : val)}
      defaultCountry="EG"
      onlyCountries={["EG", "SA", "AE", "KW", "OM", "BH", "QA", "US"]}
      fullWidth
    />
  );
}
