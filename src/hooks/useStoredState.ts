import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";

export default function useStoredState<T>(key: string, initialValue?: T) {
  const [value, setValue] = useState<T | undefined>(initialValue);

  useFocusEffect(
    useCallback(() => {
      let mount = true;
      AsyncStorage.getItem(key).then((value) => {
        if (mount && value) setValue(JSON.parse(value));
      });

      return () => {
        mount = false;
      };
    }, [])
  );

  const setValueAndStore = (value: T | ((prev?: T) => T)) => {
    if (typeof value === "function") {
      setValue((prev) => {
        const newValue = (value as (prev?: T) => T)(prev);
        AsyncStorage.setItem(key, JSON.stringify(newValue));
        return newValue;
      });
    } else {
      setValue(value);
      AsyncStorage.setItem(key, JSON.stringify(value));
    }
  };

  return [value, setValueAndStore] as const;
}
