import MainPageContent from "@/layouts/main/page-content";
import ServicesDetailsView from "@/modules/services-details";
import { getServiceData } from "./getServiceData";

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
    const serviceData = await getServiceData(id);

    return (
        <MainPageContent title={serviceData.title}>
            <ServicesDetailsView serviceData={serviceData} />
        </MainPageContent>
    );
}