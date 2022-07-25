import colors from '../../../assets/colors/colors';
import {StyleSheet, Platform} from 'react-native';
import {hp, wp} from '../../../utils/CommonMethods';
import fonts from '../../../assets/fonts/fonts';
import fontFamily from '../../../assets/fonts/fontFamily';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(10),
    marginBottom: hp(2),
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: hp(2),
    marginTop: hp(10),
    marginBottom: hp(6),
  },
  phoneFieldContainer: {
    width: wp(89),
    borderRadius: 10,
    marginTop: '2.5%',
    marginBottom: '2%',
    borderColor: 'red',
    borderWidth: 1,
    // height: hp(4),
    // marginVertical: -20,
  },
  phoneNoTextCon: {
    paddingVertical: Platform.OS === 'android' ? hp(0.15) : hp(1.4),
    justifyContent: 'center',
    borderRadius: 10,
  },
  phoneNoInputcon: {
    paddingVertical: Platform.OS === 'android' ? hp(1.15) : hp(0.15),
  },
  codeTextStyle: {
    paddingVertical: Platform.OS === 'android' ? hp(0.15) : hp(0.15),
  },
  logoStyles: {
    height: hp(17),
    width: hp(17),
    resizeMode: 'contain',
    marginTop: hp(4),
  },
  contentContainer: {
    alignItems: 'center',
  },

  mainContainer: {
    width: wp('90%'),
  },
  headingContainer: {
    paddingLeft: wp(2),
    justifyContent: 'flex-end',
    paddingTop: hp(2),
    marginBottom: hp(3),
  },
  inputContainer: {
    alignItems: 'center',
    marginTop: hp(2),
  },
  labelContainer: {
    width: '100%',
    marginTop: hp(3),
  },
  buttonContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: hp(5),
    paddingBottom: hp(2.6),
  },
  headingStyle: {
    fontSize: fonts.H5,
    color: colors.WHITE,
    fontFamily: fontFamily.Mulish_Bold,
  },
  textStylecCreateAc: {
    fontSize: fonts.H6,
    color: colors.WHITE,
    fontFamily: fontFamily.Mulish_Regular,
  },
  textStyle: {
    fontSize: fonts.H6,
    color: colors.INPUT_PLACE_HOLDER_TEXT_COLOR,
    fontFamily: fontFamily.Mulish_Regular,
  },
  textStyleEmail: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.WHITE,
    fontFamily: fontFamily.Mulish_Regular,
  },
  bottomTextContainer: {
    flexDirection: 'row',
    marginTop: hp(2),
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginBottom: hp(5),
  },
  errorContainer: {
    marginTop: 3,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
    flexDirection: 'row',
  },
});

export default styles;
