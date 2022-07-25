import React, {useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import images from '../../../assets/images/images';
import styles from './styles';
import Header from '../../../components/common/Header/Header';
import {backArrow, CalenderIcon} from '../../../assets/images/svg/SvgImages';
import colors from '../../../assets/colors/colors';
import {hp, wp} from '../../../utils/CommonMethods';
import AppForm from '../../../components/common/FormComponents/AppForm';
import * as Yup from 'yup';
import AppFromField from '../../../components/common/FormComponents/AppFormField';
import AppButton from '../../../components/common/AppButton';

import PopUpModal from '../../../components/common/PopUpModal/PopUpModal';
import SuccessAnimation from '../../../assets/Animations/success.json';
import AppModalField from '../../../components/common/FormComponents/AppModalField';
import SubmitButton from '../../../components/common/FormComponents/SubmitButton';
import apiClient from '../../../Api/client';
import {END_POINTS} from '../../../server/URL';
import Toast from 'react-native-toast-message';
const AddUserPoll = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [poolNoOfDaysOpen, setPoolNoOfDaysOpen] = useState(false);
  const [poolNoOfDaysItems, setPoolNoOfDaysItems] = useState([
    {label: '7 days', value: 7},
    {label: '15 days', value: 15},
    {label: '30 days', value: 30},
  ]);
  const [poolNoOfDaysValue, setPoolNoOfDaysValue] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const [popUpModalVisible, setPopUpModalVisible] = useState(false);

  //create poll post
  const handleCreatePool = async values => {
    setLoading(true);

    const pollOptions = [];
    for (let i = 1; i <= 3; i++) {
      pollOptions.push(values['option' + i] && values['option' + i]);
    }
    console.log(pollOptions);

    const creatPollResult = await apiClient.post(END_POINTS.createPool, {
      question: values.question,
      valid_days: values.Validity,
      options: pollOptions,
    });
    if (creatPollResult.ok) {
      console.log(creatPollResult.data);
      setLoading(false);
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: creatPollResult.data?.message,
      });
      navigation.goBack();
    } else {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: creatPollResult?.message,
      });
    }
  };

  const initialValues = {
    question: '',
    option1: '',
    option2: '',
    option3: '',
    Validity: '',
  };
  const validationSchema = Yup.object({
    question: Yup.string().required('Question is required field'),
    option1: Yup.string().required('Option 1 is required field'),
    option2: Yup.string().required('Option 2 is required field'),

    Validity: Yup.string().required('Validity days is required field'),
  });
  return (
    <ImageBackground
      source={images.appBackgroundLight}
      style={styles.contianer}>
      <View style={styles.headercontianer}>
        <Header
          onLeftIconPress={() => {
            navigation.goBack();
          }}
          leftSvgIcon={backArrow(colors.primary)}
          title={'Post New Poll'}
          textColor={colors.primary}
        />
      </View>
      <PopUpModal
        modalVisiblePopUp={popUpModalVisible}
        source={SuccessAnimation}
        onPress={() => {
          setPopUpModalVisible(false);
          setModalVisible(false);
        }}
        messageText={'POLL POSTED SUCCESSFULLY!'}
        title="OK"
        onPress={() => navigation.navigate('Poll')}
      />
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <ScrollView>
          <View style={styles.commentstyle}>
            <AppForm
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleCreatePool}>
              <AppFromField
                width={'100%'}
                label="Your Question"
                placeholderTextColor={colors.placeHolderColor}
                placeholder="What New Services Would You Like To See?"
                autoCapitalize="none"
                autoCorrect={false}
                name="question"
                keyboardType="email-address"
                TextContentType="emailAddress"
                borderColor={colors.primary}
                borderWidth={1}
                borderRadius={15}
                maxHeight={80}
                style={{
                  paddingTop: Platform.OS === 'ios' ? hp(1.4) : hp(2),
                  marginLeft: '3%',
                }}
                minHeight={Platform.OS === 'ios' ? hp(15) : hp(19)}
                multiline={true}
                textAlignVertical="top"
              />
              <AppFromField
                width={'100%'}
                label="Option 1"
                placeholderTextColor={colors.placeHolderColor}
                placeholder="Enter option 1"
                autoCapitalize="none"
                autoCorrect={false}
                name="option1"
                keyboardType="email-address"
                TextContentType="emailAddress"
                borderColor={colors.primary}
                borderWidth={1}
                borderRadius={15}
              />
              <AppFromField
                width={'100%'}
                label="Option 2"
                placeholderTextColor={colors.placeHolderColor}
                placeholder="Enter option 2"
                autoCapitalize="none"
                autoCorrect={false}
                name="option2"
                keyboardType="email-address"
                TextContentType="emailAddress"
                borderColor={colors.primary}
                borderWidth={1}
                borderRadius={15}
              />
              <AppFromField
                width={'100%'}
                label="Option 3"
                placeholderTextColor={colors.placeHolderColor}
                placeholder="Enter option 3"
                autoCapitalize="none"
                autoCorrect={false}
                name="option3"
                borderColor={colors.primary}
                borderWidth={1}
                borderRadius={15}
              />
              <AppModalField
                label="Validity"
                name="Validity"
                style={styles.dropdown}
                placeholder="Select Number Of Days"
                placeholderStyle={{color: colors.primary}}
                open={poolNoOfDaysOpen}
                value={poolNoOfDaysValue}
                items={poolNoOfDaysItems}
                setOpen={setPoolNoOfDaysOpen}
                setValue={setPoolNoOfDaysValue}
                setItems={setPoolNoOfDaysItems}
                listMode="MODAL"
              />
              <SubmitButton
                loading={loading}
                title="POST"
                backgroundColor={colors.primary}
                padding={hp(1.6)}
                borderRadius={15}
              />
            </AppForm>
          </View>
          <View></View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};
export default AddUserPoll;
