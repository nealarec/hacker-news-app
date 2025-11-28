import {
  defineTask,
  isTaskRegisteredAsync,
  unregisterTaskAsync,
} from "expo-task-manager";
import {
  BackgroundFetchResult,
  BackgroundFetchStatus,
  getStatusAsync,
  registerTaskAsync,
} from "expo-background-fetch";
import { scheduleNotificationAsync } from "expo-notifications";

import { useEffect } from "react";
import { getNews } from "../services/news";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistedQueryClient } from "../providers/QueryProvider";

export const TASK_NAME = "fetchArticle";

defineTask(TASK_NAME, async () => {
  try {
    let hasData = false;
    let [, queryClient] = await persistedQueryClient();
    for (let query of ["ios", "android"] as const) {
      console.log("Fetching news for", query);
      const [notified, news] = await Promise.all([
        AsyncStorage.getItem(`notified-${query}`),
        getNews(0, query, Math.floor(Date.now() / 1000) - 15 * 60),
      ]);
      const notifiedAt = new Set(notified ? JSON.parse(notified) : []);
      for (const article of news.hits) {
        if (notifiedAt.has(article.objectID)) continue;

        notifiedAt.add(article.objectID);
        queryClient.setQueryData(["news", article.objectID], article);

        await scheduleNotificationAsync({
          content: {
            title: `New ${query} Article`,
            body: article.title,
            data: { id: article.objectID },
          },
          trigger: null,
        });
        hasData = true;
      }
      await AsyncStorage.setItem(
        `notified-${query}`,
        JSON.stringify(Array.from(notifiedAt))
      );
    }

    return hasData
      ? BackgroundFetchResult.NewData
      : BackgroundFetchResult.NoData;
  } catch (error) {
    console.error("Error in fetchArticle task:", error);
    return BackgroundFetchResult.Failed;
  }
});

export function useRegisterTasks() {
  useEffect(() => {
    (async () => {
      const status = await getStatusAsync();
      if (status !== BackgroundFetchStatus.Available) return;
      if (await isTaskRegisteredAsync(TASK_NAME))
        await unregisterTaskAsync(TASK_NAME);

      await registerTaskAsync(TASK_NAME, {
        minimumInterval: 30,
        stopOnTerminate: false,
        startOnBoot: true,
      });
      console.log("Scheduled", TASK_NAME);
    })();
  }, []);
}
