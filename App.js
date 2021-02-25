import React from "react";
import { Alert } from "react-native";
import Loading from "./Loading";
import * as Location from "expo-location";

export default class extends React.Component {
  state = {
    isLoading: true,
  };
  getLocation = async () => {
    try {
      await Location.requestPermissionsAsync();
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();
      // Send to API and get weather
      this.setState({ isLoading: false });
    } catch (error) {
      Alert.alert("Can't find you.", "So sad");
    }
  };
  componentDidMount() {
    this.getLocation();
  }
  render() {
    const { isLoading } = this.state;
    return isLoading ? <Loading /> : null;
  }
}

// const styles = StyleSheet.create({
//   container: {
//     // flexDirction: "row" 가로로 정렬 -> default는 column
//     // alignItems: "center",
//     // justifyContent: "center",
//     flex: 1, // 부모 클래스, 모든 공간이 사용 가능하도록
//   },
//   yellowView: {
//     flex: 1, // 숫자가 높을수록 더 많은 공간 차지
//     backgroundColor: "green",
//   },
//   blueView: {
//     flex: 1,
//     backgroundColor: "blue",
//   },
// });
