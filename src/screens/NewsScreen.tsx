import { FlatList, View, Text } from "react-native";
import { useInfiniteOfflineQuery } from "../hooks/query/useInfiniteOfflineQuery";
import { getNews } from "../services/news";
import { useQueryClient } from "@tanstack/react-query";

export default function NewsScreen() {
  const queryClient = useQueryClient();
  const { data, isLoading, error, fetchNextPage, hasNextPage } =
    useInfiniteOfflineQuery({
      queryKey: ["news"],
      queryFn: (page) => getNews(page),
      initialPageParam: 0,
      getNextPageParam: (lastPage) =>
        lastPage.nbPages > lastPage.page ? lastPage.page + 1 : null,
    });
  return (
    <FlatList
      data={data?.pages.flatMap((page) => page.hits)}
      refreshing={isLoading}
      onRefresh={() => queryClient.invalidateQueries({ queryKey: ["news"] })}
      onEndReached={() => fetchNextPage()}
      contentContainerStyle={{
        padding: 16,
        gap: 16,
      }}
      onEndReachedThreshold={0.5}
      renderItem={({ item }) => (
        <View>
          <Text>{item.title || item.story_title}</Text>
        </View>
      )}
      keyExtractor={(item) => item.objectID}
    />
  );
}
