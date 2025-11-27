import { RootParamList as NavigationRootParamList } from "@react-navigation/native";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends NavigationRootParamList {
      News: undefined;
      NewDetail: { id: string };
    }
  }
}
