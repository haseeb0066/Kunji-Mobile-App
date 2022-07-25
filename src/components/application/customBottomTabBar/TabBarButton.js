import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import colors from '../../../assets/colors/colors';
import {
  heartIcon,
  homeIcon,
  ProfileIcon,
} from '../../../assets/images/svg/SvgImages';
import SvgComponent from '../../common/SvgCustomComponents/SvgCustomComponents';

export default function TabBarButton({isFocused}) {
  return (
    <View style={styles.container}>
      {/* <Text style={styles.text}>+</Text> */}
      <SvgComponent
        svgMarkup={homeIcon(isFocused ? 'white' : colors.secondary)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 55,
    height: 55,
    borderRadius: 999,
    bottom: 33,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
  text: {
    fontSize: 40,
    color: 'white',
  },
});
