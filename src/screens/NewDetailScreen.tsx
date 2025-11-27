import { RouteProp, useRoute } from "@react-navigation/native";
import { ActivityIndicator } from "react-native";
import DocumentNotFound from "../ui/article/not-found";
import useNewArticle from "../hooks/news/useNewArticle";
import ArticleView from "../ui/article/view";

export default function NewDetailScreen() {
  const { params } = useRoute<RouteProp<{ NewDetail: { id: string } }>>();
  const { data, isLoading } = useNewArticle(params.id);

  if (isLoading) return <ActivityIndicator />;
  if (!data) return <DocumentNotFound />;
  return <ArticleView data={data} />;
}
