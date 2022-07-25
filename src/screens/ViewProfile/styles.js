import {Platform, StyleSheet} from 'react-native';
import {hp, wp} from '../../utils/CommonMethods';
import colors from '../../assets/colors/colors';
import fonts from '../../assets/fonts/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileContainer: {
    flex: 0.25,
    alignItems: 'center',
    paddingTop: hp(4),
  },
  headerContainer: {
    paddingLeft: wp(2),
    ...Platform.select({
      android: {
        paddingTop: hp(3),
        paddingBottom: hp(2),
      },
      ios: {
        paddingBottom: hp(1),
      },
    }),
  },
  contentContainer: {
    flex: 0.9,
    flexDirection: 'column',
  },
  formBG: {
    borderTopLeftRadius: hp(4),
    borderTopRightRadius: hp(4),
  },
  formbackground: {
    flex: 1,
  },
  inputContainer: {
    marginHorizontal: wp(4),
    marginVertical: hp(2),
    flexDirection: 'column',
    flex: 1,
  },
  inputView: {
    borderRadius: 15,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    width: '100%',
    borderColor: colors.primary,
  },

  nameText: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: fonts.H10,
    width: wp(40),
    marginLeft: wp(3),
  },
  showText: {
    color: colors.placeHolderColor,
    fontSize: fonts.H10,
    width: wp(40),
    marginLeft: wp(2),
    textAlign: 'center',
    // borderWidth:1,
    // height:hp(3)
  },
  heading: {
    justifyContent: 'center',
    marginVertical: hp(1.8),
    width: wp(43),
  },
  userText: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: hp(1.8),
    textAlign: 'center',
    width: wp(43),
  },
  uploadDocText: {
    fontSize: fonts.H9,
    textAlign: 'left',
    marginLeft: '2%',
    fontWeight: 'bold',
    color: colors.primary,
    paddingBottom: hp(1),
  },
  uploadIconContainer: {
    borderRadius: 15,
    flexDirection: 'row',
    // alignSelf: 'center',
    alignItems: 'center',
    borderWidth: 1,
    // flex: 1,
  },
  imageContainer: {
    // width: '50%',
    // justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: hp(1),
    backgroundColor: 'red',
    // minHeight: hp(13),
    // borderWidth: 1,
  },
  imageStyle: {
    width: wp(17),
    height: wp(17),
    borderRadius: 50,
  },
  docText: {
    color: colors.primary,
    fontSize: fonts.H10,
    fontWeight: 'bold',
  },
  docText1: {
    color: colors.primary,
    fontSize: fonts.H10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default styles;
