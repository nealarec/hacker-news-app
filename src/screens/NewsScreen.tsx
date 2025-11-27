import { FlatList } from "react-native";
import { useQueryClient } from "@tanstack/react-query";
import { ArticleCard } from "../ui/article/card";
import useNewsFeed from "../hooks/news/useNewsFeed";
import { useNavigation } from "@react-navigation/native";

export default function NewsScreen() {
  const nav = useNavigation();
  const queryClient = useQueryClient();
  const { data, isLoading, fetchNextPage, hasNextPage } = useNewsFeed();

  return (
    <FlatList
      data={data?.pages.flatMap((page) => page.hits)}
      refreshing={isLoading}
      contentContainerStyle={{ padding: 16, gap: 12 }}
      onRefresh={() => queryClient.invalidateQueries({ queryKey: ["news"] })}
      onEndReached={() => hasNextPage && fetchNextPage()}
      onEndReachedThreshold={0.5}
      renderItem={({ item }) => (
        <ArticleCard
          doc={item}
          onPress={() => nav.navigate("NewDetail", { id: item.objectID })}
        />
      )}
      keyExtractor={(item) => item.objectID}
    />
  );
}
