import {Platform, StyleSheet} from 'react-native';
import colors from '../../../assets/colors/colors';
import {hp, wp} from '../../../utils/CommonMethods';
import fonts from '../../../assets/fonts/fonts';

const styles = StyleSheet.create({
  contianer: {
    flex: 1,
  },
  headercontianer: {
    paddingLeft: wp(1),
    ...Platform.select({
      android: {
        paddingTop: hp(3),
        paddingBottom: hp(2),
      },
      ios: {
        paddingBottom: hp(3),
      },
    }),
  },
  textcontianer: {
    marginVertical: hp(1.5),
  },
  textstyle: {
    paddingLeft: wp(5),
    fontWeight: '700',
    fontSize: fonts.H6,
    color: colors.primary,
  },
  buttoncontianer: {
    paddingTop: hp(1),
    width: wp('90%'),
    alignSelf: 'center',
  },
});
export default styles;
