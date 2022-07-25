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
    flex: 1,
    marginHorizontal: wp(3),
    flexDirection: 'row',
    ...Platform.select({
      ios: {
        marginBottom: hp(2.5),
      },
    }),
    // paddingBottom: hp(3),
  },
  flatlistSection: {
    marginHorizontal: 10,
    marginVertical: 10,
    display: 'flex',
    // justifyContent: 'space-around',
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
