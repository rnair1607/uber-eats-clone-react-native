import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { Divider } from "react-native-elements";
import BottomTabs from "../components/home/BottomTabs";
import Categories from "../components/home/Categories";
import HeaderTabs from "../components/home/HeaderTabs";
import RestaurantItem, {
  localRestaurants,
} from "../components/home/RestaurantItem";
import SearchBar from "../components/home/SearchBar";

const YELP_API_KEY =
  "9-VKcmR3IZ25_bWz7AtC6HY4T4VP0Ov2uefcaaIOp5qO9AzLNRFjc2DelkRaT66qdmjL1-MFvp_ZPDcJqIbHXLEWD5WIhAQn3MgRC2Vbez8-v5PfBA_GGP0NygH6XXYx";

function Home({ navigation }) {
  const [restaurantData, setRestaurantData] = useState(localRestaurants);
  const [city, setCity] = useState("San Francisco");
  const [activeTab, setActiveTab] = useState("Delivery");

  const getRestaurantDetails = async () => {
    const headerOptions = {
      headers: {
        authorization: `Bearer ${YELP_API_KEY}`,
      },
    };
    const url = `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${city}`;

    try {
      const response = await fetch(url, headerOptions);
      let res;

      if (response.ok) {
        res = await response.json();
      }
      // console.log("res data", res);
      setRestaurantData(
        res.businesses.filter((business) =>
          business.transactions.includes(activeTab.toLowerCase())
        )
      );
    } catch (error) {
      // console.log("error", error);
    }
  };

  useEffect(() => {
    getRestaurantDetails();
  }, [city, activeTab]);

  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <View style={{ backgroundColor: "white", padding: 15 }}>
        <HeaderTabs setActiveTab={setActiveTab} activeTab={activeTab} />
        <SearchBar setCity={setCity} />
      </View>
      <Categories />
      <ScrollView showsVerticalScrollIndicator={false}>
        <RestaurantItem
          restaurantData={restaurantData}
          navigation={navigation}
        />
      </ScrollView>
      <Divider width={1} />
      <BottomTabs />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "#eee",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

export default Home;
