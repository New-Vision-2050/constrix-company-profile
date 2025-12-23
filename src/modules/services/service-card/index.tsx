import { Card, CardContent, Typography } from "@mui/material";
import ServiceCardHeader from "./ServiceCardHeader";
import { BE_ServicePageItem } from "@/types/api/base/services";
import Link from "next/link";

interface ServiceCardProps {
  service: BE_ServicePageItem;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Card
      elevation={2}
      sx={{
        display: "flex",
        flexDirection: "column",
        position: "relative",
        height: "375px",
        width: "100%",
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.9), rgba(255, 255, 255, 0.2)), url(${service.main_image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      component={Link}
      href={`/services/${service.id}`}
    >
      <CardContent sx={{ p: 4 }}>
        {/* header & title */}
        <div className="card-header">
          <ServiceCardHeader />
        </div>
        <Typography variant="h5" color="white" className="card-title">
          {service.name}
        </Typography>
        <Typography variant="body2" color="white" sx={{ mt: 2, opacity: 0.9 }}>
          {service.description}
        </Typography>
        {service.reference_number && (
          <Typography
            variant="caption"
            color="white"
            sx={{ mt: 1, opacity: 0.7 }}
          >
            Ref: {service.reference_number}
          </Typography>
        )}
      </CardContent>
      {/* description */}
      {/* footer */}
    </Card>
  );
}
