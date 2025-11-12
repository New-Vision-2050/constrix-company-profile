import { Stack, Typography } from "@mui/material";
import ServiceCardHeader from "./ServiceCardHeader";

interface ServiceCardProps {
  bgImg?: string;
}

export default function ServiceCard({ bgImg }: ServiceCardProps) {
  return (
    <Stack
      spacing={2}
      justifyContent="space-between"
      position="relative"
      padding={2}
      height={"350px"}
      width={"350px"}
      border={"1px solid #ccc"}
      borderRadius={"10px"}
      boxShadow={"0 4px 8px 0 rgba(0, 0, 0, 0.2)"}
      sx={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.9), rgba(255, 255, 255, 0.3)), url(${bgImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        cursor: "pointer",
        overflow: "hidden",
        "&:hover": {
          transform: "translateY(-12px) scale(1.02)",
          boxShadow: "0 20px 40px 0 rgba(0, 0, 0, 0.4)",
          borderColor: "primary.main",
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(255, 255, 255, 0.4)), url(${bgImg})`,
          "& .card-title": {
            transform: "translateX(8px)",
            color: "primary.light",
          },
          "& .card-header": {
            transform: "translateY(-4px)",
            opacity: 0.9,
          },
        },
        "&:active": {
          transform: "translateY(-8px) scale(1.01)",
        },
      }}
    >
      {/* header & title */}
      <Stack spacing={2}>
        <div 
          className="card-header"
          style={{
            transition: "all 0.3s ease-in-out",
          }}
        >
          <ServiceCardHeader />
        </div>
        <Typography 
          variant="h5" 
          color="white"
          className="card-title"
          sx={{
            transition: "all 0.3s ease-in-out",
          }}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </Typography>
      </Stack>
      {/* description */}
      {/* footer */}
    </Stack>
  );
}
