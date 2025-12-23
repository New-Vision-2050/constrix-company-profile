import { NewsApi, NewsFilters } from "@/services/api/news";
import { useQuery } from "@tanstack/react-query";

export default function useNewsData(filters: NewsFilters) {
  return useQuery({
    queryKey: ["newsList", filters],
    queryFn: async () => {
      return await NewsApi.list(filters);
    },
  });
}
