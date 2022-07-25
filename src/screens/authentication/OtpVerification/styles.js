import colors from '../../../assets/colors/colors';
import {StyleSheet} from 'react-native';
import {hp, wp} from '../../../utils/CommonMethods';
import fonts from '../../../assets/fonts/fonts';
import fontFamily from '../../../assets/fonts/fontFamily';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    // flex: 0.27,
    paddingVertical: hp(10),
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: hp(2),
  },
  logoStyles: {
    height: hp(17),
    width: hp(17),
    resizeMode: 'contain',
  },
  contentContainer: {
    flex: 0.73,
  },

  mainContainer: {
    flex: 1,
    padding: hp(4),
  },
  headingContainer: {
    flex: 0.25,
    // borderWidth:1
  },
  inputContainer: {
    // flex: 0.4,
    // borderWidth:1,
    // justifyContent:"center",
    alignItems: 'center',
    justifyContent: 'space-between',

    // borderWidth:1
  },
  labelContainer: {
    width: '100%',
    marginTop: hp(1.7),
    // paddingLeft:hp(1),
  },
  buttonContainer: {
    flex: 0.35,
    // borderWidth:1,
    paddingTop: hp(3),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headingStyle: {
    fontSize: fonts.H3,
    color: colors.WHITE,
    fontFamily: fontFamily.Mulish_SemiBold,
    marginLeft: wp(3),
  },
  textStyleEmail: {
    fontSize: fonts.H6,
    color: colors.WHITE,
    fontFamily: fontFamily.Mulish_Regular,
    opacity: 0.6,
  },
  textStyle: {
    fontSize: fonts.H6,
    color: colors.WHITE,
    fontFamily: fontFamily.Mulish_Regular,
  },
  bottomTextContainer: {
    flexDirection: 'row',
    // borderWidth:1
    marginTop: hp(3.5),
    //opacity: 0.3,
  },
  headerContainer: {
    marginHorizontal: hp(0.5),
    ...Platform.select({
      ios: {
        paddingTop: hp(1),
        // paddingBottom: hp(2),
      },
      android: {
        marginTop: hp(2),
        // paddingBottom: hp(2),
      },
    }),
  },
  bottomTextContainer2: {
    flexDirection: 'row',
    // borderWidth:1
    marginTop: hp(2),
    //opacity: 0.3,
  },
  underlineStyleBase: {
    width: wp(14),
    height: hp(7),
    marginLeft: '2%',
    fontSize: hp(2.3),
    fontWeight: 'bold',
    //borderBottomRadius: 0,

    //caretColor: colors.WHITE,
    //  opacity: 0.5,
    // borderWidth: 0,
    // borderBottomWidth: 2,
    // borderColor: 'black',
    // color: 'black',
    // fontWeight: 'bold',

    borderColor: colors.BLACK,
    borderWidth: 1,
    borderBottomWidth: 1,
    backgroundColor: '#008888',
    borderRadius: hp(1),
    color: colors.WHITE,
  },
  input: {
    width: wp(70),
    height: hp(12),
    alignItems: 'center',
    alignSelf: 'center',
    borderColor: colors.BLACK,
    // backgroundColor: 'red',
  },
  heightInput: {
    borderColor: colors.primary,
  },
});

export default styles;
