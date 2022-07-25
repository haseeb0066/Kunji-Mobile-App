import React, {Component} from 'react';
import {
  ImageBackground,
  Text,
  View,
  FlatList,
  ScrollView,
  SectionList,
  SafeAreaView,
} from 'react-native';
import styles from './styles';
import images from '../../assets/images/images';
import Header from '../../components/common/Header/Header';
import colors from '../../assets/colors/colors';
import {hp, wp} from '../../utils/CommonMethods';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import HomeOptionCard from '../../components/common/HomeOptionCard/HomeOptionCard';
import {
  VisitorManagementIcon,
  delevieryBookingIcon,
  ExitEntryControlIcon,
  UtilityBillsIcon,
  RentPaymentIcon,
  SocietyChargesIcon,
  DigitalWalletIcon,
  PaymentHistoryIcon,
  ViewBillsIcon,
  complaintsIcon,
  servantRegisIcon,
  panicAlarm,
  noticesIcon,
  pollIcon,
} from '../../assets/images/svg/SvgImages';
import AppButton from '../../components/common/AppButton';
import useAuth from '../../Auth/useAuth';
import Screen from '../../components/common/Screen';
import Routes from '../../navigation/Routes';
import CommonText from '../../utils/CommonText';

const HomePage = ({navigation}) => {
  const sections = [
    {
      title: CommonText.RESIDENT_SERVICES,
      key: 'resident',
      data: [
        {
          list: [
            {
              id: 1,
              name: 'Visitors',
              svgIcon: VisitorManagementIcon,
              navigate: Routes.VISITOR_MANAGEMENT,
            },
            {
              id: 2,
              name: 'Delivery Booking',
              svgIcon: delevieryBookingIcon,
              navigate: 'AddDeliveryBooking',
            },
            {
              id: 3,
              name: 'Entry/Exit Control',
              svgIcon: ExitEntryControlIcon,
              navigate: 'AddExitControl',
            },
            {
              id: 4,
              name: 'Complaints',
              svgIcon: complaintsIcon,
              navigate: 'OpenCase',
            },
            {
              id: 5,
              name: CommonText.Domestic_Worker,
              svgIcon: servantRegisIcon,
              navigate: 'ServantMangement',
            },
            {
              id: 6,
              name: 'Panic Alarm',
              svgIcon: panicAlarm,
              navigate: Routes.PANIC_ALARAM_SCREEN,
            },
          ],
        },
      ],
    },

    {
      title: CommonText.PAYMENTS,
      key: 'payments',
      data: [
        {
          list: [
            {
              id: 1,
              name: 'Utility Bill Payment',
              svgIcon: UtilityBillsIcon,
              navigate: Routes.UTILITY_BILL_PAYMENT,
            },
            {
              id: 2,
              name: 'Rent Payment',
              svgIcon: RentPaymentIcon,
              navigate: Routes.RENT_PAYMENT_SCREEN,
            },
            {
              id: 3,
              name: 'Society Charges',
              svgIcon: SocietyChargesIcon,
              navigate: 'SocietyChargesNavigations',
            },
            {
              id: 4,
              name: 'Digital Wallet',
              svgIcon: DigitalWalletIcon,
              navigate: 'DigitalWalletDetails',
            },
            {
              id: 5,
              name: 'Payment History',
              svgIcon: PaymentHistoryIcon,
              navigate: 'PaymentHistory',
            },
            {
              id: 6,
              name: 'View Bills',
              svgIcon: ViewBillsIcon,
              navigate: 'ViewBills',
            },
          ],
        },
      ],
    },
    {
      title: CommonText.NOTICE_BOARD_POLL,
      key: 'notice',
      data: [
        {
          list: [
            {
              id: 1,
              name: CommonText.NOTICES,
              svgIcon: noticesIcon,
              navigate: 'NotificationScreen',
            },
            {id: 2, name: CommonText.POLL, svgIcon: pollIcon, navigate: 'Poll'},
          ],
        },
      ],
    },
  ];
  const renderSection = ({item}) => {
    return (
      <FlatList
        data={item.list}
        numColumns={3}
        renderItem={renderListItem}
        keyExtractor={keyExtractor}
      />
    );
  };
  const renderSectionHeader = ({section}) => {
    return (
      <View style={{paddingBottom: hp(0.5), paddingTop: hp(0.5)}}>
        <Text
          style={{
            fontSize: hp(2),
            color: '#2F5351',

            fontWeight: 'bold',
          }}>
          {section.title}
        </Text>
      </View>
    );
  };
  const renderListItem = ({item}) => {
    return (
      <View>
        <HomeOptionCard
          title={item.name}
          svgIcon={item.svgIcon}
          onPress={() => item.navigate && navigation.navigate(item.navigate)}
        />
      </View>
    );
  };

  const keyExtractor = item => {
    return item.name;
  };

  return (
    <Screen style={{backgroundColor: 'white'}}>
      <ImageBackground
        resizeMode={'stretch'}
        source={images.appBackgroundLight}
        style={styles.container}>
        <View style={styles.headerView}>
          <Header
            title={'Dashboard'}
            textColor={'#2F5351'}
            fontSize={hp(2.5)}
            rightIconOnePath={images.notification_bell_icon}
            rightIconSize={hp(3)}
            tintColor={colors.primaryTextColor}
            onRightIconPress={() => {
              navigation.navigate('NotificationScreen');
            }}
          />
        </View>

        <SectionList
          showsVerticalScrollIndicator={false}
          sections={sections}
          renderSectionHeader={renderSectionHeader}
          renderItem={renderSection}
          contentContainerStyle={{
            paddingBottom: hp(17),
            // backgroundColor: 'red',
          }}
        />
      </ImageBackground>
    </Screen>
  );
};
export default HomePage;
