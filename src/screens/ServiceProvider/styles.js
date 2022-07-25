import colors from '../../assets/colors/colors';
import {StyleSheet, Platform} from 'react-native';
import {hp, wp} from '../../utils/CommonMethods';
import fonts from '../../assets/fonts/fonts';
import fontFamily from '../../assets/fonts/fontFamily';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  contentContainer: {
    flex: 0.5,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'column',
  },
  listContainer: {
    width: wp('100%'),
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  listContentContainer: {
    height: hp(4.5),
    backgroundColor: '#FBFBFB',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: hp(2),
    borderRadius: 12,
    width: wp('70%'),
  },
  ckeckBox: {
    width: wp(5),
    height: hp(2.4),
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(2.5),
    borderColor: colors.headingColor,
  },
  headingContainer: {
    flex: 0.1,
    marginHorizontal: wp(6),
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  vistorlistText: {
    fontSize: fonts.H2,
    fontFamily: fontFamily.Mulish,
    color: colors.headingColor,
  },
  infoText: {
    fontFamily: fontFamily.Mulish,
    color: colors.headingColor,
    fontSize: fonts.H6,
    marginTop: hp(1),
  },
  paymentContainer: {
    height: 50,
    marginHorizontal: wp(6),
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FBFBFB',
    marginTop: hp(5),
    borderColor: colors.headingColor,
    borderRadius: 12,
    borderWidth: 1,
  },
  paymentText: {
    color: '#323F4B',
    fontSize: fonts.H6,
    fontFamily: fontFamily.Mulish,
  },
  cardConatiner: {
    flex: 0.1,
    flexDirection: 'row',
    marginHorizontal: wp(6),
    borderRadius: 12,
    marginTop: hp(2),
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  cardSection: {
    width: '22%',
    height: 48,
    backgroundColor: '#FBFBFB',
    borderColor: colors.headingColor,
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
