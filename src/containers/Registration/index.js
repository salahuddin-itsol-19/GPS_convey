import { connect } from 'react-redux';
import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Alert,
  Platform,
  Linking,
  TextInput,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Zocial from 'react-native-vector-icons/Zocial';
import { NavigationEvents } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import styles from './styles';
import { Images, Metrics, Fonts, Colors } from '../../theme';
import SpinnerLoader from '../../components/SpinnerLoader';
import { request as register_user } from '../../redux/actions/Register';
import GoogleSigninBtn from '../../components/GoogleSigninButton';
import FacebookSigninButton from '../../components/FacebookSigninButton';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      createPassword: '',
      confirmPassword: '',
      isloading: false,
      formErrors: {
        usernameError: false,
        emailError: false,
        createPasswordError: false,
        confirmPasswordError: false,
      },
      showCreatePassword: false,
      showConfirmPassword: false,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.register) {
      if (
        !nextProps.register.failure &&
        !nextProps.register.isFetching &&
        nextProps.register.data
      ) {
        this.setState({ isloading: false }, () => {
          setTimeout(() => {
            Alert.alert(
              'Successfully',
              'Successfully Registered',
              [
                {
                  text: 'ok',
                  onPress: () => {
                    this.props.navigation.navigate('Login')
                  },
                },
              ],
              { cancelable: false },
            );
          }, 500);
        });
      } else if (nextProps.register.failure && !nextProps.register.isFetching) {
        this.setState({ isloading: false });
      }
    }
  }

  checkValidation = () => {
    const { username, email, createPassword, confirmPassword } = this.state;
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (username.length < 4) {
      this.setState({
        formErrors: {
          usernameError: true,
          emailError: false,
          createPasswordError: false,
          confirmPasswordError: false,
        },
      });
      setTimeout(() => {
        this.setState({
          formErrors: {
            usernameError: false,
            emailError: false,
            createPasswordError: false,
            confirmPasswordError: false,
          },
        });
      }, 6000);
    } else if (!email.match(emailRegex)) {
      this.setState({
        formErrors: {
          usernameError: false,
          emailError: true,
          createPasswordError: false,
          confirmPasswordError: false,
        },
      });
      setTimeout(() => {
        this.setState({
          formErrors: {
            usernameError: false,
            emailError: false,
            createPasswordError: false,
            confirmPasswordError: false,
          },
        });
      }, 6000);
    } else if (createPassword.length < 6) {
      this.setState({
        formErrors: {
          usernameError: false,
          emailError: false,
          createPasswordError: true,
          confirmPasswordError: false,
        },
      });
      setTimeout(() => {
        this.setState({
          formErrors: {
            usernameError: false,
            emailError: false,
            createPasswordError: false,
            confirmPasswordError: false,
          },
        });
      }, 6000);
    } else if (confirmPassword !== createPassword) {
      this.setState({
        formErrors: {
          usernameError: false,
          emailError: false,
          createPasswordError: false,
          confirmPasswordError: true,
        },
      });
      setTimeout(() => {
        this.setState({
          formErrors: {
            usernameError: false,
            emailError: false,
            createPasswordError: false,
            confirmPasswordError: false,
          },
        });
      }, 6000);
    } else {
      this.handleRegister();
    }
  };

  handleRegister = () => {
    this.setState({ isloading: true });
    const { username, email, createPassword, confirmPassword } = this.state;
    const payload = {
      firstName: username,
      lastName: 'dsads',
      email,
      mobile: '01234567890',
      password: createPassword,
      gcm_id: "string",
      platform: Platform.OS
    };
    console.log(payload,'pappppppppppppppppp')
    this.props.register_user(payload);
  };

  onChangeUserName = value => this.setState({ username: value });
  onChangeEmail = value => this.setState({ email: value });
  onChangeCreatePassword = value => this.setState({ createPassword: value });
  onChangeConfirmPassword = value => this.setState({ confirmPassword: value });

  onSubmit = value => {
    if (value === 'onDone') {
      this.checkValidation();
    } else {
      this[value].focus();
    }
  };

  _renderOverlaySpinner = () => {
    const { isloading } = this.state;
    return <SpinnerLoader isloading={isloading} />;
  };

  renderLogo = () => {
    return (
      <View style={styles.logoView}>
        <Image
          source={Images.logo}
          style={{ width: Metrics.ratio(90), height: Metrics.ratio(90) }}
        />
      </View>
    );
  };

  renderUserNameField = () => {
    const { formErrors } = this.state;
    return (
      <View style={{ marginBottom: Metrics.ratio(10) }}>
        <Text style={styles.inputLabel}>Username</Text>
        <TextInput
          ref={o => {
            this.inputUserName = o;
          }}
          returnKeyType="next"
          style={styles.inputField}
          placeholder="yourname"
          onChangeText={this.onChangeUserName}
          autoCompleteType="off"
          value={this.state.username}
          onSubmitEditing={() => {
            this.onSubmit('inputEmail');
          }}
        />
        {formErrors.usernameError ? (
          <Text style={styles.errorMessage}>Invalid user name.</Text>
        ) : null}
      </View>
    );
  };

  renderEmailField = () => {
    const { formErrors } = this.state;
    return (
      <View style={{ marginBottom: Metrics.ratio(10) }}>
        <Text style={styles.inputLabel}>Email</Text>
        <TextInput
          ref={o => {
            this.inputEmail = o;
          }}
          returnKeyType="next"
          style={styles.inputField}
          placeholder="yourmail@mail.com"
          onChangeText={this.onChangeEmail}
          autoCompleteType="off"
          value={this.state.email}
          keyboardType="email-address"
          onSubmitEditing={() => {
            this.onSubmit('inputPassword');
          }}
        />
        {formErrors.emailError ? (
          <Text style={styles.errorMessage}>Invalid email address.</Text>
        ) : null}
      </View>
    );
  };

  renderCreatePasswordField = () => {
    const { showCreatePassword, formErrors } = this.state;
    return (
      <View style={{ marginBottom: Metrics.ratio(10) }}>
        <Text style={styles.inputLabel}>Create Password</Text>
        <TextInput
          ref={o => {
            this.inputPassword = o;
          }}
          returnKeyType="next"
          style={[styles.inputField, { paddingRight: Metrics.ratio(35) }]}
          placeholder="* * * * * * *"
          secureTextEntry={showCreatePassword ? false : true}
          onChangeText={this.onChangeCreatePassword}
          value={this.state.createPassword}
          autoCompleteType="off"
          onSubmitEditing={() => {
            this.onSubmit('confirmPassword');
          }}
        />
        <TouchableOpacity
          style={styles.eyeIconView}
          onPress={() =>
            this.setState({
              showCreatePassword: showCreatePassword ? false : true,
            })
          }>
          <FontAwesome
            name={showCreatePassword ? 'eye-slash' : 'eye'}
            size={Metrics.ratio(18)}
            color="#949494"
          />
        </TouchableOpacity>
        {formErrors.createPasswordError ? (
          <Text style={styles.errorMessage}>
            Password has must be atleast 6 characters.
          </Text>
        ) : null}
      </View>
    );
  };

  renderConfirmPasswordField = () => {
    const { showConfirmPassword, formErrors } = this.state;
    return (
      <View style={{ marginBottom: Metrics.ratio(10) }}>
        <Text style={styles.inputLabel}>Confirm Password</Text>
        <TextInput
          ref={o => {
            this.confirmPassword = o;
          }}
          returnKeyType="done"
          style={[styles.inputField, { paddingRight: Metrics.ratio(35) }]}
          placeholder="* * * * * * *"
          secureTextEntry={showConfirmPassword ? false : true}
          onChangeText={this.onChangeConfirmPassword}
          value={this.state.confirmPassword}
          autoCompleteType="off"
          onSubmitEditing={() => {
            this.onSubmit('onDone');
          }}
        />
        <TouchableOpacity
          style={styles.eyeIconView}
          onPress={() =>
            this.setState({
              showConfirmPassword: showConfirmPassword ? false : true,
            })
          }>
          <FontAwesome
            name={showConfirmPassword ? 'eye-slash' : 'eye'}
            size={Metrics.ratio(18)}
            color="#949494"
          />
        </TouchableOpacity>
        {formErrors.confirmPasswordError ? (
          <Text style={styles.errorMessage}>Password must be similar.</Text>
        ) : null}
      </View>
    );
  };

  renderRegisterBtn = () => {
    return (
      <TouchableOpacity
        style={styles.submitBtn}
        onPress={() => this.checkValidation()}>
        <Text style={styles.submitBtnText}>Register</Text>
      </TouchableOpacity>
    );
  };

  renderCard = () => {
    return (
      <View style={styles.cardContainer}>
        {this.renderLogo()}
        {this.renderUserNameField()}
        {this.renderEmailField()}
        {this.renderCreatePasswordField()}
        {this.renderConfirmPasswordField()}
        {this.renderRegisterBtn()}
      </View>
    );
  };

  renderFooter = () => {
    return (
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>Already have an account? </Text>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Login')}>
          <Text style={[styles.footerText, { color: '#5E8BFF' }]}>Login</Text>
        </TouchableOpacity>
      </View>
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
        {/* <KeyboardAwareScrollView style={{ flex: 1 }}> */}
        {this.renderCard()}
        {this.renderFooter()}
        {/* </KeyboardAwareScrollView> */}
      </ImageBackground>
       {this._renderOverlaySpinner()}
       </View>
    );
  }
}

const mapStateToProps = state => ({ register: state.register });

const action = { register_user };

export default connect(mapStateToProps, action)(Register);
