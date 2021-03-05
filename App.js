import React from "react";
import { Alert } from "react-native";
import Loading from "./Loading";
import * as Location from "expo-location";
import axios from "axios";
import Weather from "./Weather";

const API_KEY = "d069c344f7661d1fb61fa22ea5916a84";

export default class extends React.Component {
  state = {
    isLoading: true,
  };
  getWeather = async (latitude, longitude) => {
    const {
      data: {
        main: { temp },
        weather,
      },
    } = await axios.get(
      // openweathermap API has a problem
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
    );
    this.setState({
      isLodaing: false,
      condition: weather[0].main,
      temp,
    });
  };
  getLocation = async () => {
    try {
      await Location.requestPermissionsAsync();
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();
      // Send to API and get weather
      this.getWeather(latitude, longitude);
      this.setState({ isLoading: false });
    } catch (error) {
      Alert.alert("Can't find you.", "So sad");
    }
  };
  componentDidMount() {
    this.getLocation();
  }
  render() {
    const { isLoading, temp, condition } = this.state;
    return isLoading ? (
      <Loading />
    ) : (
      <Weather temp={Math.round(temp)} condition={condition} />
    );
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
