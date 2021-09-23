import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import OrderItem from "./OrderItem";
import firebase from "../../firebase";

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  modalCheckoutContainer: {
    backgroundColor: "white",
    padding: 16,
    height: 500,
    borderWidth: 1,
  },
  restaurantName: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  subTotalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  subTotalText: {
    textAlign: "left",
    fontWeight: "600",
    fontSize: 15,
    marginBottom: 10,
  },
});

const ViewCart = ({ navigation }) => {
  const { items, restaurantName } = useSelector(
    (state) => state.cartReducer.selectedItems
  );
  const [modalVisible, setModalVisible] = useState(false);

  const total = items
    .map((item) => Number(item.price.replace("$", "")))
    .reduce((prev, curr) => prev + curr, 0);

  const totalUSD = total.toLocaleString("en", {
    style: "currency",
    currency: "USD",
  });

  const addOrder = () => {
    const db = firebase.firestore();
    db.collection("orders").add({
      items,
      restaurantName,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setModalVisible(false);
    navigation.navigate("OrderCompleted", {
      restaurantName,
      totalUSD,
    });
  };

  const checkoutModalContent = () => {
    return (
      <>
        <View style={styles.modalContainer}>
          <View style={styles.modalCheckoutContainer}>
            <Text style={styles.restaurantName}>{restaurantName}</Text>
            {items.map((item, index) => (
              <OrderItem key={index} item={item} />
            ))}
            <View style={styles.subTotalContainer}>
              <Text style={styles.subTotalText}>Subtotal</Text>
              <Text>${totalUSD}</Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <TouchableOpacity
                style={{
                  marginTop: 20,
                  backgroundColor: "black",
                  alignItems: "center",
                  padding: 13,
                  borderRadius: 30,
                  width: 300,
                  position: "relative",
                }}
                onPress={addOrder}
              >
                <Text style={{ color: "white", fontSize: 20 }}>Checkout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </>
    );
  };

  return (
    <>
      <Modal
        animationType="slide"
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        {checkoutModalContent()}
      </Modal>
      {total ? (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            position: "absolute",
            bottom: "5%",
            zIndex: 999,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                marginTop: 20,
                backgroundColor: "black",
                alignItems: "center",

                borderRadius: 30,
                flexDirection: "row",
                width: "70%",
                position: "relative",
                justifyContent: "flex-end",
                padding: 15,
              }}
              onPress={() => setModalVisible(true)}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                  marginRight: "20%",
                }}
              >
                View Cart
              </Text>
              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                }}
              >
                ${totalUSD}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <></>
      )}
    </>
  );
};

export default ViewCart;
