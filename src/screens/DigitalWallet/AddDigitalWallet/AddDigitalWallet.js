import React, {useState} from 'react';
import {View, ImageBackground, ScrollView} from 'react-native';
import styles from './styles';
import * as Yup from 'yup';
import images from '../../../assets/images/images';
import Header from '../../../components/common/Header/Header';
import colors from '../../../assets/colors/colors';
import {backArrow} from '../../../assets/images/svg/SvgImages';
import {wp, hp} from '../../../utils/CommonMethods';
import SubmitButton from '../../../components/common/FormComponents/SubmitButton';
import AppForm from '../../../components/common/FormComponents/AppForm';
import AppFromField from '../../../components/common/FormComponents/AppFormField';
import PopUpModal from '../../../components/common/PopUpModal/PopUpModal';
import SuccessAnimation from '../../../assets/Animations/success.json';

const AddDigitalWallet = ({navigation}) => {
  const [popUpModalVisible, setPopUpModalVisible] = useState(false);
  const initialValues = {
    digitalWalletPin: '',
    narration: '',
    amount: '',
  };
  const validationSchema = Yup.object({
    digitalWalletPin: Yup.string().required(
      'Digital wallet pin is required field',
    ),
    narration: Yup.string().required('Narration is required field'),
    amount: Yup.string().required('Amount is required field'),
  });
  return (
    <ImageBackground
      source={images.appBackgroundLight}
      style={styles.container}>
      <PopUpModal
        modalVisiblePopUp={popUpModalVisible}
        source={SuccessAnimation}
        onPress={() => {
          setPopUpModalVisible(false);
        }}
        messageText={'Added Digital Wallet Successfully!'}
        title="OK"
      />
      <View style={styles.headerContainer}>
        <Header
          onLeftIconPress={() => {
            navigation.goBack();
          }}
          leftSvgIcon={backArrow(colors.primary)}
          title="Digital Wallet"
          fontSize={hp(2.2)}
          textColor={colors.primary}
        />
        <ScrollView>
          <View style={styles.inputContainer}>
            <AppForm
              initialValues={initialValues}
              validationSchema={validationSchema}>
              <AppFromField
                label="Digital Wallet Pin"
                width={'100%'}
                placeholderTextColor={colors.placeHolderColor}
                placeholder="Digital Wallet Pin"
                autoCapitalize="none"
                autoCorrect={false}
                name="digitalWalletPin"
                keyboardType="email-address"
                TextContentType="emailAddress"
                borderColor={colors.primary}
                borderWidth={1}
                borderRadius={15}
              />
              <AppFromField
                label="Narration"
                width={'100%'}
                placeholderTextColor={colors.placeHolderColor}
                placeholder="********"
                autoCapitalize="none"
                autoCorrect={false}
                name="narration"
                keyboardType="email-address"
                TextContentType="emailAddress"
                borderColor={colors.primary}
                borderWidth={1}
                borderRadius={15}
              />
              <AppFromField
                label="Amount"
                width={'100%'}
                placeholderTextColor={colors.placeHolderColor}
                placeholder="Enter Amount"
                autoCapitalize="none"
                autoCorrect={false}
                name="amount"
                keyboardType="numeric"
                TextContentType="emailAddress"
                borderColor={colors.primary}
                borderWidth={1}
                borderRadius={15}
              />
              <SubmitButton
                title="ADD DIGITAL WALLET"
                // onPress={() => setPopUpModalVisible(true)}
                borderRadius={15}
              />
            </AppForm>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default AddDigitalWallet;
