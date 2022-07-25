import colors from '../../assets/colors/colors';
import {StyleSheet, Platform} from 'react-native';
import {hp, wp} from '../../utils/CommonMethods';
import fonts from '../../assets/fonts/fonts';
import fontFamily from '../../assets/fonts/fontFamily';

const styles = StyleSheet.create({
  headerContainer: {
    marginHorizontal: hp(0.5),
    ...Platform.select({
      ios: {
        paddingTop: hp(1),
        // paddingBottom: hp(2),
      },
      android: {
        paddingTop: hp(1),
        // paddingBottom: hp(2),
      },
    }),
  },
  headerText: {
    fontSize: fonts.H3,
    fontWeight: '700',
    color: colors.WHITE,
  },
  termsDetails: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 20,
  },
  subHeaderText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.BLACK,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  termsSubHeaderContainer: {
    marginTop: '1%',
    marginBottom: '4%',
  },
  topHeaderTextContainer: {
    //marginTop: '2%',
    marginBottom: '3%',
    marginLeft: '4%',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: hp(2),
    marginTop: hp(3),
    marginBottom: hp(2),
  },
  mainTermsAndCondtionContainer: {width: wp(90), alignSelf: 'center', flex: 1},
});

export default styles;
