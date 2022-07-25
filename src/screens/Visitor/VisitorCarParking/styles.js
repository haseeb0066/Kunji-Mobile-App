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
  buttonContainer: {
    alignItems: 'center',
  },
  flatListContainer: {
    flex: 0.43,
    marginHorizontal: wp(5),
    flexDirection: 'row',
    paddingBottom: hp(3),
  },
  pendingContainer: {
    flex: 0.5,
    marginHorizontal: wp(5),
    flexDirection: 'column',
    paddingBottom: hp(3),
  },
  pendingText: {
    color: colors.WHITE,
    fontSize: fonts.H7,
    fontWeight: 'bold',
    left: wp(5),
    marginBottom: hp(1),
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
  inputView: {
    borderRadius: 15,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',

    ...Platform.select({
      ios: {
        padding: hp(0.1),
      },
      android: {
        padding: hp(0.3),
      },
    }),
    marginVertical: 10,
    borderColor: colors.red,
    backgroundColor: colors.WHITE,
  },
  lableText: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: fonts.H10,
    left: wp(2),
  },
  datePickerText: {
    color: colors.BLACK,
    left: wp(4),
  },
  placeholderText: {
    color: colors.placeHolderColor,
  },
  dateView: {
    width: '90%',
    borderRadius: 15,
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        height: hp(5.5),
      },
      android: {
        height: hp(6),
      },
    }),
  },
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
});

export default styles;
