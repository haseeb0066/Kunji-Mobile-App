import React, {Component, useState} from 'react';
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './styles';
import CommonText from '../../../utils/CommonText';
import {hp, wp} from '../../../utils/CommonMethods';

import images from '../../../assets/images/images';
import Header from '../../../components/common/Header/Header';
import AppButton from '../../../components/common/AppButton';

const CheckEmail = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [hidePass, setHidePass] = useState(true);

  const checkValidation = () => {
    const regx = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (email === '' && password === '') {
      alert('Please fill all field ');
    } else if (regx.test(email) === false) {
      alert('Please enter Valid enter email');
    } else if (password.length < 6) {
      alert('Please enter password atleast 6 ch..');
    } else {
      Submit();
      console.log('====Sumit===>>', Submit);
    }
  };

  return (
    <ImageBackground
      resizeMode={'cover'}
      source={images.splash}
      style={styles.container}>
      <View style={styles.headerContainer}>
        <Header
          leftIconPath={images.left_header_icon1}
          onPress={() => {
            navigation.goBack();
          }}
        />
      </View>
      <View style={styles.logoContainer}>
        <Image source={images.email_logo} style={styles.logoStyles} />
        {/* <Image source={rightIcon} style={Style.imageStyle2} /> */}
      </View>

      <ImageBackground
        source={images.sign_in_Background}
        style={styles.contentContainer}
        imageStyle={{
          borderTopRightRadius: hp(4),
          borderTopLeftRadius: hp(4),
        }}>
        <View style={styles.mainContainer}>
          <View style={styles.headingContainer}>
            <Text style={styles.headingStyle}>{'Check your mail'}</Text>
            <Text style={[styles.textStyleEmail, {marginTop: hp(2)}]}>
              {CommonText.FORGOT_PASSWORD}
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <AppButton
              onPress={() => {
                navigation.navigate('CreateNewPass');
              }}
              title={'Open email app'}
              width={'70%'}
            />
            <TouchableOpacity style={styles.textView3}>
              <Text style={styles.textStyle2}>
                {'Skip, I’ll confirm later'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.textContainer}>
            <View style={styles.textView4}>
              <Text style={styles.textStyle4}>
                {'Did not receive the email? Check your spam filter'}
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </ImageBackground>
  );
};
export default CheckEmail;
