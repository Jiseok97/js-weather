import React from "react";
import Loading from "./Loading";
import * as Location from "expo-location";

export default class extends React.Component {
  getLocation = async () => {
    const location = await Location.getCurrentPositionAsync();
    console.log(location);
  };
  componentDidMount() {
    this.getLocation();
  }
  render() {
    return <Loading />;
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
