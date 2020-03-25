import React, { Component } from 'react';
import { Text, View, ScrollView, SafeAreaView, Image, Alert, RefreshControl, TouchableOpacity } from 'react-native';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import styles from "./styles";
import { Images } from '../../theme';

import SwipeableList from '../../components/SwipeableList'

export default class Feeds extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isloading: true,
      scrollUp: false,
      articleList: "",
      API: "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=d8b65d4fa0854fe3b8dbbdf8c419f814",
      articleList: '',
    }
  }
  // static navigationOptions = {
  //   header: null
  // }

  componentDidMount() {
    this.getArticles();
  }

  getArticles = () => {
    const { API } = this.state
    fetch(API)
      .then((res) => {
        if (res.ok) {
          return res.json()
        } else {
          return Promise.reject({ status: res.status, statusText: res.statusText });
        }
      })
      .then((data) => { this.setState({ articleList: data.articles, isloading: false, scrollUp: false }) })
      .catch(err => console.log('Error message:', err.statusText));
  }

  renderRefreshControler = () => {
    return (
      <RefreshControl
        colors={['#FF1654']}
        //refresh control used for the Pull to Refresh
        refreshing={this.state.scrollUp}
        onRefresh={() => {
          this.getArticles()
          this.setState({ scrollUp: true, isloading: true })
          setTimeout(() => this.setState({ scrollUp: false }), 1000);
        }}
      />
    )
  }

  renderSkeleton = () => {
    return (
      <SafeAreaView>
        <SkeletonPlaceholder>
          <View style={{ width: "100%", height: 140 }} />
          <View
            style={{
              width: 100,
              height: 100,
              borderRadius: 100,
              borderWidth: 5,
              borderColor: "white",
              alignSelf: "center",
              position: "relative",
              top: -50
            }}
          />
          <View style={{ width: 120, height: 20, alignSelf: "center" }} />
          <View
            style={{
              width: 240,
              height: 20,
              alignSelf: "center",
              marginVertical: 12
            }}
          />
        </SkeletonPlaceholder>
        {[0, 1, 2, 3, 4].map((_, index) => (
          <View key={index} style={{ marginBottom: 12 }}>
            <SkeletonPlaceholder>
              <View style={{ flexDirection: "row", paddingHorizontal: 8 }}>
                <View style={{ width: 100, height: 100 }} />

                <View
                  style={{
                    justifyContent: "space-between",
                    marginLeft: 12,
                    flex: 1
                  }}
                >
                  <View style={{ width: "50%", height: 20 }} />
                  <View style={{ width: "30%", height: 20 }} />
                  <View style={{ width: "80%", height: 20 }} />
                </View>
              </View>
            </SkeletonPlaceholder>
          </View>
        ))}
      </SafeAreaView>
    )
  }

  renderView = () => {
    const { articleList } = this.state
    return (
      <View>
        <TouchableOpacity
          style={styles.openDrawer}
          onPress={() => this.props.navigation.openDrawer()}
        >
          <FontAwesome name='bars' size={20} color="#fff" />
        </TouchableOpacity>
        <Image source={Images.coverImage} style={{ width: "100%", height: 140, }} />
        <View>
          <Image source={Images.profileImage} style={styles.profileImage} />
        </View>
        <View  >
          <Text style={[styles.text, styles.profileName]}>Andrew Barker</Text>
        </View>
        <View  >
          <Text style={[styles.text, styles.profileStatus]}>Opportunities don't happen.{'\n'} You create them.</Text>
        </View>
        <View style={{ paddingVertical: 20, paddingLeft: 10 }}>
          <Text style={[styles.text, { fontSize: 22, fontWeight: '700' }]} >Latest Update</Text>
        </View>
        <SwipeableList articleList={articleList} />
      </View>
    )
  }

  render() {
    const { isloading, } = this.state;
    return (
      <ScrollView style={styles.container} refreshControl={this.renderRefreshControler()}>
        {isloading ? this.renderSkeleton() : this.renderView()}
      </ScrollView>
    );
  }
}