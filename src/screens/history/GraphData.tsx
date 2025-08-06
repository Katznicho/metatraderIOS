import { useNavigation } from "@react-navigation/native";
import {
  Image,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";

const { height: screenHeight } = Dimensions.get("window");

export default function GraphData() {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {Platform.OS === "ios" && (
        <View
          style={{
            height: StatusBar.currentHeight || 40,
            backgroundColor: "#F9FBFD",
          }}
        />
      )}

      <TouchableOpacity
        activeOpacity={1}
        onPress={() => navigation.navigate("HistoryScreen")}
      >
        <Image
          source={require("../../assets/header_graph.jpg")}
          style={styles.headerImage}
        />
      </TouchableOpacity>

     <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, backgroundColor:"#F9FBFD" }}
      >
        <Image
          source={require("../../assets/summary.jpg")}
          style={[styles.fullImage, {marginTop:-90}]}
        />

        <Image
          source={require("../../assets/summarytwo.jpg")}
          style={[styles.fullImage, {marginTop:-310}]}
        />
      </ScrollView> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerImage: {
    width: "100%",
    height: 67,
    resizeMode: "contain",
    backgroundColor: "#F9FBFD",
  },
  fullImage: {
    width: "100%",
     height: Dimensions.get("window").height,
    // resizeMode: "cover",
    // height: 400,
    resizeMode: 'contain',

  },
});
