import { useEffect } from "react";
import z from "zod";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SettingSchema = z.object({
  enabled: z.boolean(),
  ios: z.boolean(),
  android: z.boolean(),
});

export default function useDefaultSettings() {
  useEffect(() => {
    const storedSettings = AsyncStorage.getItem("notifications");
    if (!SettingSchema.safeParse(storedSettings).success) {
      AsyncStorage.setItem(
        "notifications",
        JSON.stringify({ enabled: true, ios: true, android: true })
      );
    }
  }, []);
}
