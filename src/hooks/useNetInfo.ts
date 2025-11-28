import { useState, useEffect } from "react";
import NetInfo, {
  NetInfoState,
  NetInfoStateType,
} from "@react-native-community/netinfo";

/**
 * Hook personalizado para suscribirse a los cambios de conexión a internet.
 * @returns {NetInfoState} El estado actual de la conexión de red.
 */
export function useNetInfo() {
  const [netInfo, setNetInfo] = useState<NetInfoState>({
    isConnected: false,
    isInternetReachable: false,
    type: NetInfoStateType.none,
    details: null,
  });

  useEffect(() => {
    // 1. Obtener el estado inicial (para evitar un estado inicial nulo)
    NetInfo.fetch().then(setNetInfo);

    // 2. Suscribirse a los cambios de estado de la red
    const unsubscribe = NetInfo.addEventListener((state) => {
      setNetInfo(state);
    });

    // 3. Limpieza: Dejar de escuchar cuando el componente se desmonte
    return () => {
      unsubscribe();
    };
  }, []); // El array vacío asegura que solo se ejecute al montar/desmontar

  return netInfo;
}
