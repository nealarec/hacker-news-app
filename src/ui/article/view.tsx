import { HNArticle } from "../../schemas/news";
import { WebView } from "react-native-webview";
function htmlWrap(html: string) {
  return `<html><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><body>${html}</body></html>`;
}

const getDocumentSource = (doc: HNArticle) => {
  if (doc.story_text) return { html: htmlWrap(doc.story_text) };
  if (doc.comment_text) return { html: htmlWrap(doc.comment_text) };
  if (doc.url) return { uri: doc.url };
  return { html: "<b>No data found</b>" };
};

export default function ArticleView({ data }: { data: HNArticle }) {
  return <WebView source={getDocumentSource(data)} />;
}
