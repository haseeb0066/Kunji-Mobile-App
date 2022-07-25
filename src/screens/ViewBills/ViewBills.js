import React from 'react';
import {View, ImageBackground, FlatList, Text} from 'react-native';
import styles from './styles';
import images from '../../assets/images/images';
import colors from '../../assets/colors/colors';
import {backArrow, PdfButtonIcon} from '../../assets/images/svg/SvgImages';
import {hp, wp} from '../../utils/CommonMethods';
import DigitalWalletCard from '../../components/common/DigitalWalletCard/DigitalWalletCard';
import Header from '../../components/common/Header/Header';
import AppButton from '../../components/common/AppButton';

const ViewBills = ({navigation}) => {
  const data = [
    {
      id: 1,
      name: 'Lesco',
      time: '12:25 PM',
      price: '2500',
      date: '24 March 2022',
    },
    {
      id: 2,
      name: 'Society',
      time: '12:45 PM',
      price: '2500',
      date: '24 March 2022',
    },
    {
      id: 3,
      name: 'Lesco',
      time: '12:25 PM',
      price: '2500',
      date: '24 March 2022',
    },
    {
      id: 4,
      name: 'Society',
      time: '12:45 PM',
      price: '2500',
      date: '24 March 2022',
    },
    {
      id: 5,
      name: 'Lesco',
      time: '12:25 PM',
      price: '2500',
      date: '24 March 2022',
    },
    {
      id: 6,
      name: 'Society',
      time: '12:45 PM',
      price: '2500',
      date: '24 March 2022',
    },
  ];
  return (
    <ImageBackground
      style={styles.container}
      source={images.appBackgroundLight}>
      <View style={styles.headerContainer}>
        <Header
          onLeftIconPress={() => {
            navigation.goBack();
          }}
          leftSvgIcon={backArrow(colors.primary)}
          title="View Bill"
          fontSize={hp(2.2)}
          textColor={colors.primary}
        />
        <View style={styles.buttonContainer}>
          <AppButton
            title="DOWNLOAD AS PDF"
            borderRadius={15}
            svgIcon={PdfButtonIcon}
          />
        </View>
      </View>
      <View>
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View style={styles.flatListView}>
              <Text style={styles.dateText}>{item.date}</Text>
              <DigitalWalletCard
                Heading={item.name}
                Info={item.time}
                Price={`Rs. ${item.price}`}
              />
            </View>
          )}
        />
      </View>
    </ImageBackground>
  );
};

export default ViewBills;
