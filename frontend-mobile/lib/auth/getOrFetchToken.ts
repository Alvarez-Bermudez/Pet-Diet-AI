import AsyncStorage from "@react-native-async-storage/async-storage";
import { TOKEN_KEY } from "@/constants/auth";
import axios from "axios";
import { baseUrl } from "@/constants/constants";

export async function getTokenAsyncStorage() {
  try {
    const storedToken = await AsyncStorage.getItem(TOKEN_KEY);

    if (storedToken) {
      return storedToken;
    }

    return null;
  } catch (e) {
    console.error("Error obteniendo token de AsyncStorage", e);
  }
}
