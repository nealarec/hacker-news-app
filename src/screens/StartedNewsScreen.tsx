import { SwipeListView } from "react-native-swipe-list-view";
import { ArticleCard } from "../ui/article/card";
import { useNavigation } from "@react-navigation/native";
import { Button, Stack } from "tamagui";
import { Feather } from "@expo/vector-icons";
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
      data={Object.values(startedNews || {}).filter(
        (item) => !hiddenNews?.[item.objectID]
      )}
      rightOpenValue={-60}
      contentContainerStyle={{ padding: 16, gap: 12 }}
      disableRightSwipe
      renderItem={({ item }) => (
        <ArticleCard
          doc={item}
          started={true}
          toggleStarted={() => {
            setStartedNews((prev = {}) => {
              const newPrev = { ...prev };
              delete newPrev[item.objectID];
              return newPrev;
            });
          }}
          onPress={() => nav.navigate("NewDetail", { id: item.objectID })}
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
            color="$red1"
            variant="outlined"
            height={"100%"}
            onPress={() => {
              setHiddenNews((prev = {}) => ({
                ...prev,
                [item.objectID]: item,
              }));
            }}
            icon={<Feather name="trash" size={25} color={"#eee"} />}
          />
        </Stack>
      )}
      keyExtractor={(item) => item.objectID}
    />
  );
}
