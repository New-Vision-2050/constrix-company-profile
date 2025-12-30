import { Stack, Typography } from "@mui/material";
import { BE_ServiceDepartment } from "@/types/api/base/services";
import ServicesList from "../services-list";
import RhombusCards from "../services-viewers/rhomus-cards";

type DepartmentSectionProps = {
  department: BE_ServiceDepartment;
};

export default function DepartmentSection({
  department,
}: DepartmentSectionProps) {
  console.log("department", department);
  const renderServices = () => {
    switch (department.type) {
      case "cards":
        return <ServicesList sectionData={department} />;
      case "hexa":
        return <RhombusCards services={department.website_services} />;
      default:
        return <ServicesList sectionData={department} />;
    }
  };

  return (
    <Stack gap={4}>
      <Stack gap={2}>
        <Typography variant="h4" component="h2">
          {department.title}
        </Typography>
        {department.description && (
          <Typography variant="body1" color="text.secondary">
            {department.description}
          </Typography>
        )}
      </Stack>

      {renderServices()}
    </Stack>
  );
}
