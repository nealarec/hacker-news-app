import { useQueryClient } from "@tanstack/react-query";
import { useInfiniteOfflineQuery } from "../query/useInfiniteOfflineQuery";
import { getNews } from "../../services/news";

export default function useNewsFeed() {
  return useInfiniteOfflineQuery({
    queryKey: ["news"],
    queryFn: (page) => getNews(page),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.nbPages > lastPage.page ? lastPage.page + 1 : null,
  });
}
