import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Platform,
  ActivityIndicator,
} from 'react-native';

import colors from '../../assets/colors/colors';
import fontFamily from '../../assets/fonts/fontFamily';
import fonts from '../../assets/fonts/fonts';
import {wp, hp} from '../../utils/CommonMethods';
import SvgComponent from './SvgCustomComponents/SvgCustomComponents';

function AppButton({
  marginTop,
  title,
  backgroundColor = colors.primary,
  onPress,
  navigation,
  titleColor = colors.WHITE,
  loading = false,
  disabled = false,
  borderColor,
  IconName,
  width = wp(90),
  svgIcon,
  fontWeight = 'bold',
  borderWidth,
  borderRadius = 10,
  height,
  padding = Platform.OS === 'android' ? hp(2) : hp(1.7),
  buttonContainerProps,
  textStyleProps,
}) {
  let text = {
    fontSize: fonts.H8,
    //textTransform: "capitalize",
    fontWeight: 'bold',
    color: titleColor,
    marginLeft: svgIcon ? '2%' : 0,
  };
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[
        styles.button,
        {
          backgroundColor: backgroundColor,
          marginTop: marginTop,
          borderColor: borderColor,
          width: width,
          borderWidth: borderWidth,
          borderColor: borderColor,
          borderRadius: borderRadius,
          height: height,
          padding: padding,
        },
        {...buttonContainerProps},
      ]}
      onPress={onPress}>
      {loading ? (
        <ActivityIndicator
          size={'small'}
          animating={loading}
          color={colors.WHITE}
        />
      ) : (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {svgIcon && <SvgComponent svgMarkup={svgIcon} />}
          <Text style={[text, {...textStyleProps}]}>{title}</Text>
          {/* {IconName && <Icon name={IconName} size={25} />} */}
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Platform.OS === 'android' ? hp(1.7) : hp(10),

    marginVertical: hp(1.2),
    alignSelf: 'center',
  },
});

export default AppButton;
