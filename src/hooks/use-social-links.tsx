import { SocialLinksApi } from "@/services/api/social-links";
import { useQuery } from "@tanstack/react-query";

export default function useSocialLinks() {
    return useQuery({
        queryKey: ["socialLinks"],
        queryFn: async () => {
            return await SocialLinksApi.list();
        },
    })
}