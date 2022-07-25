import React, {Component, useState, useEffect} from 'react';
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  BackHandler,
} from 'react-native';
import styles from './styles';
import CommonText from '../../../utils/CommonText';
import {hp, wp} from '../../../utils/CommonMethods';
import images from '../../../assets/images/images';
import colors from '../../../assets/colors/colors';
import fontFamily from '../../../assets/fonts/fontFamily';
import {
  verifyOTP,
  resendOTP,
  verifyOTPForgot,
} from './../../../server/ApiFunctions';
import Loader from '../../../components/common/Loader/Loader';
import AppButton from '../../../components/common/AppButton';
import useAuth from '../../../Auth/useAuth';
import OTPTextInput from 'react-native-otp-textinput';
import SvgComponent from '../../../components/common/SvgCustomComponents/SvgCustomComponents';
import {appLogo, backArrow} from '../../../assets/images/svg/SvgImages';
import Header from '../../../components/common/Header/Header';

const OtpVerification = props => {
  const {user} = useAuth();
  // console.log(""props.route.params.data);
  const [data, setData] = useState(props.route.params.data);
  const [from, setfromLogin] = useState(props.route.params.from);
  const [time, setTime] = useState('00:00');
  // const [data, setData] = useState();
  const [VisibleResendOtp, setVisibleResendOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState('');
  const [canGoBack, setCanGoBack] = useState(false);
  // const hasUnsavedChanges = Boolean(canGoBack);
  const CountDown = () => {
    let seconds = 60,
      stop = 0,
      counterStarted = false,
      counter;
    if (counterStarted === false) {
      counterStarted = true;
      counter = setInterval(function () {
        if (seconds > stop) {
          seconds--;
          seconds = seconds < 10 ? '0' + seconds : seconds;
          setTime('00:' + seconds);
          // console.log("seconds",seconds);
        } else {
          clearInterval(counter);
          counterStarted = false;
          seconds = 0;
        }
        if (seconds == 0) {
          setTime('00:00');
          setVisibleResendOtp(true);
          // setDisabled(false);
        }
      }, 1000);
    }
  };
  // useEffect(() => {
  //   if (from !== 'reset') resend();
  // }, []);
  // useEffect(() => {
  //   CountDown();
  // }, []);
  // alert(JSON.stringify(data))
  // React.useEffect(() => {
  //   console.log('abc 123', canGoBack);
  //   props.navigation.addListener('beforeRemove', e => {
  //     if (canGoBack) {
  //       // If we don't have unsaved changes, then we don't need to do anything
  //       return;
  //     }

  //     // Prevent default behavior of leaving the screen
  //     if (canGoBack === false) {
  //       e.preventDefault();
  //     } else props.navigation.navigate('Login');
  //   });
  // }, [props.navigation, canGoBack]);
  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to go back?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => props.navigation.navigate('Login')},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
  const verify = () => {
    if (otp === '') {
      alert('Please enter otp');
    } else {
      setLoading(true);
      if (from === 'reset') {
        let formData = new FormData();
        formData.append('otp', otp);
        formData.append('mobile', data.mobileNo);
        verifyOTPForgot(formData)
          .then(res => {
            console.log('loho=>', res);
            setLoading(false);
            if (res.status) {
              alert('User Verified Successfully!Please set new password');
              let dat = {
                token: res.data?.data,
                email: data.mobileNo,
              };
              props.navigation.navigate('CreateNewPass', {data: dat});
            } else {
              alert(res.data?.message);
            }
          })
          .catch(err => {
            setLoading(false);
            console.log(err);
          });
      } else {
        let formData = new FormData();
        formData.append('otp', otp);
        verifyOTP(formData, data.token)
          .then(res => {
            console.log(res);
            setLoading(false);
            if (res.status) {
              if (from === 'login') {
                setCanGoBack(true);
                alert('User Verified Successfully');

                props.navigation.navigate('Login');
              } else {
                setCanGoBack(true);
                alert('User created Successfully');
                props.navigation.navigate('Login');
              }
            } else {
              setCanGoBack(true);

              alert(res.data?.message);
              props.navigation.navigate('Login');
            }
          })
          .catch(err => {
            setLoading(false);
            console.log(err);
          });
      }
    }
  };
  const resend = () => {
    console.log(data.token);
    setLoading(true);
    resendOTP(data.token)
      .then(res => {
        setLoading(false);
        if (res.status) {
          alert('OTP has been resent');
          CountDown();
        } else {
          alert(res.data?.message);
          setVisibleResendOtp(false);
          CountDown();
        }
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
      });
  };
  return (
    <ImageBackground
      resizeMode={'cover'}
      source={images.splash}
      style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 0}
        style={{flex: 1}}>
        <View style={styles.headerContainer}>
          <Header
            onLeftIconPress={() => {
              Alert.alert('Hold on!', 'Are you sure you want to go back?', [
                {
                  text: 'Cancel',
                  onPress: () => null,
                  style: 'cancel',
                },
                {
                  text: 'YES',
                  onPress: () => props.navigation.navigate('Login'),
                },
              ]);
            }}
            leftSvgIcon={backArrow(colors.WHITE)}
            // title={'Change Password'}
            textColor={'white'}
          />
        </View>
        <ScrollView>
          <View style={styles.logoContainer}>
            <SvgComponent svgMarkup={appLogo} />
            {/* <Image source={images.otp_logo} style={styles.logoStyles} /> */}
            {/* <Image source={rightIcon} style={Style.imageStyle2} /> */}
          </View>
          {loading && <Loader isloading={loading} />}

          <View style={styles.contentContainer}>
            <View style={styles.mainContainer}>
              <View style={styles.headingContainer}>
                <Text style={styles.headingStyle}>{'OTP Verification'}</Text>
                <Text
                  style={[
                    styles.textStyleEmail,
                    {marginTop: hp(2), marginLeft: wp(4)},
                  ]}>
                  {CommonText.ENTER_OTP}
                </Text>
                <Text
                  style={{
                    fontSize: hp(1.8),
                    marginTop: hp(2),
                    marginLeft: wp(4),
                  }}>{`Your OTP is: ${data.two_factor_code}`}</Text>
              </View>
              {/* two_factor_code */}
              {/* <View style={styles.headingContainer}>
               
              </View> */}
              <View style={styles.inputContainer}>
                <View>
                  <OTPTextInput
                    inputCount={4}
                    containerStyle={styles.input}
                    // autoFocusOnLoad
                    // autoFocusOnLoad={false}
                    // caretColor={colors.WHITE}
                    handleTextChange={code => console.log(setOtp(code))}
                    textInputStyle={styles.underlineStyleBase}
                    tintColor={colors.BLACK}
                    offTintColor={colors.BLACK}
                    // onCodeFilled={code => {
                    //   setOtp(code);
                    //   console.log(`Code is ${code}, you are good to go!`);
                    // }}
                    // onCodeChanged={codeNumber => {
                    //   // console.log(`code Number ${codeNumber}`);
                    //   setOtp(codeNumber);
                    // }}
                    // keyboardType={'phone-pad'}
                    // keyboardAppearance={'default'}
                    // codeInputHighlightStyle={styles.heightInput}
                  />
                </View>
              </View>

              <View style={styles.buttonContainer}>
                <AppButton
                  titleColor={otp.length < 4 ? colors.GRAY : colors.WHITE}
                  disabled={otp.length < 4 ? true : false}
                  title="OTP VEIFICATION"
                  onPress={() => {
                    verify();
                    // navigation.navigate('Login')
                  }}
                />
                {from === 'reset' ? null : (
                  <>
                    <View style={styles.bottomTextContainer}>
                      <Text style={[styles.textStyle, colors.WHITE]}>
                        {`Resend OTP in `}
                      </Text>
                      <Text style={[styles.textStyle, {color: colors.BLACK}]}>
                        {`${time}`}
                      </Text>
                      {/* <TouchableOpacity
                        onPress={() => {
                          resend();
                          // navigation.navigate('SignUp');
                        }}>
                        <Text
                          style={[
                            styles.textStyle,
                            {
                              color: colors.BLACK,
                              fontFamily: fontFamily.Mulish_Bold,
                              alignItems: 'center',
                            },
                          ]}>
                          {'Resend OTP'}
                        </Text>
                      </TouchableOpacity> */}
                    </View>
                    <View
                      style={[
                        styles.bottomTextContainer2,
                        {opacity: VisibleResendOtp ? 1 : 0.3},
                      ]}>
                      <Text style={styles.textStyle}>
                        {CommonText.DONT_RECV_OTP}
                      </Text>
                      <TouchableOpacity
                        disabled={!VisibleResendOtp}
                        onPress={() => {
                          resend();
                          // navigation.navigate('SignUp');
                        }}>
                        <Text
                          style={[
                            styles.textStyle,
                            {
                              color: colors.BLACK,
                              fontFamily: fontFamily.Mulish_Bold,
                              alignItems: 'center',
                            },
                          ]}>
                          {'Resend OTP'}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </>
                )}
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};
export default OtpVerification;
