import {StyleSheet} from 'react-native';
import {hp, wp} from '../../../utils/CommonMethods';
import colors from '../../../assets/colors/colors';
import fontFamily from '../../../assets/fonts/fontFamily';
import fonts from '../../../assets/fonts/fonts';
const styles = StyleSheet.create({
  container: {
    width: wp(25),
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
  },

  imageStyle: {
    // width: wp(25),
    // height: hp(12),
    width: wp(17),
    height: wp(17),
    borderRadius: 50,
   // backgroundColor: 'red',
  },
  heading: {
    color: colors.WHITE,
    // fontWeight: 'bold',
    fontSize: fonts.H10,
    textAlign: 'center',
    marginTop: hp(0.9),
  },
  infoText: {
    color: colors.WHITE,
    textAlign: 'center',
    fontSize: hp(1),
    // opacity: 0.7,
    marginTop: hp(0.3),
    // marginVertical: hp(0.7),
  },
  subInfo: {
    color: colors.WHITE,
    textAlign: 'center',
    fontSize: hp(1),
    // opacity: 0.7,
  },
});

export default styles;
