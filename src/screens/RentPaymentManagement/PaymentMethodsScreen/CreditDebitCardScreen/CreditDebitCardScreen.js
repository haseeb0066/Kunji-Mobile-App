import {Text, ImageBackground, View} from 'react-native';
import React from 'react';
import Screen from '../../../../components/common/Screen';
import styles from './styles';
import images from '../../../../assets/images/images';
import LottieView from 'lottie-react-native';
import commingSoon from '../../../../assets/Animations/comming_soon.json';
import {hp, wp} from '../../../../utils/CommonMethods';
import Header from '../../../../components/common/Header/Header';
import colors from '../../../../assets/colors/colors';
import {backArrow} from '../../../../assets/images/svg/SvgImages';

const CreditDebitCardScreen = ({navigation}) => {
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
        />
      </View>
      <View style={styles.commingSoon}>
        <LottieView
          source={commingSoon}
          autoPlay
          loop
          style={styles.lottieStyle}
        />
      </View>
    </ImageBackground>
  );
};

export default CreditDebitCardScreen;
