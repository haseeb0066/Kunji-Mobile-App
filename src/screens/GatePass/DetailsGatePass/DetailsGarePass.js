import React, {useState} from 'react';
import {View, ImageBackground, ScrollView} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {backArrow} from '../../../assets/images/svg/SvgImages';

import images from '../../../assets/images/images';
import styles from './styles';
import Header from '../../../components/common/Header/Header';
import colors from '../../../assets/colors/colors';
import CommonText from '../../../utils/CommonText';
import CardItem from '../../../components/common/CardItem/CardItem';
import AppButton from '../../../components/common/AppButton';
import PopUpModal from '../../../components/common/PopUpModal/PopUpModal';
import CancelAnimation from '../../../assets/Animations/cancle.json';
import ViewDetailField from '../../../components/common/ViewDetailField/ViewDetailField';
import {END_POINTS} from '../../../server/URL';
import apiClient from '../../../Api/client';
import Toast from 'react-native-toast-message';
import moment from 'moment';

const DetailsGatePass = ({navigation}) => {
  const [popUpModalCancel, setPopUpModalCancel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [popUpModalMessage, setPopUpModalMessage] = useState('');

  const {params} = useRoute();
  const startDate = moment(params.start_date).format('YYYY-MM-DD');
  const endDate = moment(params.end_date).format('YYYY-MM-DD');

  const servantId = params.id;

  const removeGatePass = async () => {
    setLoading(true);
    const result = await apiClient.post(END_POINTS.deleteGatePass, {
      servant_gatepass_id: servantId,
    });
    // console.log('remove gate pass ===>', result);
    if (result.ok) {
      setLoading(false);
      setPopUpModalMessage(result.data?.message);
      setPopUpModalCancel(true);
    } else {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Required',
        text2: result.data.message,
      });
    }
  };

  return (
    <ImageBackground source={images.splash} style={styles.container}>
      {/* cancle modal */}
      <PopUpModal
        modalVisiblePopUp={popUpModalCancel}
        source={CancelAnimation}
        onPress={() => {
          setPopUpModalCancel(false);
          navigation.navigate('AddGatePass');
        }}
        messageText={popUpModalMessage}
        title="OK"
      />
      <View style={{flex: 0.5}}>
        <View style={styles.headerContainer}>
          <Header
            onLeftIconPress={() => {
              navigation.goBack();
            }}
            leftSvgIcon={backArrow(colors.WHITE)}
            title={CommonText.View_Gate_Pass_Details}
            textColor={'white'}
          />
        </View>
        <View style={styles.profileContainer}>
          <CardItem
            cardImageUri={params.servant?.profile_image}
            image={!params.servant?.profile_image && images.imagePlaceholder}
            cardHeading={params.servant?.first_name}
            cardText={params.servant?.last_name}
          />
        </View>
      </View>
      <ImageBackground
        source={images.formBG}
        imageStyle={styles.fromBGstyle}
        style={styles.formbackground}>
        <View style={styles.inputcontainer}>
          <View style={styles.inputContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <ViewDetailField
                Heading={'First Name'}
                Name={params.servant?.first_name}
              />
              <ViewDetailField
                Heading={'Last Name'}
                Name={params.servant?.last_name}
              />
              <ViewDetailField
                Heading={'Visitor Mobile No.'}
                Name={params.servant?.mobile}
              />
              <ViewDetailField Heading={'Valid From Date'} Name={startDate} />
              <ViewDetailField Heading={'Valid Till Date'} Name={endDate} />
              <AppButton
                title="OK"
                width="100%"
                onPress={() => navigation.navigate('AddGatePass')}
                borderRadius={15}
              />
              <AppButton
                title="REMOVE GATE PASS"
                width={'100%'}
                loading={loading}
                backgroundColor={colors.CancelButtonColor}
                borderRadius={15}
                onPress={removeGatePass}
              />
            </ScrollView>
          </View>
        </View>
      </ImageBackground>
    </ImageBackground>
  );
};
export default DetailsGatePass;
