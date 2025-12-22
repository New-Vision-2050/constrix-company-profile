import { ProjectsApi, ProjectsFilters } from "@/services/api/projects";
import { useQuery } from "@tanstack/react-query";

export default function useProjectsData(filters: ProjectsFilters) {
    return useQuery({
        queryKey: ["projectsList", filters],
        queryFn: async () => {
            return await ProjectsApi.list(filters);
        },
    })
}