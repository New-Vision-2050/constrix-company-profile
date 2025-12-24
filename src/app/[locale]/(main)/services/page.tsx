import ServicesView from "@/modules/services";
import { ServicesApi } from "@/services/api/services";

export default async function ServicesPage() {
  const res = await ServicesApi.ourServicesPage();

  return <ServicesView data={res.data.payload} />;
}
