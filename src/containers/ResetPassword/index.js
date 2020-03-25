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
import {request as reset_password_request} from '../../redux/actions/ResetPassword';
class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createPassword: '',
      confirmPassword: '',
      isloading: false,
      formErrors: {
        emailError: false,
        createPasswordError: false,
        confirmPasswordError: false,
      },
      showCreatePassword: false,
      showConfirmPassword: false,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.resetPassword) {
      if (
        !nextProps.resetPassword.failure &&
        !nextProps.resetPassword.isFetching &&
        nextProps.resetPassword.data
      ) {
        this.setState({isloading: false}, () => {
          setTimeout(() => {
            Alert.alert(
              'Successfully',
              'Password Successfully Reset',
              [
                {
                  text: 'ok',
                  onPress: () => {
                    this.props.navigation.popToTop()
                  },
                },
              ],
              {cancelable: false},
            );
          }, 500);
        });
        console.log(
          nextProps.resetPassword.data,
          ' nextProps.login.data nextProps.login.data',
        );
        // this.props.navigation.navigate('Feeds');
      } else if (
        nextProps.resetPassword.failure &&
        !nextProps.resetPassword.isFetching
      ) {
        this.setState({isloading: false});
      }
    }
  }

  checkValidation = () => {
    const {createPassword, confirmPassword} = this.state;
    if (createPassword.length < 6) {
      this.setState({
        formErrors: {
          createPasswordError: true,
          confirmPasswordError: false,
        },
      });
      setTimeout(() => {
        this.setState({
          formErrors: {
            createPasswordError: false,
            confirmPasswordError: false,
          },
        });
      }, 6000);
    } else if (confirmPassword !== createPassword) {
      this.setState({
        formErrors: {
          createPasswordError: false,
          confirmPasswordError: true,
        },
      });
      setTimeout(() => {
        this.setState({
          formErrors: {
            createPasswordError: false,
            confirmPasswordError: false,
          },
        });
      }, 6000);
    } else {
      this.handleResetPassword();
    }
  };

  handleResetPassword = () => {
    const {forgotPassword} = this.props;
    this.setState({isloading: true});
    const {createPassword} = this.state;
    const payload = {
      password: createPassword,
      userId: forgotPassword.data.userId,
    };
    console.log(payload)
    this.props.reset_password_request(payload);
  };

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

  renderCreatePasswordField = () => {
    const {showCreatePassword, formErrors} = this.state;
    return (
      <View style={{marginBottom: Metrics.ratio(10)}}>
        <Text style={styles.inputLabel}>Create Password</Text>
        <TextInput
          style={[styles.inputField, {paddingRight: Metrics.ratio(35)}]}
          placeholder="* * * * * * *"
          secureTextEntry={showCreatePassword ? false : true}
          onChangeText={this.onChangeCreatePassword}
          value={this.state.createPassword}
          autoCompleteType="off"
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
    const {showConfirmPassword, formErrors} = this.state;
    return (
      <View style={{marginBottom: Metrics.ratio(10)}}>
        <Text style={styles.inputLabel}>Confirm Password</Text>
        <TextInput
          style={[styles.inputField, {paddingRight: Metrics.ratio(35)}]}
          placeholder="* * * * * * *"
          secureTextEntry={showConfirmPassword ? false : true}
          onChangeText={this.onChangeConfirmPassword}
          value={this.state.confirmPassword}
          autoCompleteType="off"
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

  renderResetPasswordBtn = () => {
    return (
      <TouchableOpacity
        style={styles.submitBtn}
        onPress={() => this.checkValidation()}>
        <Text style={styles.submitBtnText}>Reset Password</Text>
      </TouchableOpacity>
    );
  };

  renderCard = () => {
    return (
      <View style={styles.cardContainer}>
        {this.renderLogo()}
        {this.renderCreatePasswordField()}
        {this.renderConfirmPasswordField()}
        {this.renderResetPasswordBtn()}
      </View>
    );
  };

  renderHeaderBtn = () => {
    return (
      <TouchableOpacity
        style={styles.headerBtnView}
        onPress={() => this.props.navigation.navigate('VerifyResetCode')}>
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
      </ImageBackground>
      {this._renderOverlaySpinner()}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  forgotPassword: state.forgotPassword,
  resetPassword: state.resetPassword,
});

const action = {reset_password_request};

export default connect(mapStateToProps, action)(ForgotPassword);
