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
  buttonContainer: {
    alignItems: 'center',
  },
  flatListContainer: {
    flex: 1,
    marginHorizontal: wp(5),
    flexDirection: 'row',
    ...Platform.select({
      ios: {
        marginBottom: hp(2.5),
      },
    }),
  },
  flatlistSection: {
    marginHorizontal: 10,
    marginVertical: 10,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  //   modal style start
  modalContainer: {
    flex: 1,
  },
  emptyContainer: {
    flex: 0.25,
    backgroundColor: 'transparent',
  },
  modalContentContainer: {
    flex: 0.75,
  },
  formBG: {
    borderTopLeftRadius: hp(4),
    borderTopRightRadius: hp(4),
  },
  inputContainer: {
    marginHorizontal: wp(4),
    flexDirection: 'column',
    flex: 1,
    marginVertical: hp(1),
  },
  //

  lableText: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: fonts.H10,
    left: wp(2),
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
  //
  headingSection: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  uploadText: {
    color: colors.primary,
    fontSize: 10,
    paddingBottom: hp(2),
  },
  headingText: {
    color: colors.primary,
    fontSize: fonts.H9,
    fontWeight: 'bold',
    marginVertical: hp(1),
  },
  profileImage: {
    width: hp(6),
    height: hp(6),
    borderRadius: hp(25),
    marginBottom: hp(1),
  },
  //
  selectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    marginLeft: '10%',
  },
  imageStyle: {
    width: 40,
    height: 40,
    borderRadius: 10,
  },
  plusStyle: {
    color: colors.BLACK,
    fontSize: 30,
    textAlign: 'center',
  },

  uploadTextDoc: {
    marginTop: hp(1),
    color: colors.primary,
    fontSize: fonts.H10,
  },
  dropdownLable: {
    fontSize: fonts.H9,
    textAlign: 'left',
    marginLeft: '2%',
    fontWeight: 'bold',
    color: colors.primary,
    paddingBottom: hp(1),
  },
});

export default styles;
