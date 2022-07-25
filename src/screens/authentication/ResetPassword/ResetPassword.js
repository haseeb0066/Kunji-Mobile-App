import React, {Component, useState} from 'react';
import {
  Image,
  ImageBackground,
  Platform,
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import * as Yup from 'yup';
import styles from './styles';

import CommonText from '../../../utils/CommonText';
import {hp, wp} from '../../../utils/CommonMethods';
import images from '../../../assets/images/images';
import colors from '../../../assets/colors/colors';

import Header from '../../../components/common/Header/Header';
import {sendForgotPasswordOTP} from '../../../server/ApiFunctions';
import Loader from '../../../components/common/Loader/Loader';
import SvgComponent from '../../../components/common/SvgCustomComponents/SvgCustomComponents';
import {appLogo, backArrow} from '../../../assets/images/svg/SvgImages';
import AppFromField from '../../../components/common/FormComponents/AppFormField';
import AppForm from '../../../components/common/FormComponents/AppForm';
import SubmitButton from '../../../components/common/FormComponents/SubmitButton';
import AppMobileNoInputField from '../../../components/common/FormComponents/AppMobileNoInputField';
import PopUpModal from '../../../components/common/PopUpModal/PopUpModal';
import sucessAnimation from '../../../assets/Animations/success.json';
import ValidationErrorMessage from '../../../components/common/FormComponents/ValidationErrorMessage';
const ResetPassword = ({navigation}) => {
  // const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [hidePass, setHidePass] = useState(true);
  const [apiResponseMessage, setApiResponseMessage] = useState('');
  const [viisbleSuccessModal, setViisbleSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formatedMobileNO, setFormatedMobileNO] = useState('');
  console.log(formatedMobileNO);
  const [phoneNumberValidationError, setPhoneNumberValidationError] =
    useState(false);
  const [valid, setIsValid] = useState(false);
  const checkValidation = () => {
    const regx = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (email === '') {
    } else if (regx.test(email) === false) {
      alert('Please enter Valid enter email');
    } else {
      Submit();
      console.log('====Sumit===>>', Submit);
    }
  };

  const Submit = async value => {
    if (valid) {
      setPhoneNumberValidationError(false);
      let body = new FormData();

      body.append('mobile', formatedMobileNO);
      try {
        setLoading(true);
        const result = await sendForgotPasswordOTP(body);
        console.log('====result===result===result======>>', result);
        // if()
        if (result.status) {
          setLoading(false);
          setApiResponseMessage(result.data?.message);
          setViisbleSuccessModal(true);
          let data = {mobileNo: formatedMobileNO};

          // navigation.navigate('CheckEmail',{data:email});
        } else {
          setLoading(false);
          alert(result.data?.message);
        }
      } catch (e) {
        setLoading(false);
        console.log('This is the error...');
        console.log(e);
      }
    } else {
      setPhoneNumberValidationError(true);
    }
    // navigation.navigate('CheckEmail');
  };

  const validationSchema = Yup.object({
    mobileNum: Yup.string().required('Phone number is required feild'),
  });

  return (
    <ImageBackground
      resizeMode={'cover'}
      source={images.splash}
      style={styles.container}>
      <PopUpModal
        modalVisiblePopUp={viisbleSuccessModal}
        source={sucessAnimation}
        messageText={apiResponseMessage}
        title="OK"
        onPress={() => {
          setViisbleSuccessModal(false);
          navigation.navigate('OtpVerification', {
            data: {mobileNo: formatedMobileNO},
            from: 'reset',
          });
        }}
      />
      <ScrollView>
        <View style={styles.headerContainer}>
          <Header
            onLeftIconPress={() => {
              navigation.goBack();
            }}
            leftSvgIcon={backArrow(colors.WHITE)}
            fontSize={hp(2.2)}
            textColor={colors.WHITE}
          />
        </View>
        <View style={styles.logoContainer}>
          <SvgComponent svgMarkup={appLogo} />
          {/* <Image source={rightIcon} style={Style.imageStyle2} /> */}
        </View>
        {loading && <Loader isloading={loading} />}

        <View style={styles.headingContainer}>
          <Text style={styles.headingStyle}>{CommonText.FORGOT_PASSWORD}</Text>
        </View>

        <View style={{marginTop: hp(3), alignItems: 'center'}}>
          <AppForm
            initialValues={{mobileNum: ''}}
            validationSchema={validationSchema}
            onSubmit={Submit}>
            <AppMobileNoInputField
              valid={valid}
              formatedMobileNO={formatedMobileNO}
              setFormatedMobileNO={setFormatedMobileNO}
              setIsValid={setIsValid}
              label="Enter Mobile No"
              laceholderTextColor={colors.GREEN}
              //placeholder="Mobile No"
              name={'mobileNum'}
              containerStyle={styles.phoneFieldContainer}
              textContainerStyle={styles.phoneNoTextCon}
              textInputStyle={styles.phoneNoInputcon}
              codeTextStyle={styles.codeTextStyle}
              // flagButtonStyle={{backgroundColor: 'white'}}
            />
            <ValidationErrorMessage
              error={'phone Number should be valid'}
              visible={phoneNumberValidationError}
            />

            <View
              style={{
                marginTop: hp(1.8),

                alignSelf: 'center',
              }}>
              <SubmitButton title="SEND OTP" width={wp(90)} />
            </View>
          </AppForm>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};
export default ResetPassword;
