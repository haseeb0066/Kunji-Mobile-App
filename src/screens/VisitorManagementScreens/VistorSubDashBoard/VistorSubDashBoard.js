import {View, Text, FlatList, Platform, ImageBackground} from 'react-native';
import React from 'react';
import {
  backArrow,
  VisitorManagement2Icon,
  BookVistorParkingIcon,
} from '../../../assets/images/svg/SvgImages';
import HomeOptionCard from '../../../components/common/HomeOptionCard/HomeOptionCard';
import styles from './styles';

import colors from '../../../assets/colors/colors';
import {hp, wp} from '../../../utils/CommonMethods';
import images from '../../../assets/images/images';
import Screen from '../../../components/common/Screen';
import Header from '../../../components/common/Header/Header';
import Routes from '../../../navigation/Routes';
import CommonText from '../../../utils/CommonText';

const VistorSubDashBoard = ({navigation}) => {
  const visiterSubDashBoardData = [
    {
      id: 1,
      name:CommonText.VISITOR_REGISTRATION,
      navigate: 'AddVisitor',
      svgIcon: VisitorManagement2Icon,
    },
    {
      id: 2,
      name: 'Book Visitor Parking',
      navigate: 'VisitorCarParking',
      svgIcon: BookVistorParkingIcon,
    },
  ];
  return (
    <ImageBackground source={images.appBackgroundLight} style={{flex: 1}}>
      <Screen style={{flex: 1}}>
        <View
          style={{marginTop: Platform.OS === 'android' ? hp(1.5) : hp(0.5)}}>
          <Header
            title={Routes.Visitor_Management}
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
            alignItems: 'flex-start',
            marginTop: hp(3),
            flex: 1,
            marginLeft: wp(4),
          }}>
          <FlatList
            data={visiterSubDashBoardData}
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

export default VistorSubDashBoard;
