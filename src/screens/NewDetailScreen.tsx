import { RouteProp, useRoute } from "@react-navigation/native";
import { ActivityIndicator } from "react-native";
import DocumentNotFound from "../ui/article/not-found";
import useNewArticle from "../hooks/news/useNewArticle";
import ArticleView from "../ui/article/view";
import { Text, YStack } from "tamagui";

export default function NewDetailScreen() {
  const { params } = useRoute<RouteProp<{ NewDetail: { id: string } }>>();
  const { data, isLoading, isError } = useNewArticle(params.id);

  if (isLoading) return <ActivityIndicator testID="loading-indicator" />;
  if (!data || isError) return <DocumentNotFound />;
  return <ArticleView data={data} />;
}
