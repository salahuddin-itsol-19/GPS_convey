import {connect} from 'react-redux';
import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  Alert,
  Platform,
  TextInput,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import OTPInputView from '@twotalltotems/react-native-otp-input';

import styles from './styles';
import {Images, Metrics, Fonts, Colors} from '../../theme';
import SpinnerLoader from '../../components/SpinnerLoader';
import {request as verify_request_password_request} from '../../redux/actions/VerifyResetCode';

class VerifyResetCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      isloading: false,
      formErrors: {
        codeError: false,
      },
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.verifyResetCode) {
      if (
        !nextProps.verifyResetCode.failure &&
        !nextProps.verifyResetCode.isFetching &&
        nextProps.verifyResetCode.data
      ) {
        this.setState({isloading: false}, () => {
          if (
            nextProps.verifyResetCode.data.success &&
            nextProps.verifyResetCode.data.verified
          ) {
            this.props.navigation.navigate('ResetPassword');
          }
        });
      } else if (
        nextProps.verifyResetCode.failure &&
        !nextProps.verifyResetCode.isFetching
      ) {
        this.setState({isloading: false});
      }
    }
  }

  checkValidation = () => {
    const {code} = this.state;

    if (code.length < 4) {
      this.setState({
        formErrors: {
          codeError: true,
        },
      });
      setTimeout(() => {
        this.setState({
          formErrors: {
            codeError: false,
          },
        });
      }, 6000);
    } else {
      this.handleLogin();
    }
  };

  handleLogin = () => {
    this.setState({isloading: true});
    const {code} = this.state;
    const {forgotPassword} = this.props;
    const payload = {
      token: code,
      userId: forgotPassword.data.userId,
      // device_type: Platform.OS,
      // device_token: "string"
    };

    this.props.verify_request_password_request(payload);
  };

  onChangeUserName = value => this.setState({username: value});
  onChangeEmail = value => this.setState({email: value});
  onChangeCreatePassword = value => this.setState({createPassword: value});
  onChangeConfirmPassword = value => this.setState({confirmPassword: value});

  _renderOverlaySpinner = () => {
    const {isloading} = this.state;
    return <SpinnerLoader isloading={isloading} />;
  };

  renderLogo = () => {
    return (
      <View style={styles.logoView}>
        <Image
          source={Images.logo}
          style={{width: Metrics.ratio(90), height: Metrics.ratio(90)}}
        />
      </View>
    );
  };

  renderCodeField = () => {
    const {formErrors} = this.state;
    return (
      <View style={{marginBottom: Metrics.ratio(10)}}>
        <Text style={styles.inputLabel}>OTP Code</Text>
        <OTPInputView
          style={{height: Metrics.ratio(50)}}
          pinCount={4}
          // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
          onCodeChanged={code => {
            this.setState({code});
          }}
          // onCodeFilled={(code => { console.log(`Code is ${code}, you are good to go!`) })}
          // autoFocusOnLoad
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
        />
        {formErrors.codeError ? (
          <Text style={styles.errorMessage}>Code must be 4 digit.</Text>
        ) : null}
      </View>
    );
  };

  renderVerifyCodeBtn = () => {
    return (
      <TouchableOpacity
        style={styles.submitBtn}
        onPress={() => this.checkValidation()}
        // onPress={() => this.props.navigation.navigate('ResetPassword')}
      >
        <Text style={styles.submitBtnText}>Verify &amp; Continue</Text>
      </TouchableOpacity>
    );
  };

  renderCard = () => {
    return (
      <View style={styles.cardContainer}>
        {this.renderLogo()}
        {this.renderCodeField()}
        {this.renderVerifyCodeBtn()}
      </View>
    );
  };

  renderHeaderBtn = () => {
    return (
      <TouchableOpacity
        style={styles.headerBtnView}
        onPress={() => this.props.navigation.navigate('ForgotPassword')}>
        <FontAwesome
          style={{paddingRight: Metrics.ratio(5)}}
          name="chevron-left"
          size={Metrics.ratio(20)}
          color="#84CDFF"
        />
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={{flex:1}}>
      <ImageBackground
        source={Images.backgroundImage}
        resizeMode="cover"
        resizeMethod="auto"
        style={styles.container}>
        {this.renderHeaderBtn()}
        {this.renderCard()}
        {this._renderOverlaySpinner()}
      </ImageBackground>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  forgotPassword: state.forgotPassword,
  verifyResetCode: state.verifyResetCode,
});

const action = {verify_request_password_request};

export default connect(mapStateToProps, action)(VerifyResetCode);
