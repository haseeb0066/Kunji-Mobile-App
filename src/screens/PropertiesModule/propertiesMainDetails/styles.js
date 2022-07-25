import {Platform, StyleSheet} from 'react-native';
import {hp, wp} from '../../../utils/CommonMethods';
import colors from '../../../assets/colors/colors';
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
    marginTop: hp(2.5),
    alignItems: 'center',
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
  // upload cont
  uploadIconContainer: {
    borderRadius: 15,
    justifyContent: 'space-around',
    alignItems: 'center',
    minHeight: hp(13),
    flexDirection: 'row',
  },
  uploadSection: {
    width: '45%',
    height: hp(12),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    flexDirection: 'column',
    borderColor: colors.primary,
    borderWidth: 1,
  },
  uploadTextDoc: {
    marginTop: hp(1),
    color: colors.primary,
    fontSize: fonts.H10,
  },
  selectContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  imageContainer: {
    marginLeft: '10%',
    alignItems: 'center',
  },
  imageStyle: {
    width: 40,
    height: 40,
    borderRadius: hp(0.6),
  },
  plusStyle: {
    color: colors.BLACK,
    fontSize: 30,
    textAlign: 'center',
  },
  crossContainer: {
    position: 'absolute',
    left: 31,
    bottom: 29,
    // backgroundColor: colors.primary,
    // borderRadius: 50,
    // // padding: 2,
    // height: 18,
    // width: 18,
    alignItems: 'center',
    justifyContent: 'center',
    // alignSelf: 'center',
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
    marginVertical: hp(2),
    flexDirection: 'column',
    flex: 1,
  },
  familySection: {
    justifyContent: 'center',
    alignItems: 'center',
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
  uploadTextDoc: {
    marginTop: hp(1),
    color: colors.primary,
    fontSize: fonts.H10,
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
        // padding: hp(2),
      },
    }),
  },
  uploadTextDoc: {
    marginTop: hp(1),
    color: colors.primary,
    fontSize: fonts.H10,
  },
  uploadSection: {
    width: '45%',
    height: hp(12),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    flexDirection: 'column',
    borderColor: colors.primary,
    borderWidth: 1,
  },
  buttonContainer: {
    marginTop: hp(2),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(5),
  },
  uploadText: {
    color: colors.primary,
    fontSize: 10,
    paddingBottom: hp(2),
  },
  profileImage: {
    width: hp(6),
    height: hp(6),
    borderRadius: hp(25),
    marginBottom: hp(1),
  },
  RadioButtonContainer: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: '2%',
    //backgroundColor: 'red',
  },
  uploadSection: {
    width: '45%',
    height: hp(12),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    flexDirection: 'column',
    borderColor: colors.primary,
    borderWidth: 1,
  },
  uploadIconContainer: {
    borderRadius: 15,
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: hp(1.5),
    height: hp(15),
    flexDirection: 'row',
  },
  uploadText: {
    marginTop: hp(1),
    color: colors.primary,
    fontSize: fonts.H10,
  },
});

export default styles;
