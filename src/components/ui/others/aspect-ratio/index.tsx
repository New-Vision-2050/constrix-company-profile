import { Box, BoxProps, SxProps } from "@mui/material";

function AspectRatio({ ratio = 1, boxProps, children }: PropsType) {
  const pt = (1 / ratio) * 100;

  return (
    <Box sx={{ width: 1, pt: `${pt}%`, position: "relative" }}>
      <Box
        {...boxProps}
        sx={{
          width: 1,
          height: 1,
          top: 0,
          left: 0,
          position: "absolute",
          borderRadius: 1,
          overflow: "hidden",
          ...boxProps?.sx,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default AspectRatio;

type PropsType = {
  children: React.ReactNode;
  ratio?: number;
  boxProps?: BoxProps;
};
