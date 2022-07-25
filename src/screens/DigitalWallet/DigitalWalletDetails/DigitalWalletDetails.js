import React from 'react';
import {View, ImageBackground, FlatList} from 'react-native';
import styles from './styles';
import images from '../../../assets/images/images';
import Header from '../../../components/common/Header/Header';
import colors from '../../../assets/colors/colors';
import {backArrow} from '../../../assets/images/svg/SvgImages';
import {wp, hp} from '../../../utils/CommonMethods';
import DigitalWalletCard from '../../../components/common/DigitalWalletCard/DigitalWalletCard';
import AppButton from '../../../components/common/AppButton';

const DigitalWalletDetails = ({navigation}) => {
  const data = [
    {
      id: 1,
      name: 'Wallet 1',
      message: 'xxxxx',
    },
    {
      id: 2,
      name: 'Wallet 2',
      message: 'xxxxx',
    },
  ];
  return (
    <ImageBackground
      source={images.appBackgroundLight}
      style={styles.container}>
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
      </View>
      <View style={styles.flatListContainer}>
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View style={styles.flatListView}>
              <DigitalWalletCard Heading={item.name} Info={item.message} />
            </View>
          )}
        />
      </View>
      <View style={styles.buttonContainer}>
        <AppButton
          title="ADD NEW DIGITAL WALLET"
          onPress={() => navigation.navigate('AddDigitalWallet')}
          borderRadius={15}
        />
      </View>
    </ImageBackground>
  );
};

export default DigitalWalletDetails;
