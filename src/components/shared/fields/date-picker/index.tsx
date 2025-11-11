import {
  DatePicker as MuiDatePicker,
  DatePickerProps as MuiDatePickerProps,
  DateTimePicker as MuiDateTimePicker,
} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { Calendar2, Timer1 } from "iconsax-reactjs";
import { ComponentProps } from "react";

const DateIcon = () => <Calendar2 />;
const DateTimeIcon = () => <Timer1 />;

interface DatePickerProps
  extends Omit<MuiDatePickerProps, "value" | "onChange"> {
  value: string | null;
  onChange: (value: string | null) => void;
}

function DatePicker({ value, onChange, ...props }: DatePickerProps) {
  return (
    <MuiDatePicker
      {...props}
      slots={{
        openPickerIcon: DateIcon,
        ...props.slots,
      }}
      slotProps={{
        ...props.slotProps,
        textField: { fullWidth: true, ...props.slotProps?.textField },
      }}
      value={value ? dayjs(value) : null}
      onChange={(date) => onChange(date ? date.toISOString() : null)}
    />
  );
}

export function DateTimePicker({
  value,
  onChange,
  ...props
}: Omit<ComponentProps<typeof MuiDateTimePicker>, "value" | "onChange"> & {
  value: string | null;
  onChange: (value: string | null) => void;
}) {
  return (
    <MuiDateTimePicker
      {...props}
      slots={{
        openPickerIcon: DateTimeIcon,
        ...props.slots,
      }}
      slotProps={{
        ...props.slotProps,
        textField: { fullWidth: true, ...props.slotProps?.textField },
      }}
      value={value ? dayjs(value) : null}
      onChange={(date) => onChange(date ? date.toISOString() : null)}
    />
  );
}

export default DatePicker;
