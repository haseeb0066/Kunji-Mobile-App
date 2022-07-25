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
    // flex: 0.1,
    paddingLeft: wp(2),
    marginTop: Platform.OS === 'android' ? hp(1.5) : hp(0.5),
  },
  logoContainer: {
    // flex: 0.18,
    marginTop: hp(5),
    justifyContent: 'center',
    alignItems: 'center',
    // paddingBottom: hp(2),
  },
  logoStyles: {
    height: hp(15),
    width: hp(15),
    resizeMode: 'contain',
  },
  contentContainer: {
    // flex: 0.72,
    // borderTopLeftRadius: hp(4),
    // borderTopRightRadius: hp(4),
    // backgroundColor: colors.WHITE,
  },

  mainContainer: {
    // flex: 1,
    padding: hp(4),
  },
  headingContainer: {
    marginTop: hp(6),
    // flex: 0.25,
    // borderWidth:1
  },
  inputContainer: {
    // flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelContainer: {
    width: '100%',
    marginTop: hp(2),
    // paddingLeft:hp(1),
  },
  buttonContainer: {
    // flex: 0.35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headingStyle: {
    fontSize: fonts.H5,
    color: colors.WHITE,
    fontWeight: 'bold',
  },
  textStyleEmail: {
    fontSize: fonts.H6,
    color: colors.BLACK,
    fontFamily: fontFamily.Mulish_Regular,
  },
  textStyle: {
    fontSize: fonts.H6,
    color: colors.INPUT_PLACE_HOLDER_TEXT_COLOR,
    fontFamily: fontFamily.Mulish_Regular,
  },

  textStyleView: {
    width: wp('100%'),
    paddingLeft: wp(8),
    marginTop: hp(0.3),
  },
  bottomTextContainer: {
    flexDirection: 'row',
  },

  ////// Moda
  // modal
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#3D3D3D99',
  },
  innermodalContainer: {
    backgroundColor: '#F6E4F5',
    flex: 0.4,
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: hp(5),
    flexDirection: 'column',
    borderWidth: 2,
    borderColor: colors.primaryTextColor,
    // color:colors.primaryTextColor
  },
  galleryIconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },
  modalText: {
    fontSize: fonts.H7,
    fontFamily: fontFamily.Mulish_Bold,
    color: colors.primaryTextColor,
  },
});
export default styles;
