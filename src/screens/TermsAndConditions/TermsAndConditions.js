import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
  Alert,
  BackHandler,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../components/common/Header/Header';
import styles from './styles';
import images from '../../assets/images/images';
import colors from '../../assets/colors/colors';
import AppButton from '../../components/common/AppButton';
import {wp} from '../../utils/CommonMethods';
import Screen from '../../components/common/Screen';
import {appLogo, backArrow} from '../../assets/images/svg/SvgImages';
import SvgComponent from '../../components/common/SvgCustomComponents/SvgCustomComponents';
import RenderHtml from 'react-native-render-html';
import Toast from 'react-native-toast-message';
import Routes from '../../navigation/Routes';

import {getTermsAndConditions, register} from '../../server/ApiFunctions';
import {date} from 'yup/lib/locale';

const TermsAndConditions = ({navigation, route}) => {
  const [termsAndConditionData, setTermsAndConditionData] = useState({
    html: ``,
  });
  const [loading, setLoading] = useState(false);
  const {data} = route ? route.params : '';
  // const a = {
  //   html: `  "<div><h2>What is Lorem Ipsum?</h2><p><strong>Lorem Ipsum</strong> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p></div>""<div><h2>What is Lorem Ipsum?</h2><p><strong>Lorem Ipsum</strong> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p></div> <p>gfxggfd<strong>dszfsfdsdfsfrwrew</strong></p>
  //   <p><strong>gfgxdgfxdgfdgdgfdgf</strong></p>"`,
  // };
  const getTermsAndConditionsRequest = async () => {
    const res = await getTermsAndConditions(data.token);

    console.log('asdasdasdaasd', res.data.mobile_terms_and_conditions);
    if (res) {
      setTermsAndConditionData({
        html: `${res.data.mobile_terms_and_conditions}`,
      });
    } else alert('Unable to proceed Request');
  };

  const Submit = () => {
    setLoading(true);
    console.log(data);
    let body = new FormData();
    body.append('first_name', data.firstName);
    body.append('last_name', data.lastName);
    body.append('email', data.email);
    body.append('password', data.password);
    body.append('password_confirmation', data.confirmPassword);
    body.append('mobile', data.formatedMobileNO);
    body.append('terms_conditions', 1);
    // navigation.navigate(Routes.TERMS_AND_CONDITIONS, {
    //   data: {
    //     firstName: values.firstName,
    //     lastName: values.lastName,
    //     email: values.email,
    //     password: values.password,
    //     confirmPassword: values.confirmPassword,
    //     formatedMobileNO: formatedMobileNO,
    //   },
    //   from: 'signUp',
    // });
    register(body)
      .then(res => {
        console.log('Register---Res---->', res);
        setLoading(false);
        if (res.status) {
          // navigation.navigate('OtpVerification', {
          //   data: res.data.data,
          //   from: 'signUp',
          // });
          if (!res.data.is_verified)
            // navigation.navigate(Routes.TERMS_AND_CONDITIONS, {
            //   data: res.data.data,
            //   from: 'signUp',
            // });
            navigation.navigate('OtpVerification', {
              data: res.data.data,
              from: 'signUp',
            });
        } else {
          alert(JSON.stringify(res.data?.message));
        }
        console.log('12=>', res);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    getTermsAndConditionsRequest();
  }, []);

  return (
    <ImageBackground style={{flex: 1}} source={images.splash}>
      <Screen>
        <View style={styles.headerContainer}>
          <Header
            onLeftIconPress={() => {
              navigation.goBack();
            }}
            leftSvgIcon={backArrow(colors.WHITE)}
            // title={'Change Password'}
            textColor={'white'}
          />
        </View>
        <ScrollView>
          <View style={styles.logoContainer}>
            <SvgComponent svgMarkup={appLogo} />
          </View>
          <View style={styles.topHeaderTextContainer}>
            <Text style={styles.headerText}>Terms & Conditions</Text>
          </View>
          <View style={styles.mainTermsAndCondtionContainer}>
            {termsAndConditionData && (
              <RenderHtml
                contentWidth={wp(90)}
                source={termsAndConditionData}
              />
            )}
          </View>

          {/* <View style={styles.mainTermsAndCondtionContainer}>
            <View style={styles.termsSubHeaderContainer}>
              <Text style={styles.subHeaderText}>AGREEMENT TO TERMS</Text>
            </View>
            <View style={{marginTop: '2%'}}>
              <Text style={styles.termsDetails}>
                {`AGREEMENT TO TERMS These Terms and Conditions constitute a legally binding agreement made between you, whether personally or on behalf of an entity (“you”) and [your business name] (“we,” “us” or “our”),concerning your access to and use of our mobile application (the“ Application”). You agree that by accessing the Application, you have read, understood, and agree to be bound by all of these Terms and Conditions Use. IF YOU DO NOT AGREE WITH ALL OF THESE TERMS AND CONDITIONS, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE APPLICATION AND YOU MUST DISCONTINUE USE IMMEDIATELY.
    
Supplemental terms and conditions or documents that may be posted on the Application from time to time are hereby expressly incorporated herein by reference. We reserve the right, in our sole discretion,to make changes or modifications to these Terms and Conditions at any time and for any reason. We will alert you about any changes by updating the “Last updated” date of these Terms and Conditions and you waive any right to receive specific notice of each such change.It is your responsibility to periodically review these Terms and Conditions to stay informed of updates. You will be subject to, and will be deemed to have been made aware of and to have accepted, the changes in any revised Terms and Conditions by your continued use of the Application after the date such revised Terms are posted.

You may be required to register with the Application. You agree to keep your password confidential and will be responsible for all use of your account and password. We reserve the right to remove, reclaim, or change a username you select if we determine, in our sole discretion, that such username is inappropriate, obscene, or otherwise objectionable.
`}
              </Text>
            </View>
            <View style={styles.termsSubHeaderContainer}>
              <Text style={styles.subHeaderText}>PROHIBITED ACTIVITIES</Text>
            </View>
            <View style={{marginTop: '2%'}}>
              <Text style={styles.termsDetails}>
                {`You may not access or use the Application for any purpose other than that for which we make the Application available. The Application may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.`}
              </Text>
            </View>
          </View> */}
          <View style={styles.buttonContainer}>
            <AppButton
              loading={loading}
              disabled={loading}
              onPress={() => Submit()}
              title={'ACCEPT'}
              // width={'60%'}
              BackgroundImage={images.button_BackGround}
            />
          </View>
        </ScrollView>
      </Screen>
    </ImageBackground>
  );
};

export default TermsAndConditions;
