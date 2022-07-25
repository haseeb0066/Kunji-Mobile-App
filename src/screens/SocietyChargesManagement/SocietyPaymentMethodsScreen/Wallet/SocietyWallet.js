import {
  StyleSheet,
  Text,
  ImageBackground,
  View,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import * as Yup from 'yup';
import AppForm from '../../../../components/common/FormComponents/AppForm';
import AppFromField from '../../../../components/common/FormComponents/AppFormField';
import {wp, hp} from '../../../../utils/CommonMethods';
import colors from '../../../../assets/colors/colors';
import Header from '../../../../components/common/Header/Header';
import images from '../../../../assets/images/images';
import SubmitButton from '../../../../components/common/FormComponents/SubmitButton';
import {backArrow} from '../../../../assets/images/svg/SvgImages';

const SocietyWallet = ({navigation}) => {
  const Submit = async values => {
    let body = new FormData();
  };

  const validationSchema = Yup.object({
    digitalpin: Yup.string()
      // .digitalpin('Please Enter Sender Account Number')
      .required('Pin Number is required field'),
    narration: Yup.string().required('Narration is required field'),
    amount: Yup.string().required('Amount is required field'),
  });

  return (
    <ImageBackground
      resizeMode={'stretch'}
      source={images.appBackgroundLight}
      style={styles.container}>
      <View style={styles.inputContainer}>
        <View style={styles.headerView}>
          <Header
            title={'Digital Wallet'}
            leftSvgIcon={backArrow(colors.primary)}
            textColor={colors.primaryTextColor}
            tintColor={colors.primaryTextColor}
            onLeftIconPress={() => {
              navigation.goBack();
            }}
          />
        </View>

        <AppForm
          initialValues={{
            digitalpin: '',
            narration: '',
            amount: '',
          }}
          validationSchema={validationSchema}
          onSubmit={Submit}>
          <View style={{alignItems: 'center'}}>
            <AppFromField
              label="Digital Wallet Pin"
              width={wp(90)}
              placeholderTextColor={colors.placeHolderColor}
              placeholder="4567"
              name="digitalpin"
              borderWidth={1.3}
              borderColor={colors.RED_COLOR}
            />

            <AppFromField
              label="Narration"
              width={wp(90)}
              placeholderTextColor={colors.placeHolderColor}
              placeholder="*******"
              name="narration"
              borderWidth={1.3}
              borderColor={colors.RED_COLOR}
            />

            <AppFromField
              label="Amount"
              width={wp(90)}
              placeholderTextColor={colors.placeHolderColor}
              placeholder="35600"
              name="amount"
              borderWidth={1.3}
              borderColor={colors.RED_COLOR}
            />
          </View>

          <View style={{marginTop: hp(2)}}>
            <SubmitButton title={'PAY NOW'}  />
          </View>
        </AppForm>
      </View>
    </ImageBackground>
  );
};

export default SocietyWallet;

const styles = StyleSheet.create({
  headerView: {
    width: '100%', 
        alignItems: 'center',
        marginTop: Platform.OS === 'android' ? hp(1.8) : hp(0.5),
    paddingBottom: hp(4),
  },
  container: {
    flex: 1,
  },
});
