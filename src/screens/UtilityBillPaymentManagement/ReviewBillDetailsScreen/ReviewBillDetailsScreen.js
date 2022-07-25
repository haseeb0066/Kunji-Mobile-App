import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import styles from './styles';
import Header from '../../../components/common/Header/Header';
import CommonText from '../../../utils/CommonText';
import colors from '../../../assets/colors/colors';
import images from '../../../assets/images/images';
import {hp, wp} from '../../../utils/CommonMethods';
import {
  backArrow,
  billingMonthIcon,
  debitcardIcon,
  dueDate,
  jazzCashIcon,
  payableAfterDateIcon,
  wallerIcon,
} from '../../../assets/images/svg/SvgImages';
import {Divider} from 'react-native-elements';
import BillListItem from '../../../components/common/BillListItem/BillListItem';
import HomeOptionCard from '../../../components/common/HomeOptionCard/HomeOptionCard';

const ReviewBillDetailsScreen = ({navigation}) => {
  return (
    <ImageBackground style={{flex: 1}} source={images.appBackgroundLight}>
      <View style={{marginTop: Platform.OS === 'android' ? hp(1.8) : hp(0.5)}}>
        <Header
          title={CommonText.REVIEW_BILL_PAYMENT}
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
        <Text style={styles.headerText}>Pay Bill</Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.headerText}>Pay Amount</Text>
        <View style={styles.ammountContainer}>
          <Text style={styles.amountText}>Rs. 500</Text>
        </View>
        <View style={{marginTop: '2%'}}>
          <Divider />
        </View>
        <View style={{marginTop: '2%', marginLeft: '2%'}}>
          <Text style={styles.headerText}>To.</Text>
        </View>
        <View>
          <BillListItem
            title={'IESCO'}
            subTitle={'1231231231'}
            image={images.carimag}
          />
        </View>
        <View style={{}}>
          <BillListItem
            title={'Due Date'}
            subTitle={'10/03/2022'}
            svgIcon={dueDate}
          />
        </View>
        <View style={{}}>
          <BillListItem
            title={'Billing Month'}
            subTitle={'March'}
            svgIcon={billingMonthIcon}
          />
        </View>
        <View style={{}}>
          <BillListItem
            title={'Payable After Due Date'}
            subTitle={'Rs. 550.00'}
            svgIcon={payableAfterDateIcon}
          />
        </View>
        <View style={{marginTop: '2%'}}>
          <Divider />
        </View>
        <View style={{marginTop: '2%', marginLeft: '2%'}}>
          <Text style={styles.paymentMethoText}>{'Payment Method'}</Text>
        </View>

        <View
          style={{flexDirection: 'row', alignSelf: 'center', marginTop: hp(2)}}>
          <HomeOptionCard
            onPress={() => {
              navigation.navigate('CreditDebitCardScreen');
            }}
            title={'Cradit/Dabit Card'}
            svgIcon={debitcardIcon}
          />
          <HomeOptionCard
            onPress={() => {
              navigation.navigate('JazzCashPaymentScreen');
            }}
            title={'Jazz Cash'}
            svgIcon={jazzCashIcon}
          />
          <HomeOptionCard
            onPress={() => {
              navigation.navigate('Wallet');
            }}
            title={'Wallet'}
            svgIcon={wallerIcon}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

export default ReviewBillDetailsScreen;
