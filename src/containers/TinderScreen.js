import React from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import TinderCard from "../components/TinderCard";
import firebase from "react-native-firebase";

class TinderScreen extends React.Component {
  

  state = {
    hateList: [""]
  };

  componentDidMount = () => {
    const firestore = firebase.firestore();
    const user = firebase.auth().currentUser;
    this.setState({ loading: true });
    firestore
      .collection("Hate")
      .doc(user.uid)
      .collection("HateList")
      .get()
      .then(snap => {
        this.setState({
          hateList: snap.docs.map(e => e.id)
        }).then(() => this.setState({ loading: false }));
      })
      .catch(() => this.setState({ loading: false }));
  };

  render() {
    const { loading } = this.state;
    return (
      <ScrollView>
        <Spinner visible={loading} textContent="Loading..." />
        <TinderCard list={this.state.hateList || [""]} />
      </ScrollView>
    );
  }
}

export default TinderScreen;
