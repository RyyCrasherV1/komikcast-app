import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";

import { getMangaList } from "../services/mangadex";
import { getCoverUrl } from "../utils/mangadexCover";

export default function HomeMangaDex() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMangaList(20, 0)
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#030014",
        }}
      >
        <ActivityIndicator size="large" color="#8b5cf6" />
      </View>
    );
  }

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      numColumns={2}
      contentContainerStyle={{ padding: 10 }}
      renderItem={({ item }) => (
        <TouchableOpacity style={{ flex: 1, margin: 8 }}>
          <Image
            source={{
              uri: getCoverUrl(item.id, item.coverId),
            }}
            style={{
              height: 220,
              borderRadius: 10,
              backgroundColor: "#1e1e1e",
            }}
          />
          <Text
            numberOfLines={2}
            style={{
              color: "#fff",
              marginTop: 6,
              fontSize: 14,
              fontWeight: "600",
            }}
          >
            {item.title}
          </Text>
        </TouchableOpacity>
      )}
    />
  );
}
