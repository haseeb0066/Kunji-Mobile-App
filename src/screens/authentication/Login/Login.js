import React, {Component, useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import styles from './styles';
import CommonText from '../../../utils/CommonText';
import {hp, wp} from '../../../utils/CommonMethods';
import images from '../../../assets/images/images';
import colors from '../../../assets/colors/colors';

import {login, resendOTP} from '../../../server/ApiFunctions';
import {useSelector, useDispatch} from 'react-redux';
import {setUser, setToken} from '../../../redux/Actions/Actions';
import Loader from '../../../components/common/Loader/Loader';

import * as Yup from 'yup';
import AppForm from '../../../components/common/FormComponents/AppForm';
import AppFromField from '../../../components/common/FormComponents/AppFormField';
import SubmitButton from '../../../components/common/FormComponents/SubmitButton';
import {
  appLogo,
  eyeCloseIcon,
  eyeIcon,
} from '../../../assets/images/svg/SvgImages';
import SvgComponent from '../../../components/common/SvgCustomComponents/SvgCustomComponents';
import fonts from '../../../assets/fonts/fonts';
import useAuth from '../../../Auth/useAuth';
import AppMobileNoInputField from '../../../components/common/FormComponents/AppMobileNoInputField';
import ValidationErrorMessage from '../../../components/common/FormComponents/ValidationErrorMessage';
import Routes from '../../../navigation/Routes';
import Storage from '../../../Auth/Storage';

const Login = ({navigation}) => {
  const regxx = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  const {logIn, storeToken} = useAuth();
  const dispatch = useDispatch();
  // const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fcmToken, setFcmToken] = useState('');
  const [formatedMobileNO, setFormatedMobileNO] = useState('');
  const [loading, setLoading] = useState(false);
  const [phoneNumberValidationError, setPhoneNumberValidationError] =
    useState(false);
  const [valid, setIsValid] = useState(false);
  const [formattedValue, setFormattedValue] = useState('');

  const [isSecureEntry, setIsSecureEntry] = useState(true);
  //const [time, setTime] = useState();
  const [securePass, setSecurePass] = useState(true);

  // const Login = (email, password) => {
  //   const regx = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  //   if (email === '' && password === '') {
  //     // alert('Please fill all field ');
  //   } else if (regx.test(email) === false) {
  //     // alert('Please enter Valid enter email');
  //   } else if (password.length < 6) {
  //     alert('Please enter password atleast 6 ch..');
  //   } else {
  //     Submit();
  //   }
  // };

  const Submit = async values => {
    console.log('formattedValue ...>', formattedValue, values);

    if (valid) {
      setPhoneNumberValidationError(false);
      let body = new FormData();
      body.append('mobile', formatedMobileNO);
      body.append('password', values.password);
      body.append('fcm_token', fcmToken);
      try {
        setLoading(true);
        const result = await login(body);
        console.log(
          '====result===result===result======>>',
          result,
          result.data.profile_submitted,
        );
        console.log(
          '====result===result===result======>>2222',

          result.data.profile_submitted,
        );
        setLoading(false);
        if (result.status) {
          // setLoading(false);
          if (result.data.is_verified === 'false') {
            if (result.data.user_data.terms_conditions === 'Accepted')
              navigation.navigate(Routes.OTP_VERIFICATION, {
                data: result.data,
                from: 'login',
              });
          } else if (result.data.user_data.profile_submitted === 0) {
            setLoading(false);
            storeToken(result.data?.token);
            navigation.navigate(Routes.EDIT_PROFILE, {
              data: result.data,
              from: 'edit Profile',
            });
          } else {
            storeToken(result.data?.token);
            logIn(result.data?.user_data);
            dispatch(setToken(result.data?.token));
            dispatch(setUser(result.data?.user_data));
            console.log('...Response .... 12312312.', result);

            setLoading(false);
          }
        } else {
          setLoading(false);
          alert(result.data);
        }
        // alert(result.data);
      } catch (e) {
        setLoading(false);
        console.log('This is the error...', e);
        // console.log(e);
      }
    } else {
      setPhoneNumberValidationError(true);
    }
    // navigation.navigate("BottomTabbar")
  };

  const validationSchema = Yup.object({
    mobileNum: Yup.string().required('Phone number is required feild'),
    password: Yup.string()
      .min(8, 'Please enter password atleast 8 characters')
      .required('password is required field'),
  });

  const getFcomTOoken = async () => {
    const token = await Storage.getStoreFcmToken();
    setFcmToken(token);
    console.log('tokken fcm', token);
    return token;
  };
  useEffect(() => {
    getFcomTOoken();
  }, []);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={{flex: 1}}>
      <ImageBackground
        resizeMode={'cover'}
        source={images.splash}
        style={styles.container}>
        {loading && <Loader isloading={loading} />}

        <ScrollView>
          <View style={styles.logoContainer}>
            <SvgComponent svgMarkup={appLogo} />
          </View>

          <View style={styles.contentContainer}>
            <View style={styles.mainContainer}>
              <View style={styles.headingContainer}>
                <Text style={styles.headingStyle}>{'Sign In'}</Text>
                {/* <Text style={[styles.textStyleEmail, {marginTop: hp(2)}]}>
                  {CommonText.ENTER_EMAIL}
                </Text> */}
              </View>
              <View style={styles.inputContainer}>
                <AppForm
                  initialValues={{mobileNum: '', password: ''}}
                  validationSchema={validationSchema}
                  onSubmit={Submit}>
                  <View style={{alignItems: 'center'}}>
                    <AppMobileNoInputField
                      valid={valid}
                      formatedMobileNO={formatedMobileNO}
                      setFormatedMobileNO={setFormatedMobileNO}
                      setIsValid={setIsValid}
                      label="Mobile No"
                      laceholderTextColor={colors.GREEN}
                      name={'mobileNum'}
                      containerStyle={styles.phoneFieldContainer}
                      textContainerStyle={styles.phoneNoTextCon}
                      textInputStyle={styles.phoneNoInputcon}
                      codeTextStyle={styles.codeTextStyle}
                    />
                    <ValidationErrorMessage
                      error={'phone Number should be valid'}
                      visible={phoneNumberValidationError}
                    />
                    <AppFromField
                      // onRightIconPress={() => setVisiblePassword(!visiblePassword)}
                      label="Password"
                      width={wp(90)}
                      placeholderTextColor={colors.placeHolderColor}
                      placeholder="Enter your password"
                      autoCapitalize="none"
                      name="password"
                      autoCorrect={false}
                      onRightIconPress={() => setIsSecureEntry(!isSecureEntry)}
                      rightSvgIcon={isSecureEntry ? eyeCloseIcon : eyeIcon}
                      secureTextEntry={isSecureEntry}
                      TextContentType="password"
                      borderWidth={1}
                      borderColor={colors.RED_COLOR}
                    />
                  </View>
                  {/* <Text>{time}</Text> */}
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('ResetPassword');
                    }}
                    style={styles.forgotPassView}>
                    <Text style={styles.forgotPassStyle}>
                      {'Forgot Password?'}
                    </Text>
                  </TouchableOpacity>

                  <View style={{marginTop: hp(4), alignItems: 'center'}}>
                    <SubmitButton title="SIGN IN" />
                  </View>
                  <View style={styles.bottomTextContainer}>
                    <View style={{justifyContent: 'center'}}>
                      <Text style={styles.textStyleEmail}>
                        {CommonText.NEW_USER}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('SignUp');
                      }}>
                      <Text
                        style={[
                          styles.textStyle,
                          {
                            color: colors.primary,

                            fontSize: 14,
                            fontWeight: 'bold',
                          },
                        ]}>
                        {' Sign Up'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </AppForm>
              </View>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};
export default Login;
