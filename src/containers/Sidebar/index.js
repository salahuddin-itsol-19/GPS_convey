import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, Text, View, Image, Animated, TouchableOpacity, Alert, ScrollView, ImageBackground } from 'react-native';
import { DrawerNavigatorItems, DrawerItems } from 'react-navigation-drawer';
import { Images, Metrics } from '../../theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from "./styles";
import { Actions } from 'react-native-router-flux';


export default class Sidebar extends Component {


  navigateYourPlaces = () => {
    Actions.Yourplaces()
  }
  navigateProfile = () => {
    Actions.Profile()
  }
  navigateMessage = () => {
    Actions.Message()
  }
  navigateShare = () => {
    Actions.LocationSharing()
  }
  navigatefeedback = () => {
    Actions.SendFeedback()
  }
  navigateHelp = () => {
    Actions.Help()
  }
  navigateHostParty = () => {
    Actions.HostParty()
  }
  onLogout = () => {
    Actions.Login()
  }
  renderBody = () => {

    return (
      <View style={{ flex: 1 }}>
        {this.renderRow(
          'Your Places',
          this.navigateYourPlaces,
          'location',
          'Yourplaces'

        )}
        {this.renderRow(
          'Profile',
          this.navigateProfile,
          'profile',
          'Profile',
        )}
        {this.renderRow(
          'Messages',
          this.navigateMessage,
          'message',
          'Message',
        )}
        {this.renderRow(
          'Location Sharing',
          this.navigateShare,
          'sharelocation',
          'LocationSharing',
        )}
        {this.renderRow(
          'Send Feedback',
          this.navigatefeedback,
          'feedback',
          'SendFeedback',
        )}
        {this.renderRow(
          'Help',
          this.navigateHelp,
          'help',
          'Help',
        )}
        {this.renderRow(
          'Host a Party',
          this.navigateHostParty,
          'hostaparty',
          'HostParty',
        )}

        {this.renderRow(
          'Logout',
          this.onLogout,
          'logout',
          'logout')}
      </View>
    );
  };
  renderRow = (title, onPress, icon, activeScene, rightIcon) => {
    const { navigation } = this.props;
    return (
      <TouchableOpacity
        style={[
          styles.listView,

          navigation &&
          navigation.newView === activeScene && {
            backgroundColor: "black",
          },
        ]}
        onPress={onPress}>
        <Image
          resizeMethod="auto"
          resizeMode="contain"
          style={{
            marginHorizontal: Metrics.ratio(16),
            width: Metrics.ratio(25),
            height: Metrics.ratio(25),


          }}
          source={Images[icon]}
        />
        <View
          style={{
            justifyContent: 'center',

          }}>
          <Text style={[styles.listTitle]}>{title}</Text>
        </View>
        {rightIcon && (
          <Icon
            style={{ marginLeft: Metrics.screenWidth * 0.3 }}
            size={20}
            color="white"
            name={rightIcon}
          />
        )}
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={{ height: Metrics.screenHeight * 1 }}>
        <View style={{ backgroundColor: "#53D0FF", justifyContent: "center", alignItems: "center",elevation:4 }}>
          {/* <ImageBackground
                    source={Images.coverImage}
                    style={{ width: undefined, padding: 16, paddingTop: 48,color:"blue" }}
                > */}
          <Image source={Images.profileDp} style={styles.profile} />
          <Text style={styles.name}>username</Text>

          <View style={{ marginBottom: Metrics.ratio(30) }} >
            <Text style={styles.mail}>youremail@mail.co</Text>
            {/* <FontAwesome name='user' size={16} color="rgba(255, 255, 255, 0.8)" /> */}
          </View>
          {/* </ImageBackground> */}
        </View>
        <ScrollView>
          <View style={styles.container} forceInset={{ top: "always", horizontal: "never" }}>
            {/* <DrawerNavigatorItems {...this.props} /> */}
            {/* <DrawerItems {...this.props} /> */}
            {this.renderBody()}
            {/* <TouchableOpacity
                        style={styles.logOutBtn}
                        onPress={() => this.props.navigation.navigate('Login')}
                    >
                        <Image source={Images.logout} style={{height:Metrics.ratio(30),width:Metrics.ratio(30),color:"white"}} />
                       
                        <Text style={styles.logOutText}>Log Out</Text>
                    </TouchableOpacity> */}
          </View>
        </ScrollView>
      </View>
    );
  }
}