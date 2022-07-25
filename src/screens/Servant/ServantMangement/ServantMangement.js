import {View, FlatList, Platform, ImageBackground} from 'react-native';
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
import CommonText from '../../../utils/CommonText';

const ServantMangement = ({navigation}) => {
  const servantBoardData = [
    {
      id: 1,
      name: 'Register Worker',
      navigate: 'ServantRegistration',
      svgIcon: VisitorManagement2Icon,
    },
    {
      id: 2,
      name: 'Gate Pass',
      navigate: 'AddGatePass',
      svgIcon: BookVistorParkingIcon,
    },
  ];
  return (
    <ImageBackground
      source={images.appBackgroundLight}
      style={styles.container}>
      <Screen style={styles.container}>
        <View style={styles.headerContainer}>
          <Header
            title={CommonText.Domestic_Worker}
            textColor={colors.primary}
            fontSize={hp(2.5)}
            leftSvgIcon={backArrow(colors.primary)}
            tintColor={colors.BLACK}
            onLeftIconPress={() => {
              navigation.goBack();
            }}
          />
        </View>

        <View style={styles.flatListContainer}>
          <FlatList
            data={servantBoardData}
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

export default ServantMangement;
