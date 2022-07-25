import {View} from 'react-native';
import React from 'react';
import loader2 from '../../assets/Animations/lorder3.json';
import LottieView from 'lottie-react-native';
import {hp} from '../../utils/CommonMethods';

const CustomActivityIndicator = ({loading}) => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
      }}>
      {loading && (
        <LottieView
          source={loader2}
          autoPlay
          loop
          style={{
            height: hp(30),
            backgroundColor: 'transparent',
          }}
        />
      )}
    </View>
  );
};

export default CustomActivityIndicator;
