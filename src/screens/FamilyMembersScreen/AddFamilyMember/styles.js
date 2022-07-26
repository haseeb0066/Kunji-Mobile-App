import {Platform, StyleSheet} from 'react-native';
import {hp, wp} from '../../../utils/CommonMethods';
import colors from '../../../assets/colors/colors';
import fontFamily from '../../../assets/fonts/fontFamily';
import fonts from '../../../assets/fonts/fonts';
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  cardView1: {
    flex: 1,
    width: wp('100%'),
  },
  headingView1: {
    flex: 0.15,
    width: wp('100%'),
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingLeft: wp(10),
    ...Platform.select({
      ios: {
        justifyContent: 'center',
      },
    }),
  },

  headingtextStyle: {
    fontSize: fonts.H6,
    color: colors.WHITE,
    fontWeight: 'bold',
    // marginBottom: '2%',
  },
  logoContainer: {
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoStyles: {
    height: hp(17),
    width: hp(17),
    resizeMode: 'contain',
  },
  contentContainer: {
    flex: 0.6,
    borderTopLeftRadius: hp(5),
    borderTopRightRadius: hp(5),
  },
  cardView: {
    marginVertical: hp(2),
    marginLeft: wp(5),
  },
  formBG: {
    borderTopLeftRadius: hp(4),
    borderTopRightRadius: hp(4),
  },
  flatlistContainer: {
    flex: 0.9,
    marginHorizontal: wp(5),
    flexDirection: 'row',
  },
  flatlistSection: {
    marginHorizontal: 10,
    marginVertical: 10,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  // modal style
  modalContainer: {
    flex: 1,
  },
  emptyContainer: {
    flex: 0.3,
    backgroundColor: 'transparent',
  },
  modalContentContainer: {
    flex: 0.85,
  },
  inputContainer: {
    marginHorizontal: wp(4),
    flexDirection: 'column',
    paddingTop: hp(1),
    flex: 1,
  },
  familySection: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  uploadText: {
    color: colors.primary,
    fontSize: 10,
    paddingBottom: hp(2),
  },
  familyText: {
    color: colors.primary,
    fontSize: fonts.H9,
    fontWeight: 'bold',
    marginVertical: hp(1),
  },
  dropdownLable: {
    fontSize: fonts.H9,
    textAlign: 'left',
    marginLeft: '2%',
    fontWeight: 'bold',
    color: colors.primary,
    paddingVertical: hp(1),
  },
  dropdown: {
    backgroundColor: colors.WHITE,
    width: '100%',
    borderWidth: 1,
    borderColor: colors.RED_COLOR,
    borderRadius: 15,
    ...Platform.select({
      ios: {
        padding: hp(1.7),
      },
      android: {
        height: hp(6.5),
      },
    }),
  },
  buttonContainer: {
    // marginTop: hp(2),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(5),
  },
  profileImage: {
    width: hp(6),
    height: hp(6),
    borderRadius: hp(25),
    marginBottom: hp(1),
  },
  lableText: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: fonts.H10,
    left: wp(2),
  },
});

export default styles;
