import MainPageContent from "@/layouts/main/page-content";
import ServicesDetailsView from "@/modules/services-details";
import ServiceDetailsContactBtn from "@/modules/services-details/components/ContactButton";
import { ServicesApi } from "@/services/api/services";
import { notFound } from "next/navigation";

// Enable dynamic params for service details
export const dynamicParams = true;

/**
 * Service detail page - Server component
 * Fetches service data on server for better SEO and performance
 */
export default async function ServiceDetailsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const serviceRes = await ServicesApi.show(id);
    const serviceData = serviceRes.data.payload;

    if (!serviceData) {
        notFound()
    }

    return (
        <MainPageContent title={serviceData.name} description={<ServiceDetailsContactBtn />}>
            <ServicesDetailsView serviceData={serviceData} />
        </MainPageContent>
    );
}