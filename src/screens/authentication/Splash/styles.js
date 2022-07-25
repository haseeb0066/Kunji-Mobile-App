import {StyleSheet, Dimensions, Platform} from 'react-native';
const {width, height} = Dimensions.get('window');
import {hp, wp} from '../../../utils/CommonMethods';
import fonts from '../../../assets/fonts/fonts';
import colors from '../../../assets/colors/colors';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgVideo: {
    height: height,
    position: 'absolute',
    top: 0,
    left: 0,
    alignItems: 'stretch',
    bottom: 0,
    right: 0,
    opacity: 0.5,
  },
  skipContainer: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginHorizontal: 26,
  },
  logoContainer: {
    flex: 0.8,
    alignItems: 'center',
  },
  skipText: {
    color: colors.primaryTextColor,
    ...Platform.select({
      ios: {
        fontSize: fonts.H6,
      },
      android: {
        fontSize: fonts.H7,
        marginBottom: hp(8),
      },
    }),
  },
});

export default styles;
