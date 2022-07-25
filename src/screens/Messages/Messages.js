import React from 'react';
import {ImageBackground} from 'react-native';
import images from '../../assets/images/images';
import {hp, wp} from '../../utils/CommonMethods';
import styles from './styles';
import commingSoon from '../../assets/Animations/comming_soon.json';
import LottieView from 'lottie-react-native';
const Messages = () => {
  return (
    <ImageBackground
      style={styles.container}
      source={images.appBackgroundLight}>
      <LottieView
        source={commingSoon}
        autoPlay
        loop
        style={{height: hp(30), width: wp(90), marginBottom: hp(10)}}
      />
    </ImageBackground>
  );
};
export default Messages;
