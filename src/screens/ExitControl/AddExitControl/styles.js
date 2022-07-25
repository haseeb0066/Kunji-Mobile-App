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
    flex: 0.8,
    marginHorizontal: wp(5),
    flexDirection: 'row',
    paddingBottom: hp(3),
  },
  flatlistSection: {
    marginHorizontal: 10,
    marginVertical: 10,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  familyContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: wp(80),
    paddingVertical: hp(1),
  },
  familyText: {
    color: colors.WHITE,
    fontSize: fonts.H8,
    fontWeight: 'bold',
  },
  //   modal style start
  modalContainer: {
    flex: 1,
  },
  emptyContainer: {
    flex: 0.28,
    backgroundColor: 'transparent',
  },
  modalContentContainer: {
    flex: 0.73,
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
        // padding: hp(0.1),
      },
      android: {
        padding: hp(0.3),
      },
    }),
    marginVertical: 10,
    borderColor: colors.primary,
    backgroundColor: colors.WHITE,
  },
  heading: {
    justifyContent: 'center',
    width: wp(73),
    ...Platform.select({
      android: {
        marginVertical: hp(1.9),
      },
      ios: {
        marginVertical: hp(1.8),
      },
    }),
  },
  nameText: {
    color: colors.primary,
    fontWeight: '500',
    fontSize: fonts.H10,
    left: wp(3),
  },
  showText: {
    color: colors.primary,
    opacity: 0.5,
    fontSize: fonts.H10,
  },
  userText: {
    justifyContent: 'center',
    alignItems: 'center',
    width: wp(18),
    height: hp(5.5),
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
