import { Stack, StackProps } from "@mui/material";

interface LayoutStackProps extends StackProps {
  omitPadding?: boolean;
}
function LayoutStack(props: LayoutStackProps) {
  return (
    <Stack
      alignItems="center"
      spacing={4}
      py={props.omitPadding ? 0 : 4}
      {...props}
    />
  );
}

export default LayoutStack;
