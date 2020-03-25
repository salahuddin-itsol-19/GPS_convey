// import { createAppContainer, createSwitchNavigator } from "react-navigation";
// import { createStackNavigator, } from "react-navigation-stack";

// import Login from '../containers/Login';
// import Register from '../containers/Registration';
// import ForgotPassword from '../containers/ForgotPassword';
// import VerifyResetCode from '../containers/VerifyResetCode';
// import ResetPassword from '../containers/ResetPassword';

// import AppNavigator from './DrawerNavigator';

// // Stack navigator for authentication
// const AuthNavigator = createStackNavigator({
//     Login: {
//         screen: Login,
//         navigationOptions: {
//             header: null
//         }
//     },
//     Register: {
//         screen: Register,
//         navigationOptions: {
//             // headerStyle: {
//             //     backgroundColor: '#fff',
//             //     shadowOpacity: 0,
//             //     elevation: 0,
//             // },
//             header: null
//         }
//     },
//     ForgotPassword: {
//         screen: ForgotPassword,
//         navigationOptions: {
//             // headerStyle: {
//             //     backgroundColor: '#fff',
//             //     shadowOpacity: 0,
//             //     elevation: 0,
//             // },
//             header: null
//         }
//     },
//     VerifyResetCode: {
//         screen: VerifyResetCode,
//         navigationOptions: {
//             // headerStyle: {
//             //     backgroundColor: '#fff',
//             //     shadowOpacity: 0,
//             //     elevation: 0,
//             // },
//             header: null
//         }
//     },
//     ResetPassword: {
//         screen: ResetPassword,
//         navigationOptions: {
//             // headerStyle: {
//             //     backgroundColor: '#fff',
//             //     shadowOpacity: 0,
//             //     elevation: 0,
//             // },
//             header: null
//         }
//     }
// });

// // Switch navigator to switch from athutication to main app
// const MainNavigator = createSwitchNavigator({
//     Auth: {
//         screen: AuthNavigator
//     },
//     App: {
//         screen: AppNavigator
//     }
// })

// export default createAppContainer(MainNavigator);


// @flow

import React, {Component} from 'react';

import {View, Text, Dimensions, Platform, BackHandler} from 'react-native';

import {connect} from 'react-redux';

import {Colors, Metrics, Images} from '../theme';
import styles from './styles';
import Login from '../containers/Login';
import Register from '../containers/Registration';
import ForgotPassword from '../containers/ForgotPassword';
import VerifyResetCode from '../containers/VerifyResetCode';
import ResetPassword from '../containers/ResetPassword';
// import DrawerMenu from "./DrawerMenu";
import DrawerMenu from './DrawerNavigator';


import utils from '../util';
import {Stack, Scene, Router, Actions, Tabs} from 'react-native-router-flux';

function onBackPress() {
  const scene = Actions.currentScene;
 
  if (
    scene === 'loginScreen' ||
    scene === '_profile' ||
    scene === '_settings'
  ) {
    utils.showYesNoMessage(
      'Confirm',
      'Are you sure you want to exit?',
      () => {
        BackHandler.exitApp();
      },
      () => {},
    );
    return true;
  } else {
    Actions.pop();
    return true;
  }
}

const navigator = Actions.create(
  <Stack
    titleStyle={styles.title}
    headerStyle={styles.header}
    key="root"
    tintColor={Colors.primary}
    panHandlers={null}>
    <Scene
      hideNavBar
      headerStyle={styles.header}
      titleStyle={[styles.title, {width: Metrics.screenWidth}]}
      tintColor="white"
      title={'Login'}
      key="Login"
      component={Login}
      renderLeftButton={
        () => {}
        //<TabButtonLeft imagesArray={["rightArrow"]} actions={[Actions.pop]} />
      }
    />

    <Scene
      hideNavBar
      headerStyle={styles.header}
      titleStyle={[styles.title, {width: Metrics.screenWidth}]}
      tintColor="white"
      title={'Register'}
      key="Register"
      component={Register}
      renderLeftButton={
        () => {}
        //<TabButtonLeft imagesArray={["rightArrow"]} actions={[Actions.pop]} />
      }
    />

    <Scene
      hideNavBar
      headerStyle={styles.header}
      titleStyle={[styles.title, {width: Metrics.screenWidth}]}
      tintColor="white"
      title={'ForgotPassword'}
      key="ForgotPassword"
      component={ForgotPassword}
      renderLeftButton={
        () => {}
        //<TabButtonLeft imagesArray={["rightArrow"]} actions={[Actions.pop]} />
      }
    />

    <Scene
      hideNavBar
      headerStyle={styles.header}
      titleStyle={[styles.title, {width: Metrics.screenWidth}]}
      tintColor="white"
      drawerLockMode="locked-closed"
      gesturesEnabled={false}
      title={'VerifyResetCode'}
      key="VerifyResetCode"
      component={VerifyResetCode}
      renderLeftButton={
        () => {}
        //<TabButtonLeft imagesArray={["rightArrow"]} actions={[Actions.pop]} />
      }
    />

    <Scene
      hideNavBar
      headerStyle={styles.header}
      titleStyle={[styles.title, {width: Metrics.screenWidth}]}
      tintColor="white"
      title={' ResetPassword'}
      key=" ResetPassword"
      component={ ResetPassword}
      renderLeftButton={
        () => {}
        //<TabButtonLeft imagesArray={["rightArrow"]} actions={[Actions.pop]} />
      }
    />

   

    
   

   

   
    

    {DrawerMenu.getDrawerMenu()}
  </Stack>,
);
export default () => (
  <AppNavigator backAndroidHandler={onBackPress} navigator={navigator} />
);
const AppNavigator = connect()(Router);
