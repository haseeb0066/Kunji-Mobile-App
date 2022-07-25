import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React from 'react';
import images from '../../../assets/images/images';
import SvgComponent from '../SvgCustomComponents/SvgCustomComponents';
import {ArrowDownIcon, VisitorIcon} from '../../../assets/images/svg/SvgImages';
import colors from '../../../assets/colors/colors';
import {hp, wp} from '../../../utils/CommonMethods';

const HomeOptionCard = ({
  svgIcon,
  title,
  onPress,
  cardbgImg = images.home_card_bg_img,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <ImageBackground
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          height: Platform.OS === 'android' ? hp(14.8) : hp(13.5),
          width: Platform.OS === 'android' ? hp(14.8) : hp(13.5),
        }}
        source={cardbgImg}>
        <SvgComponent svgMarkup={svgIcon} />

        <Text style={styles.text}>{title}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default HomeOptionCard;
const styles = StyleSheet.create({
  text: {
    fontSize: hp(1.2),
    fontWeight: '700',
    color: colors.WHITE,

    width: wp(18),
    textAlign: 'center',
    marginTop: hp(1.4),
  },
});
