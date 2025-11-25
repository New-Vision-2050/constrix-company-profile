import { Container, ContainerProps } from "@mui/material";

interface PageSectionProps extends ContainerProps {}
function PageSection(props: PageSectionProps) {
  return <Container maxWidth="xl" {...props} />;
}

export default PageSection;
