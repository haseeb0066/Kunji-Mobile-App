import React, {useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import styles from './styles';
import images from '../../../assets/images/images';
import Header from '../../../components/common/Header/Header';
import * as Yup from 'yup';
import AppForm from '../../../components/common/FormComponents/AppForm';
import AppFromField from '../../../components/common/FormComponents/AppFormField';
import SubmitButton from '../../../components/common/FormComponents/SubmitButton';
import {
  backArrow,
  eyeCloseIcon,
  eyeIcon,
} from '../../../assets/images/svg/SvgImages';
import colors from '../../../assets/colors/colors';
import PopUpModal from '../../../components/common/PopUpModal/PopUpModal';
import SuccessAnimation from '../../../assets/Animations/success.json';
import {changePasswordInProfile} from '../../../server/ApiFunctions';
import useAuth from '../../../Auth/useAuth';
import Loader from '../../../components/common/Loader/Loader';

export const ChangePassword = ({navigation}) => {
  const {getUserToken, user} = useAuth();
  console.log(user);
  const [popUpModalVisible, setPopUpModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessege, setSuccessMessage] = useState('');
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const [isSecureEntry2, setIsSecureEntry2] = useState(true);
  const [isSecureEntry3, setIsSecureEntry3] = useState(true);
  const initialValues = {
    oldPassword: '',
    setNewPassword: '',
    confirmNewPassword: '',
  };
  const validationSchema = Yup.object({
    oldPassword: Yup.string()
      .min(8, 'Please enter old password atleast 8 characters')
      .required('Old password is required field'),
    setNewPassword: Yup.string()
      .min(8, 'Please enter new password atleast 8 characters')
      .required('Set new password is required field'),
    confirmNewPassword: Yup.string()
      .min(8, 'Please enter confirm new password atleast 8 characters')
      .required('Confirm new password is required field')
      .oneOf([Yup.ref('setNewPassword'), null], 'Passwords must match'),
  });

  // change password
  const Submit = async values => {
    const token = await getUserToken();
    try {
      setLoading(true);
      let formdata = new FormData();
      formdata.append('old_password', values.oldPassword);
      formdata.append('password', values.setNewPassword);
      formdata.append('password_confirmation', values.confirmNewPassword);
      const result = await changePasswordInProfile(formdata, token);
      if (result.status) {
        setLoading(false);
        setSuccessMessage(result.data?.message);
        setPopUpModalVisible(true);
      } else {
        setLoading(false);
        alert(result.data?.message);
      }
    } catch (error) {
      setLoading(false);
      console.log('error', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground style={styles.container} source={images.splash}>
      <PopUpModal
        modalVisiblePopUp={popUpModalVisible}
        source={SuccessAnimation}
        onPress={() => {
          setPopUpModalVisible(false);
          navigation.navigate('AppProfile');
        }}
        messageText={successMessege}
        title="OK"
      />
      {loading && <Loader isloading={loading} />}
      <View style={styles.headerContainer}>
        <Header
          onLeftIconPress={() => {
            navigation.goBack();
          }}
          leftSvgIcon={backArrow(colors.WHITE)}
          title={'Change Password'}
          textColor={'white'}
        />
      </View>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.inputContainer}>
            <AppForm
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={Submit}>
              <AppFromField
                label={'Old Password'}
                width={'100%'}
                placeholderTextColor={colors.placeHolderColor}
                placeholder="Enter old password"
                autoCapitalize="none"
                autoCorrect={false}
                name="oldPassword"
                borderColor={colors.red}
                TextContentType="password"
                borderWidth={1}
                borderRadius={15}
                onRightIconPress={() => setIsSecureEntry(!isSecureEntry)}
                rightSvgIcon={isSecureEntry ? eyeCloseIcon : eyeIcon}
                secureTextEntry={isSecureEntry}
              />
              <AppFromField
                label={'Set New Password'}
                width={'100%'}
                placeholderTextColor={colors.placeHolderColor}
                placeholder="Enter new password"
                autoCapitalize="none"
                autoCorrect={false}
                borderColor={colors.red}
                name="setNewPassword"
                TextContentType="password"
                borderWidth={1}
                borderRadius={15}
                onRightIconPress={() => setIsSecureEntry2(!isSecureEntry2)}
                rightSvgIcon={isSecureEntry2 ? eyeCloseIcon : eyeIcon}
                secureTextEntry={isSecureEntry2}
              />
              <AppFromField
                label={'Confirm New Password'}
                width={'100%'}
                placeholderTextColor={colors.placeHolderColor}
                placeholder="Enter confirm new password"
                autoCapitalize="none"
                autoCorrect={false}
                borderColor={colors.red}
                name="confirmNewPassword"
                TextContentType="password"
                borderWidth={1}
                borderRadius={15}
                onRightIconPress={() => setIsSecureEntry3(!isSecureEntry3)}
                rightSvgIcon={isSecureEntry3 ? eyeCloseIcon : eyeIcon}
                secureTextEntry={isSecureEntry3}
              />
              <SubmitButton title={'CHANGE PASSSWORD'} borderRadius={15} />
            </AppForm>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default ChangePassword;
