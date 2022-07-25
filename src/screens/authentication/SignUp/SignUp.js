import React, {Component, useState} from 'react';
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  ScrollView,
} from 'react-native';
import styles from './styles';
import CommonText from '../../../utils/CommonText';
import {hp, wp} from '../../../utils/CommonMethods';
import images from '../../../assets/images/images';
import colors from '../../../assets/colors/colors';
import {register} from './../../../server/ApiFunctions';
import Loader from '../../../components/common/Loader/Loader';
import * as Yup from 'yup';
import SubmitButton from '../../../components/common/FormComponents/SubmitButton';
import AppFromField from '../../../components/common/FormComponents/AppFormField';
import AppForm from '../../../components/common/FormComponents/AppForm';
import {
  appLogo,
  eyeCloseIcon,
  eyeIcon,
} from '../../../assets/images/svg/SvgImages';
import SvgComponent from '../../../components/common/SvgCustomComponents/SvgCustomComponents';
import fonts from '../../../assets/fonts/fonts';
import AppMobileNoInputField from '../../../components/common/FormComponents/AppMobileNoInputField';
import ValidationErrorMessage from '../../../components/common/FormComponents/ValidationErrorMessage';
import Routes from '../../../navigation/Routes';

const SignUp = ({props, navigation}) => {
  const [loading, setLoading] = useState(false);
  const [phoneNumberValidationError, setPhoneNumberValidationError] =
    useState(false);
  const [valid, setIsValid] = useState(false);
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const [isSecureEntry2, setIsSecureEntry2] = useState(true);
  const [formattedValue, setFormattedValue] = useState('');
  const [formatedMobileNO, setFormatedMobileNO] = useState('');
  const Submit = values => {
    if (valid) {
      setPhoneNumberValidationError(false);
      setLoading(true);
      console.log(values);
      let body = new FormData();
      body.append('first_name', values.firstName);
      body.append('last_name', values.lastName);
      body.append('email', values.email);
      body.append('password', values.password);
      body.append('password_confirmation', values.confirmPassword);
      body.append('mobile', formatedMobileNO);
      navigation.navigate(Routes.TERMS_AND_CONDITIONS, {
        data: {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
          confirmPassword: values.confirmPassword,
          formatedMobileNO: formatedMobileNO,
        },
        from: 'signUp',
      });
      // register(body)
      //   .then(res => {
      //     console.log('Register---Res---->', res);
      //     setLoading(false);
      //     if (res.status) {
      //       // navigation.navigate('OtpVerification', {
      //       //   data: res.data.data,
      //       //   from: 'signUp',
      //       // });
      //       if (!res.data.is_verified)
      //         navigation.navigate(Routes.TERMS_AND_CONDITIONS, {
      //           data: res.data.data,
      //           from: 'signUp',
      //         });
      //     } else {
      //       alert(JSON.stringify(res.data?.message));
      //     }
      //     console.log('12=>', res);
      //   })
      //   .catch(err => {
      //     console.log(err);
      //     setLoading(false);
      //   });
    } else {
      setPhoneNumberValidationError(true);
    }
    //  navigation.navigate('OtpVerification');
  };

  // add Formik

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    mobileNum: '',
    isNumValid: valid,
  };
  const validationSchema = Yup.object({
    firstName: Yup.string('Please enter Valid fullNmae').required(
      'First name is required feild',
    ),
    lastName: Yup.string('Please enter Valid fullNmae').required(
      'Last name is required feild',
    ),
    email: Yup.string().email(),

    password: Yup.string()
      .min(8, 'Please enter password atleast 8 characters')
      .required('Password is required feild'),
    confirmPassword: Yup.string()
      .min(8, 'Please enter password atleast 8 ch..')
      .required('Conform password is a required feild')
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    mobileNum: Yup.string().required('Mobile number is a required feild'),
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 0}
      style={{flex: 1}}>
      <ImageBackground
        resizeMode={'cover'}
        source={images.splash}
        style={styles.container}>
        <ScrollView>
          <View style={styles.logoContainer}>
            <SvgComponent svgMarkup={appLogo} />
          </View>
          {/* {loading && <Loader isloading={loading} />} */}
          <View style={styles.contentContainer}>
            <View style={styles.mainContainer}>
              <View style={styles.headingContainer}>
                <Text style={styles.headingStyle}>
                  {CommonText.CREATE_NEW_ACCOUNT}
                </Text>
              </View>
              <AppForm
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={Submit}>
                <View style={{alignItems: 'center'}}>
                  <AppFromField
                    label="First Name"
                    width={wp(90)}
                    placeholderTextColor={colors.placeHolderColor}
                    placeholder="Enter your first name"
                    autoCapitalize="none"
                    autoCorrect={false}
                    name="firstName"
                    borderWidth={1}
                    borderColor={colors.RED_COLOR}
                  />
                  <AppFromField
                    label="Last Name"
                    width={wp(90)}
                    placeholderTextColor={colors.placeHolderColor}
                    placeholder="Enter your last name"
                    autoCapitalize="none"
                    autoCorrect={false}
                    name="lastName"
                    borderWidth={1}
                    borderColor={colors.RED_COLOR}
                  />

                  <AppMobileNoInputField
                    valid={valid}
                    setIsValid={setIsValid}
                    formatedMobileNO={formatedMobileNO}
                    setFormatedMobileNO={setFormatedMobileNO}
                    label="Mobile No"
                    name={'mobileNum'}
                    placeholder="Mobile No"
                    //placeholderTextColor={colors.placeHolderColor}
                    // formattedValue={formattedValue}
                    // setFormattedValue={setFormattedValue}
                    containerStyle={styles.phoneFieldContainer}
                    // textInputStyle={{borderRadius: 10}}
                    textContainerStyle={styles.phoneNoTextCon}
                    textInputStyle={styles.phoneNoInputcon}
                    codeTextStyle={styles.codeTextStyle}
                  />

                  <ValidationErrorMessage
                    error={'phone Number should be valid'}
                    visible={phoneNumberValidationError}
                  />

                  <AppFromField
                    label="Email"
                    width={wp(90)}
                    borderWidth={1}
                    // borderColor={colors.RED_COLOR}
                    placeholderTextColor={colors.placeHolderColor}
                    placeholder="Enter your email"
                    autoCapitalize="none"
                    autoCorrect={false}
                    name="email"
                    keyboardType="email-address"
                    TextContentType="emailAddress"
                  />

                  <AppFromField
                    label="Password"
                    width={wp(90)}
                    placeholderTextColor={colors.placeHolderColor}
                    borderWidth={1}
                    borderColor={colors.RED_COLOR}
                    placeholder="Enter password"
                    autoCapitalize="none"
                    name="password"
                    autoCorrect={false}
                    onRightIconPress={() => setIsSecureEntry(!isSecureEntry)}
                    rightSvgIcon={isSecureEntry ? eyeCloseIcon : eyeIcon}
                    secureTextEntry={isSecureEntry}
                    TextContentType="password"
                  />
                  <AppFromField
                    label="Confirm Password"
                    width={wp(90)}
                    placeholderTextColor={colors.placeHolderColor}
                    borderWidth={1}
                    borderColor={colors.RED_COLOR}
                    placeholder="Enter confirm password"
                    autoCapitalize="none"
                    name="confirmPassword"
                    autoCorrect={false}
                    onRightIconPress={() => setIsSecureEntry2(!isSecureEntry2)}
                    rightSvgIcon={isSecureEntry2 ? eyeCloseIcon : eyeIcon}
                    secureTextEntry={isSecureEntry2}
                    TextContentType="password"
                  />
                </View>

                <View style={{marginTop: hp(1)}}>
                  <SubmitButton title={'SIGN UP'} />
                </View>
                <View style={styles.bottomTextContainer}>
                  <Text style={styles.textStyleEmail}>
                    {CommonText.OLD_USER}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('Login');
                    }}>
                    <Text
                      style={[
                        styles.textStyle,
                        {
                          color: colors.primary,
                          fontWeight: 'bold',
                          fontSize: 14,
                        },
                      ]}>
                      {CommonText.SIGN_IN}
                    </Text>
                  </TouchableOpacity>
                </View>
              </AppForm>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};
export default SignUp;
