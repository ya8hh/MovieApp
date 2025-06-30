import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as ScreenOrientation from "expo-screen-orientation";
import { useEffect } from "react";
import {
  ActivityIndicator,
  Pressable,
  Text,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

export default function Player() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  useEffect(() => {
    const lockLandscape = async () => {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE
      );
    };

    const unlockOrientation = async () => {
      await ScreenOrientation.unlockAsync();
    };

    lockLandscape();

    return () => {
      unlockOrientation();
    };
  }, []);

  if (!id || typeof id !== "string") {
    return (
      <View className="flex-1 justify-center items-center bg-black">
        <Text className="text-white">❌ Missing or invalid IMDb ID</Text>
      </View>
    );
  }

  const embedUrl = `https://vidsrc.xyz/embed/movie/${id}`;

  return (
    <View className="flex-1 bg-black">
      <SafeAreaView
        edges={["top", "left"]}
        className="absolute z-50 left-0 top-0 px-4 pt-4"
      >
        <Pressable
          onPress={() => router.back()}
          className="bg-black/50 rounded-full p-2"
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </Pressable>
      </SafeAreaView>

      <WebView
        source={{ uri: embedUrl }}
        style={{ flex: 1 }}
        javaScriptEnabled
        allowsFullscreenVideo
        domStorageEnabled
        startInLoadingState
        renderLoading={() => (
          <ActivityIndicator size="large" color="#fff" className="mt-10" />
        )}
      />
    </View>
  );
}
