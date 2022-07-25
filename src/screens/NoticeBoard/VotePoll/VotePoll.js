import React, {useState, useEffect} from 'react';
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

import {RadioGroup} from 'react-native-radio-buttons-group';

import PopUpModal from '../../../components/common/PopUpModal/PopUpModal';
import SuccessAnimation from '../../../assets/Animations/success.json';

import {END_POINTS} from '../../../server/URL';
import apiClient from '../../../Api/client';
import SubmitButton from '../../../components/common/FormComponents/SubmitButton';
import Toast from 'react-native-toast-message';
const VotePoll = ({navigation, route}) => {
  const {poolData} = route.params;
  

  const [loading, setLoading] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const [popUpModalVisible, setPopUpModalVisible] = useState(false);

  function onPressRadioButton(radioButtonsArray) {
    console.log('asd', radioButtonsArray);
    setSelectedradioButton(
      radioButtonsArray.filter(btn => btn.selected === true)[0],
    );
    setRadioButtons(radioButtonsArray);
  }
  const radioButtonsData = [];
  const [radioButtons, setRadioButtons] = useState([]);
  const [selectedradioButton, setSelectedradioButton] = useState(
    radioButtonsData[0],
  );
  const initialValues = {
    AdditionalComment: '',
  };
  const validationSchema = Yup.object({
    // AdditionalComment: Yup.string().required('Comment is required field'),
  });
  const [poolQuestionData, setPoolQuestionData] = useState([]);
  const getPollList = async () => {
    // setLoading(true);
    const poolListResult = await apiClient.get(
      END_POINTS.getPoolQuestionOptions + `?poll_id=${poolData.id}`,
    );
    console.log(poolListResult.data);
    let question = [];
    if (poolListResult.ok) {
      setPoolQuestionData(poolListResult.data);
      poolListResult.data.get_poll_question.forEach((opt, index) => {
        question.push({
          id: opt.id,
          label: opt.options,
          value: opt.id,
          labelStyle: {color: colors.primary},
          color: colors.primary,
          borderColor: colors.primary,
          selected: index == 0 && true,
          size: 16,
        });
      });
      setRadioButtons(question);
      setSelectedradioButton(question[0]);
    }
  };

  const submitVotePoll = async ({AdditionalComment}) => {
    console.log(selectedradioButton.id);
    setLoading(true);
    const castVoteResult = await apiClient.post(END_POINTS.castVote, {
      poll_id: poolData.id,
      poll_option_id: selectedradioButton.id,
      adtional_comment: AdditionalComment,
    });
    if (castVoteResult.ok) {
      setLoading(false);
      if (castVoteResult.data?.success) {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: castVoteResult.data?.message,
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Failed',
          text2: castVoteResult.data?.message,
        });
      }

      console.log('sccuess', castVoteResult.data);
    } else {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Failed',
        text2: castVoteResult.data?.message,
      });
    }
  };
  useEffect(() => {
    getPollList();
  }, []);
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
          title={'Poll'}
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
          <View style={styles.checkboxcontianer}>
            <View style={styles.headingcontianer}>
              <Text style={styles.headingstyle}>{poolData.question}</Text>
            </View>
            <RadioGroup
              radioButtons={radioButtons}
              onPress={onPressRadioButton}
              layout="column"
              containerStyle={styles.RadioButtonContainer}
            />
          </View>
          <Text style={styles.textstyle}>{'Additional Comment'}</Text>
          <View style={styles.commentstyle}>
            <AppForm
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={submitVotePoll}>
              <AppFromField
                width={'100%'}
                placeholderTextColor={colors.placeHolderColor}
                placeholder="Enter Text"
                autoCapitalize="none"
                autoCorrect={false}
                name="AdditionalComment"
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
                minHeight={Platform.OS === 'ios' ? hp(11) : hp(16)}
                multiline={true}
                textAlignVertical="top"
              />
              <SubmitButton
                title="POST"
                backgroundColor={colors.primary}
                padding={hp(1.6)}
                borderRadius={15}
              />
            </AppForm>
          </View>
          <View>
            <AppButton
              title="VIEW RESULTS"
              backgroundColor={colors.WHITE}
              titleColor={colors.primary}
              borderColor={colors.primary}
              padding={hp(1.6)}
              borderRadius={15}
              borderWidth={1}
              loading={loading}
              onPress={() =>
                navigation.navigate('View Pool Result', {pollId: poolData.id})
              }
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};
export default VotePoll;
