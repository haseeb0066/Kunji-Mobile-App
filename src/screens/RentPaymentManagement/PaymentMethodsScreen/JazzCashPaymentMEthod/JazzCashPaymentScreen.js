import {StyleSheet, View, ImageBackground} from 'react-native';
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
const JazzCashPaymentScreen = ({navigation}) => {
  const Submit = async values => {
    let body = new FormData();
  };

  const validationSchema = Yup.object({
    senderAccountNumber: Yup.string()
      // .senderAccountNumber('Please Enter Sender Account Number')
      .required('Account Number is required field'),
    ReceiverNumber: Yup.string().required('Receiver Number is required field'),
    ammountToBePaid: Yup.string().required('Amount is required field'),
  });

  return (
    // <Screen>
    <ImageBackground
      resizeMode={'stretch'}
      source={images.appBackgroundLight}
      style={styles.container}>
      <View style={styles.inputContainer}>
        <View style={styles.headerView}>
          <Header
            title={'Jazz Cash'}
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
            senderAccountNumber: '',
            ReceiverNumber: '',
            ammountToBePaid: '',
          }}
          validationSchema={validationSchema}
          onSubmit={Submit}>
          <View style={{alignItems: 'center'}}>
            <AppFromField
              label="Sender Account Number"
              width={wp(90)}
              placeholderTextColor={colors.placeHolderColor}
              placeholder="03001234567"
              name="senderAccountNumber"
              borderWidth={1.3}
              borderColor={colors.RED_COLOR}
            />

            <AppFromField
              label="Receiver Account Number"
              width={wp(90)}
              placeholderTextColor={colors.placeHolderColor}
              placeholder="03007654321"
              name="ReceiverNumber"
              borderWidth={1.3}
              borderColor={colors.RED_COLOR}
            />

            <AppFromField
              label="Amount To Be PAid"
              width={wp(90)}
              placeholderTextColor={colors.placeHolderColor}
              placeholder="356800"
              name="ammountToBePaid"
              borderWidth={1.3}
              borderColor={colors.RED_COLOR}
            />
          </View>

          <View style={{marginTop: hp(2)}}>
            <SubmitButton title={'PAY NOW'} />
          </View>
        </AppForm>
      </View>

      {/* </Screen> */}
    </ImageBackground>
  );
};

export default JazzCashPaymentScreen;

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
