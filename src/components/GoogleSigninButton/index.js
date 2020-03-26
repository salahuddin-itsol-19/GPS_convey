import {connect} from 'react-redux';
import React, {Component} from 'react';

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import {
  Alert,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Zocial from 'react-native-vector-icons/Zocial';

import styles from './style';
import {Images, Metrics, Fonts} from '../../theme';
import {request as socialLogin} from '../../redux/actions/SocialLogin';

GoogleSignin.configure({
  //   scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
  webClientId:
    '218804652075-ihjqthdq3rdp0l8bpo4jrq517r46amlo.apps.googleusercontent.com',
  // 218804652075-70r84g54iand3qu4hodhatnf00j4tr3o.apps.googleusercontent.com
  // client ID of type WEB for your server (needed to verify user ID and offline access)
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  // hostedDomain: '', // specifies a hosted domain restriction
  // loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
  // forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login.
  // accountName: '', // [Android] specifies an account name on the device that should be used
  // iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
});

class GoogleSigninBtn extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // Somewhere in your code
  signIn = async () => {
    const {onGoogleLogin} = this.props;
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      if (userInfo) {
        console.log('GOOGLE SIGN SUCCESSFULLY ', userInfo);
        onGoogleLogin(userInfo);
        // Alert.alert(`Welcome ${userInfo.user.name}`)
        // this.setState({userInfo});

        const payload = {
          platform: 'Google',
          client_id: userInfo.user.id,
          token: userInfo.idToken,
          username: userInfo.user.name,
          email: userInfo.user.email,
          image: userInfo.user.photo,
          device_token: 'string',
          device_type: Platform.OS,
          // expires_at: "string"
        };
        // this.props.socialLogin(payload)
      }
    } catch (error) {
      console.log('GOOGLE SIGN ERROR ', error);
      console.log('GOOGLE SIGN ERROR ', error.code);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  render() {
    return (
      <TouchableOpacity onPress={this.signIn} style={styles.socialButton}>
        <Zocial name={'google'} size={Metrics.ratio(18)} color="#fff" />
        <Text style={styles.socialButtonText}>Gmail</Text>
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = state => ({socialLogin: state.socialLogin});

const action = {socialLogin};

export default connect(mapStateToProps, action)(GoogleSigninBtn);
