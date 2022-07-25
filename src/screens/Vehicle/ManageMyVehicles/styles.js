import {Platform, StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import colors from '../../../assets/colors/colors';
import fonts from '../../../assets/fonts/fonts';
import {hp, wp} from '../../../utils/CommonMethods';

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
    borderTopLeftRadius: hp(4),
    borderTopRightRadius: hp(4),
    backgroundColor: colors.WHITE,
  },
  profileContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      android: {
        paddingTop: hp(1),
      },
      ios: {
        paddingTop: hp(1),
      },
    }),
  },
  profileImage: {
    width: hp(6),
    height: hp(6),
    borderRadius: hp(25),
    marginBottom: hp(1),
  },
  cardView: {
    marginTop: hp(2.5),
    alignItems: 'center',
  },
  formBG: {
    width: wp('100%'),
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
  },
  modalContentContainer: {
    flex: 0.85,
  },
  inputContainer: {
    marginHorizontal: wp(4),
    flexDirection: 'column',
    paddingTop: hp(2),
    flex: 1,
  },
  vehicleSection: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  vehicleTextHeading: {
    color: colors.primary,
    fontSize: fonts.H9,
    fontWeight: 'bold',
    marginVertical: hp(1),
  },
  uploadImageText: {
    color: colors.primary,
    fontSize: 10,
    paddingBottom: hp(2),
  },
  buttonContainer: {
    marginTop: hp(1),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(5),
  },
});

export default styles;
