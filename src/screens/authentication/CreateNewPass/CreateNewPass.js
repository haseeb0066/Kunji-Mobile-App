import React, {Component, useState} from 'react';
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Pressable,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import * as Yup from 'yup';
import styles from './styles';
import {hp, wp} from '../../../utils/CommonMethods';
import images from '../../../assets/images/images';
import colors from '../../../assets/colors/colors';
import Header from '../../../components/common/Header/Header';
import {forgotSubmitNewPassword} from './../../../server/ApiFunctions';
import Loader from '../../../components/common/Loader/Loader';
import SvgComponent from '../../../components/common/SvgCustomComponents/SvgCustomComponents';
import {
  appLogo,
  backArrow,
  eyeCloseIcon,
  eyeIcon,
} from '../../../assets/images/svg/SvgImages';
import AppForm from '../../../components/common/FormComponents/AppForm';
import AppFromField from '../../../components/common/FormComponents/AppFormField';
import SubmitButton from '../../../components/common/FormComponents/SubmitButton';
import AppButton from '../../../components/common/AppButton';
import PopUpModal from '../../../components/common/PopUpModal/PopUpModal';
import sucessAnimation from '../../../assets/Animations/success.json';
const CreateNewPass = ({navigation, route}) => {
  const [data, setData] = useState(route?.params.data);
  const [modalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [hidePass, setHidePass] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const [isSecureEntry1, setIsSecureEntry1] = useState(true);
  const [apiResponseMessage, setApiResponseMessage] = useState('');
  const [viisbleSuccessModal, setViisbleSuccessModal] = useState(false);

  console.log(data);

  const Submit = async value => {
    //setViisbleSuccessModal(true);
    setLoading(true);
    let formData = new FormData();
    formData.append('token', data.token?.token);
    formData.append('password', value.newPassword);
    formData.append('password_confirmation', value.setNewPassword);
    try {
      const res = await forgotSubmitNewPassword(formData);

      if (res.status) {
        setLoading(false);
        setApiResponseMessage(res.data?.message);
        setViisbleSuccessModal(true);
      } else {
        setLoading(false);
        alert(res.data?.message);
        navigation.navigate('Login');
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const validationSchema = Yup.object({
    newPassword: Yup.string()
      .min(8, 'Please enter password atleast 8 characters')
      .required('Password is required feild'),
    setNewPassword: Yup.string()
      .min(8, 'Please enter password atleast 8 ch..')
      .required('Conform password is a required feild')
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
  });
  console.log(viisbleSuccessModal);
  return (
    <>
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
            navigation.navigate('Login');
          }}
        />
        <ScrollView>
          <View style={styles.headerContainer}>
            <Header
              leftSvgIcon={backArrow(colors.WHITE)}
              onPress={() => {
                navigation.goBack();
              }}
            />
          </View>
          <View style={styles.logoContainer}>
            <SvgComponent svgMarkup={appLogo} />
            {/* {loading && <Loader isloading={loading} />} */}
            {/* <Image source={images.password_logo} style={styles.logoStyles} /> */}
            {/* <Image source={rightIcon} style={Style.imageStyle2} /> */}
          </View>
          <View>
            <View style={styles.mainContainer}>
              <View style={styles.headingContainer}>
                <Text style={styles.headingStyle}>{'Create New Password'}</Text>
                {/* <Text style={[styles.textStyleEmail, {marginTop: hp(2)}]}>
              {CommonText.RESET_PASS_TEXT}
            </Text> */}
              </View>

              <AppForm
                initialValues={{newPassword: '', setNewPassword: ''}}
                validationSchema={validationSchema}
                onSubmit={Submit}>
                <View style={{alignItems: 'center', marginTop: hp(4)}}>
                  <AppFromField
                    // onRightIconPress={() => setVisiblePassword(!visiblePassword)}
                    label="Set New Password"
                    width={wp(90)}
                    placeholderTextColor={colors.primary}
                    placeholder="Set New Password"
                    autoCapitalize="none"
                    name="newPassword"
                    autoCorrect={false}
                    onRightIconPress={() => setIsSecureEntry(!isSecureEntry)}
                    rightSvgIcon={isSecureEntry ? eyeIcon : eyeCloseIcon}
                    secureTextEntry={isSecureEntry}
                    TextContentType="password"
                    borderWidth={1}
                    borderColor={colors.RED_COLOR}
                  />

                  <AppFromField
                    // onRightIconPress={() => setVisiblePassword(!visiblePassword)}
                    label="Confirm New Password"
                    width={wp(90)}
                    placeholderTextColor={colors.primary}
                    placeholder="Confirm New Password"
                    autoCapitalize="none"
                    name="setNewPassword"
                    autoCorrect={false}
                    onRightIconPress={() => setIsSecureEntry1(!isSecureEntry1)}
                    rightSvgIcon={isSecureEntry1 ? eyeIcon : eyeCloseIcon}
                    secureTextEntry={isSecureEntry1}
                    TextContentType="password"
                    borderWidth={1}
                    borderColor={colors.RED_COLOR}
                  />
                </View>

                <View style={{marginTop: hp(2), alignItems: 'center'}}>
                  <SubmitButton title="RESET PASSWORD" loading={loading} />
                </View>
              </AppForm>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </>
  );
};
export default CreateNewPass;
