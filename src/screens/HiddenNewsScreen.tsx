import { SwipeListView } from "react-native-swipe-list-view";
import { ArticleCard } from "../ui/article/card";
import { useNavigation } from "@react-navigation/native";
import { Button, Stack } from "tamagui";
import { MaterialIcons } from "expo-vector-icons";
import useStoredState from "../hooks/useStoredState";
import { HNArticle } from "../schemas/news";

export default function NewsScreen() {
  const nav = useNavigation();
  const [startedNews, setStartedNews] =
    useStoredState<Record<string, HNArticle>>("startedNews");
  const [hiddenNews, setHiddenNews] =
    useStoredState<Record<string, HNArticle>>("hiddenNewsV2");

  return (
    <SwipeListView
      data={Object.values(hiddenNews || {})}
      contentContainerStyle={{ padding: 16, gap: 12 }}
      rightOpenValue={-60}
      disableRightSwipe
      renderItem={({ item }) => (
        <ArticleCard doc={item} started={!!startedNews?.[item.objectID]} />
      )}
      keyExtractor={(item) => item.objectID}
      renderHiddenItem={({ item }) => (
        <Stack
          alignItems="flex-end"
          justifyContent="center"
          width={"100%"}
          borderRadius={"$4"}
          height={"100%"}
          backgroundColor="$blue10"
        >
          <Button
            color="$blue1"
            variant="outlined"
            height={"100%"}
            onPress={() => {
              setHiddenNews((prev = {}) => {
                const newPrev = { ...prev };
                delete newPrev[item.objectID];
                return newPrev;
              });
            }}
            icon={<MaterialIcons name="restore" size={25} color={"#eee"} />}
          />
        </Stack>
      )}
    />
  );
}
