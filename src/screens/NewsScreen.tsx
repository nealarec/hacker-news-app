import { SwipeListView } from "react-native-swipe-list-view";
import { useQueryClient } from "@tanstack/react-query";
import { ArticleCard } from "../ui/article/card";
import useNewsFeed from "../hooks/news/useNewsFeed";
import { useNavigation } from "@react-navigation/native";
import useStoredState from "../hooks/useStoredState";
import { HNArticle } from "../schemas/news";
import { Button, Stack, YStack } from "tamagui";
import { MaterialIcons } from "@expo/vector-icons";

export default function NewsScreen() {
  const nav = useNavigation();
  const queryClient = useQueryClient();
  const { data, isLoading, fetchNextPage, hasNextPage } = useNewsFeed();
  const [hiddenNews, setHiddenNews] =
    useStoredState<Record<string, HNArticle>>("hiddenNewsV2");

  const [started, setStarted] =
    useStoredState<Record<string, HNArticle>>("startedNews");

  return (
    <SwipeListView
      testID="news-list"
      data={data?.pages
        .flatMap((page) => page.hits)
        .filter((item) => !hiddenNews?.[item.objectID])}
      refreshing={isLoading}
      contentContainerStyle={{ padding: 16, gap: 12 }}
      onRefresh={() => queryClient.invalidateQueries({ queryKey: ["news"] })}
      onEndReached={() => hasNextPage && fetchNextPage()}
      onEndReachedThreshold={0.5}
      rightOpenValue={-60}
      disableRightSwipe
      keyExtractor={(item) => item.objectID}
      renderItem={({ item }) => (
        <ArticleCard
          doc={item}
          started={!!started?.[item.objectID]}
          onPress={() => nav.navigate("NewDetail", { id: item.objectID })}
          toggleStarted={() =>
            setStarted((prev = {}) => {
              const newPrev = { ...prev };
              if (newPrev[item.objectID]) delete newPrev[item.objectID];
              else newPrev[item.objectID] = item;
              return newPrev;
            })
          }
        />
      )}
      renderHiddenItem={({ item }) => (
        <Stack
          alignItems="flex-end"
          justifyContent="center"
          width={"100%"}
          borderRadius={"$4"}
          height={"100%"}
          backgroundColor="$red10"
        >
          <Button
            variant="outlined"
            height={"100%"}
            testID="news-item-hidden"
            icon={<MaterialIcons name="delete" size={24} color="white" />}
            onPress={() => {
              setHiddenNews((prev = {}) => ({
                ...prev,
                [item.objectID]: item,
              }));
            }}
          />
        </Stack>
      )}
    />
  );
}
