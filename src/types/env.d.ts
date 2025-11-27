import "expo-constants";

declare module "expo-constants" {
  export interface AppManifest {
    extra?: {
      // Define aquí el tipo de tus variables de entorno
      // Ejemplo:
      // API_URL: string;
      // ENABLE_ANALYTICS?: boolean;
      [key: string]: any;
    };
  }
}
