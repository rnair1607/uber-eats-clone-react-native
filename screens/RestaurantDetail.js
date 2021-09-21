import React from "react";
import { View } from "react-native";
import { Divider } from "react-native-elements";

import About from "../components/restaurantDetail/About";
import MenuItems from "../components/restaurantDetail/MenuItems";
import ViewCart from "../components/restaurantDetail/ViewCart";

const RestaurantDetail = ({ route, navigation }) => {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <About route={route} />
      <Divider
        width={1.8}
        style={{
          marginVertical: "5%",
        }}
      />
      <MenuItems restaurantName={route.params.name} />
      <ViewCart navigation={navigation} />
    </View>
  );
};

export default RestaurantDetail;
