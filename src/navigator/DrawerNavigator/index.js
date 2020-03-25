// import { createDrawerNavigator } from 'react-navigation-drawer';
// import React from 'react';
// import { Dimensions, Image } from 'react-native';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import Feeds from '../../containers/Feeds';
// import AwesomePlaces from "../../containers/AwesomePlaces";
// import Chat from "../../containers/Chat";
// import Empty from "../../containers/Empty";
// import SendFeedback from '../../containers/SendFeedback'
// import Help from '../../containers/Help'
// import HostParty from '../../containers/HostParty'

// // import MapBox from "../../containers/MapBox";
// import Sidebar from "../../containers/Sidebar";
// import Images from '../../theme/Images'
// import { Metrics, Fonts } from '../../theme';

// const DrawerIcon=(source)=>{
//     return(

//         <Image  source={source} style={{height:Metrics.ratio(30),width:Metrics.ratio(30)}} /> 
//     )
// }


// // Stack navigator for main app
// const AppNavigator = createDrawerNavigator({
//     Feeds: {
//         screen: Feeds,
//         navigationOptions: {
//             header: null,
//             title:"Your Places",
            
//             // drawerIcon: ({ tintColor }) => <FontAwesome name='newspaper-o' size={20} color={tintColor} />,
//             drawerIcon: ({tintColor }) =>DrawerIcon(Images.location)
//         }
//     },
//     AwesomePlaces: {
//         screen: AwesomePlaces,
//         navigationOptions: {
//             header: null,
//             title: 'Profile',
//             // drawerIcon: ({ tintColor }) => <FontAwesome name='map-marker' size={20} color={tintColor} />,
//             drawerIcon: ({tintColor }) =>DrawerIcon(Images.profile)
//         }
//     },
//     Empty: {
//         screen: Empty,
//         navigationOptions: {
//             header: null,
//             title: 'Message',
//             // drawerIcon: ({ tintColor }) => <FontAwesome name='code' size={20} color={tintColor} />,
//             drawerIcon: ({tintColor }) =>DrawerIcon(Images.message)
//         }
//     },
//     Chat: {
//         screen: Chat,
//         navigationOptions: {
//             header: null,
//             title: 'Location Sharing',
//             drawerIcon: ({tintColor }) =>DrawerIcon(Images.sharelocation)
//         }
          
//     },
//     SendFeedback: {
//         screen: Chat,
//         navigationOptions: {
//             header: null,
//             title: 'Send Feedback',
//             drawerIcon: ({tintColor }) =>DrawerIcon(Images.feedback)
//         }
          
//     },
//     Help: {
//         screen: Chat,
//         navigationOptions: {
//             header: null,
//             title: 'Help',
//             drawerIcon: ({tintColor }) =>DrawerIcon(Images.help)
//         }
          
//     },
//     HostParty: {
//         screen: Chat,
//         navigationOptions: {
//             header: null,
//             title: 'Host a Party',
//             drawerIcon: ({tintColor }) =>DrawerIcon(Images.hostaparty)
//         }
          
//     },

    
//     // MapBox: {
//     //     screen: MapBox,
//     //     navigationOptions: {
//     //         header: null,
//     //         title: 'Map Box',
//     //         drawerIcon: ({ tintColor }) => <FontAwesome name='map' size={20} color={tintColor} />,
//     //     }
//     // },
// }, {
//     contentComponent: props => <Sidebar {...props} />,
//     drawerWidth: Dimensions.get("window").width * 0.85,
//     // hideStatusBar: true,
//     drawerBackgroundColor: '#66DAFF',
//     contentOptions: {
//         inactiveTintColor: 'white',
//         inactiveBackgroundColor: 'transparent',
//         activeBackgroundColor: "#50CEFF",
//         activeTintColor: "white",
//         itemsContainerStyle: {
//             marginTop: 16,
//             marginHorizontal: 4
//         },
//         itemStyle: {
//             borderRadius: 4,
           
//         },
//         labelStyle:{
//             fontSize:16,
//             fontFamily:Fonts.type.medium,
//             fontWeight:"normal"
//         }

//     }
// })


// export default AppNavigator



// @flow
import React from 'react';

import {Image, View} from 'react-native';
import {connect} from 'react-redux';

import {
  Stack,
  Scene,
  Actions,
  ActionConst,
  Drawer,
  Tabs,
} from 'react-native-router-flux';

import {TabButtonLeft, Header} from '../../components';
import {Images, Metrics, Colors, Fonts} from '../../theme';
import styles from '../styles';
import Yourplaces from '../../containers/Feeds';
import Profile from "../../containers/AwesomePlaces";
import LocationSharing from "../../containers/Chat";
import Message from "../../containers/Empty";
import SendFeedback from '../../containers/SendFeedback'
import Help from '../../containers/Help'
import HostParty from '../../containers/HostParty'


import Sidebar from "../../containers/Sidebar";

const CustomHeader = () => {
  return (
    <Header
      headerText={'Dashboard'}
      leftIcon={Images.menuIcon}
      leftBtnPress={() => {
        this.props.navigation.openDrawer();
      }}
    />
  );
};

class DrawerMenu {
  onEnterSomeView = () => {
   console.log("uuuuuiiiiioooo")
  }
  onExitSomeView = () => {
    console.log("uuuuuiiiexitiioooo")
  }
  getDrawerMenu() {
    return (
      <Drawer
        drawer
        menuPosition={'left'}
        hideNavBar
        // type={ActionConst.RESET}
        key="dashboard"
        contentComponent={Sidebar}
        renderLeftButton={() => (
          <TabButtonLeft
            imagesArray={['rightArrow']}
            actions={[Actions.drawerOpen]}
          />
        )}
        openDrawerOffset={0.2}
        panCloseMask={0.2}
        negotiatePan={true}
        tweenHandler={ratio => {
          return {
            mainOverlay: {
              opacity: ratio === 0 ? 0 : 0.3,
              backgroundColor: '#000',
            },
          };
        }}
        drawerWidth={Metrics.screenWidth * 0.75}>
        <Scene hideNavBar>
          <Stack key="root">
           
            <Scene
              hideNavBar
              headerStyle={styles.header}
              titleStyle={[styles.title, {width: Metrics.screenWidth}]}
              tintColor="white"
              title={'Yourplaces'}
              icon={Images.shareIcon}
              key="Yourplaces"
              component={Yourplaces}
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
              title={'Profile'}
              key="Profile"
              component={Profile}
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
              title={'Message'}
              key="Message"
              component={Message}
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
              title={'Location Sharing'}
              key="LocationSharing"
              component={LocationSharing}
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
              title={'Send Feedback'}
              key="SendFeedback"
              component={SendFeedback}
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
              title={'Help'}
              key="Help"
              component={Help}
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
              title={'Host a Party'}
              key="HostParty"
              component={HostParty}
              renderLeftButton={
                () => {}
                //<TabButtonLeft imagesArray={["rightArrow"]} actions={[Actions.pop]} />
              }
            />
          </Stack>
        </Scene>
      </Drawer>
    );
  }
}

export default new DrawerMenu();
