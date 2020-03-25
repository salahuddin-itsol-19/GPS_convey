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

import styles from './styles';
import {Images, Metrics, Fonts, Colors} from '../../theme';
import SpinnerLoader from '../../components/SpinnerLoader';
import {request as forgotPassword_user} from '../../redux/actions/ForgotPassword';

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      isloading: false,
      formErrors: {
        emailError: false,
      },
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
  
    if (nextProps.forgotPassword) {
      if (
        !nextProps.forgotPassword.failure &&
        !nextProps.forgotPassword.isFetching &&
        nextProps.forgotPassword.data
      ) {
        this.setState({isloading: false}, () => {
          setTimeout(() => {
            Alert.alert(
              'Successfully',
              nextProps.forgotPassword.data.msg,
              [
                {
                  text: 'ok',
                  onPress: () => {
                    this.props.navigation.navigate('VerifyResetCode');
                  },
                },
              ],
              {cancelable: false},
            );
          }, 500);
        });
        console.log(
          nextProps.forgotPassword.data,
          ' nextProps.login.data nextProps.login.data',
        );
      } else if (
        nextProps.forgotPassword.failure &&
        !nextProps.forgotPassword.isFetching
      ) {
        this.setState({isloading: false});
      }
    }
  }

  checkValidation = () => {
    const {email} = this.state;
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!email.match(emailRegex)) {
      this.setState({
        formErrors: {
          emailError: true,
        },
      });
      setTimeout(() => {
        this.setState({
          formErrors: {
            emailError: false,
          },
        });
      }, 6000);
    } else {
      this.handleForgotPassword();
    }
  };

  handleForgotPassword = () => {
    this.setState({isloading: true});
    const {email} = this.state;
    const payload = {email};
    this.props.forgotPassword_user(payload);
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

  renderEmailField = () => {
    const {formErrors} = this.state;
    return (
      <View style={{marginBottom: Metrics.ratio(10)}}>
        <Text style={styles.inputLabel}>Email</Text>
        <TextInput
          style={styles.inputField}
          placeholder="yourmail@mail.com"
          onChangeText={this.onChangeEmail}
          autoCompleteType="off"
          value={this.state.email}
          keyboardType="email-address"
        />
        {formErrors.emailError ? (
          <Text style={styles.errorMessage}>
           Invalid email address
          </Text>
        ) : null}
      </View>
    );
  };

  renderSendCodeBtn = () => {
    return (
      <TouchableOpacity
        style={styles.submitBtn}
        onPress={() => this.checkValidation()}>
        <Text style={styles.submitBtnText}>Send Code</Text>
      </TouchableOpacity>
    );
  };

  renderCard = () => {
    return (
      <View style={styles.cardContainer}>
        {this.renderLogo()}
        {this.renderEmailField()}
        {this.renderSendCodeBtn()}
      </View>
    );
  };

  renderHeaderBtn = () => {
    return (
      <TouchableOpacity
        style={styles.headerBtnView}
        onPress={() => this.props.navigation.navigate('Login')}>
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
      <ImageBackground
        source={Images.backgroundImage}
        resizeMode="cover"
        resizeMethod="auto"
        style={styles.container}>
        {this.renderHeaderBtn()}
        {this.renderCard()}
        {this._renderOverlaySpinner()}
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => ({forgotPassword: state.forgotPassword});

const action = {forgotPassword_user};

export default connect(mapStateToProps, action)(ForgotPassword);
