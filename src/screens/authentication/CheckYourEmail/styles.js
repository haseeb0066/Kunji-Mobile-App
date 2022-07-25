import colors from '../../../assets/colors/colors';
import {StyleSheet} from 'react-native';
import {hp, wp} from '../../../utils/CommonMethods';
import fonts from '../../../assets/fonts/fonts';
import fontFamily from '../../../assets/fonts/fontFamily';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flex: 0.08,
    paddingLeft: wp(2),
  },
  logoContainer: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoStyles: {
    height: hp(15),
    width: hp(15),
    resizeMode: 'contain',
  },
  contentContainer: {
    flex: 0.72,
    borderTopLeftRadius: hp(5),
    borderTopRightRadius: hp(5),
    backgroundColor: colors.WHITE,
  },

  mainContainer: {
    flex: 1,
    padding: hp(4),
  },
  headingContainer: {
    flex: 0.25,
    // borderWidth:1
  },
  buttonContainer: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textView3: {
    width: wp('100%'),
    alignItems: 'center',
    marginTop: hp(1),
  },
  textStyle2: {
    fontSize: fonts.H6,
    fontFamily: fontFamily.Mulish_Regular,
    color: colors.DEEP_PURPLE,
  },
  labelContainer: {
    width: '100%',
    marginTop: hp(1.7),
    // paddingLeft:hp(1),
  },
  textContainer: {
    flex: 0.35,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  textStyle4: {
    fontFamily: fontFamily.Mulish_Regular,
    fontSize:fonts.H9
  },
  headingStyle: {
    fontSize: fonts.H2,
    color: colors.BUTTON_COLOR,
    fontFamily: fontFamily.Mulish_Bold,
  },
  textStyleEmail: {
    fontSize: fonts.H7,
    color: colors.BLACK,
    fontFamily: fontFamily.Mulish_Regular,
  },
  textStyle: {
    fontSize: fonts.H6,
    color: colors.INPUT_PLACE_HOLDER_TEXT_COLOR,
    fontFamily: fontFamily.Mulish_Regular,
  },
  bottomTextContainer: {
    flexDirection: 'row',
  },
});

export default styles;
