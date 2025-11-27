import { InfiniteData, useQuery, useQueryClient } from "@tanstack/react-query";
import { getNewsById } from "../../services/news";
import { HNApiResponse, HNDocument } from "../../schemas/news";

const useArticleCacheLookup = () => {
  const queryClient = useQueryClient();
  return (id: string) => {
    const cached = queryClient.getQueryData<
      InfiniteData<HNApiResponse, number>
    >(["news"]);
    let doc = cached?.pages
      .flatMap((p) => p.hits)
      .find((h) => h.objectID === id);

    if (doc) return doc;
    return queryClient.getQueryData<HNDocument>(["news", id]);
  };
};

export default function useNewArticle(id: string) {
  const cacheLookUp = useArticleCacheLookup();
  const { data, isLoading } = useQuery({
    queryKey: ["news", id],
    queryFn: async () => {
      const art = cacheLookUp(id);
      return art ? art : await getNewsById(id);
    },
  });

  return { data, isLoading };
}
