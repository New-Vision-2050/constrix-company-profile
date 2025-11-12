import { Card, CardContent, Stack, Typography } from "@mui/material";
import ServiceCardHeader from "./ServiceCardHeader";

interface ServiceCardProps {
  bgImg?: string;
}

export default function ServiceCard({ bgImg }: ServiceCardProps) {
  return (
    <Card
      elevation={2}
      sx={{
        display: "flex",
        flexDirection: "column",
        position: "relative",
        height: "375px",
        width: "100%",
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.9), rgba(255, 255, 255, 0.2)), url(${bgImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <CardContent sx={{ p: 4 }}>
        {/* header & title */}
        <div className="card-header">
          <ServiceCardHeader />
        </div>
        <Typography variant="h5" color="white" className="card-title">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </Typography>
      </CardContent>
      {/* description */}
      {/* footer */}
    </Card>
  );
}
