import { Text, XStack, YStack } from "tamagui";
import useStoredState from "../hooks/useStoredState";
import { Switch } from "tamagui";

export default function SettingsScreen() {
  const [notifications, setNotifications] = useStoredState<{
    enabled: boolean;
    ios: boolean;
    android: boolean;
  }>("notifications", { enabled: true, ios: true, android: true });
  return (
    <YStack gap={10} padding={10}>
      <Text fontSize={20}>Settings</Text>
      <YStack gap={10}>
        <XStack gap={10} justifyContent="space-between">
          <Text fontSize={20}>Notifications</Text>
          <Switch
            checked={notifications!.enabled}
            onCheckedChange={(value) =>
              setNotifications((state) => ({ ...state!, enabled: value }))
            }
          >
            <Switch.Thumb
              disabledStyle={{ backgroundColor: "gray" }}
              backgroundColor={notifications!.enabled ? "blue" : "gray"}
            />
          </Switch>
        </XStack>
        <XStack gap={10} justifyContent="space-between">
          <Text fontSize={20}>iOS</Text>
          <Switch
            disabled={!notifications!.enabled}
            checked={notifications!.ios}
            onCheckedChange={(value) =>
              setNotifications((state) => ({ ...state!, ios: value }))
            }
          >
            <Switch.Thumb
              disabledStyle={{ backgroundColor: "gray" }}
              backgroundColor={notifications!.ios ? "blue" : "gray"}
            />
          </Switch>
        </XStack>
        <XStack gap={10} justifyContent="space-between">
          <Text fontSize={20}>Android</Text>
          <Switch
            disabled={!notifications!.enabled}
            checked={notifications!.android}
            onCheckedChange={(value) =>
              setNotifications((state) => ({ ...state!, android: value }))
            }
          >
            <Switch.Thumb
              disabledStyle={{ backgroundColor: "gray" }}
              backgroundColor={notifications!.android ? "blue" : "gray"}
            />
          </Switch>
        </XStack>
      </YStack>
    </YStack>
  );
}
