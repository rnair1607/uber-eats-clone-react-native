import React from "react";
import RootNavigation from "./navigation";
import { Provider } from "react-redux";
import configureStore from "./store/store";

const store = configureStore();

export default function App() {
  return (
    // <Home />
    <Provider store={store}>
      <RootNavigation />
    </Provider>
  );
}
