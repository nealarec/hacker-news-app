import { useNavigation } from "@react-navigation/native";
import { useRef, useEffect } from "react";
import * as Notifications from "expo-notifications";

export function useNotificationRedirect() {
  const navigation = useNavigation();
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  useEffect(() => {
    // This listener is called when a notification is received while the app is in the foreground
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log("Notification received:", notification);
      });

    // This listener is called when a user taps on a notification
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        const { id } = response.notification.request.content.data;
        console.log("Notification tapped, article ID:", id);

        // Navigate to the article screen with the article ID
        if (id) {
          navigation.navigate("NewDetail", { id });
        }
      });

    return () => {
      // Clean up the listeners when the component unmounts
      Notifications.removeNotificationSubscription(
        notificationListener.current!
      );
      Notifications.removeNotificationSubscription(responseListener.current!);
    };
  }, [navigation]);
}
