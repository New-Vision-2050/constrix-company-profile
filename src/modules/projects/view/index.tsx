import PageSection from "@/layouts/main/page-section";
import { BE_FeaturedProject } from "@/types/api/base/project";
import ViewEntryPoint from "../components/ViewEntryPoint";

type PropsT = {
    data: BE_FeaturedProject[];
    pagination: {
        last_page: number;
        page: number;
    };
    handlePageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

export default function ProjectsView({ data, pagination, handlePageChange }: PropsT) {

    return (
        <PageSection>
            <ViewEntryPoint />
        </PageSection>
    );
}