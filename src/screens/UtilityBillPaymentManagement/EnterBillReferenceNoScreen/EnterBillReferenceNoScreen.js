import {StyleSheet, Text, View, ImageBackground, Platform} from 'react-native';
import React from 'react';
import images from '../../../assets/images/images';
import AppForm from '../../../components/common/FormComponents/AppForm';
import SubmitButton from '../../../components/common/FormComponents/SubmitButton';
import colors from '../../../assets/colors/colors';
import * as Yup from 'yup';
import {hp, wp} from '../../../utils/CommonMethods';
import Header from '../../../components/common/Header/Header';
import CommonText from '../../../utils/CommonText';
import {backArrow} from '../../../assets/images/svg/SvgImages';
import AppFromField from '../../../components/common/FormComponents/AppFormField';
import styles from './styles';
import Routes from '../../../navigation/Routes';

const validationSchema = Yup.object({
  referenceNumber: Yup.string().required('Reference Number is required field'),
});

const EnterBillReferenceNoScreen = ({navigation}) => {
  return (
    <ImageBackground style={{flex: 1}} source={images.appBackgroundLight}>
      <View style={{marginTop: Platform.OS === 'android' ? hp(1.8) : hp(0.5)}}>
        <Header
          title={CommonText.ELECTRICITY_SERVICE_PROVIDER}
          textColor={colors.primary}
          fontSize={hp(2)}
          leftSvgIcon={backArrow(colors.primary)}
          tintColor={colors.BLACK}
          onLeftIconPress={() => {
            navigation.goBack();
          }}
        />
      </View>
      <View style={styles.topHeaderTextContainer}>
        <Text style={styles.headerText}>Specify Bill Details</Text>
      </View>

      <View style={styles.inputContainer}>
        <AppForm
          initialValues={{referenceNumber: ''}}
          validationSchema={validationSchema}
          onSubmit={() => navigation.navigate(Routes.REVIEW_BILL_PAYMENT)}>
          <AppFromField
            label="Reference Number"
            width={wp(89)}
            // leftSvgIcon={UserIcon}

            placeholderTextColor={colors.placeHolderColor}
            // svgimageIconPath={emailIcon}
            placeholder="Enter Reference Number"
            autoCapitalize="none"
            autoCorrect={false}
            name="referenceNumber"
            keyboardType="numeric"
            borderWidth={1}
            borderColor={colors.RED_COLOR}
          />
          <View style={[styles.infoTextContainer, {}]}>
            <Text style={styles.infoText}>
              Enter 15 Digits LESCO Reference Number
            </Text>
          </View>
          <SubmitButton title={'GET BILL'} />
        </AppForm>
      </View>
    </ImageBackground>
  );
};

export default EnterBillReferenceNoScreen;
