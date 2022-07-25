import {View, Text, FlatList, Platform, ImageBackground} from 'react-native';
import React from 'react';
import {
  backArrow,
  VisitorManagement2Icon,
  BookVistorParkingIcon,
  ElectricityIcon,
  gassIcon,
  BroadbandIcon,
} from '../../assets/images/svg/SvgImages';
HomeOptionCard;

import CommonText from '../../utils/CommonText';
import HomeOptionCard from '../../components/common/HomeOptionCard/HomeOptionCard';
import images from '../../assets/images/images';
import Header from '../../components/common/Header/Header';

import {hp, wp} from '../../utils/CommonMethods';
import Routes from '../../navigation/Routes';
import Screen from '../../components/common/Screen';
import colors from '../../assets/colors/colors';

const UtilityBillPaymentSubDashBoard = ({navigation}) => {
  const billSubDashBoardData = [
    {
      id: 1,
      name: 'Electricity',
      navigate: Routes.ELECTRICITY_SERVICE_PROVIDER,
      svgIcon: ElectricityIcon,
    },
    {
      id: 2,
      name: 'Gas',
      navigate: '',
      svgIcon: gassIcon,
    },
    {
      id: 3,
      name: 'Broadband',
      navigate: '',
      svgIcon: BroadbandIcon,
    },
  ];
  return (
    <ImageBackground source={images.appBackgroundLight} style={{flex: 1}}>
      <Screen style={{flex: 1}}>
        <View
          style={{marginTop: Platform.OS === 'android' ? hp(1.5) : hp(0.5)}}>
          <Header
            title={CommonText.UTILITY_BILL_PAYMENT}
            textColor={colors.primary}
            fontSize={hp(2.5)}
            leftSvgIcon={backArrow(colors.primary)}
            tintColor={colors.BLACK}
            onLeftIconPress={() => {
              navigation.goBack();
            }}
          />
        </View>

        <View
          style={{
            marginTop: hp(3),
            flex: 1,
            alignItems: 'center',
          }}>
          <FlatList
            data={billSubDashBoardData}
            keyExtractor={item => item.toString()}
            numColumns={3}
            renderItem={({item}) => (
              <HomeOptionCard
                title={item.name}
                svgIcon={item.svgIcon}
                onPress={() => navigation.navigate(item.navigate)}
              />
            )}
          />
        </View>
      </Screen>
    </ImageBackground>
  );
};

export default UtilityBillPaymentSubDashBoard;
