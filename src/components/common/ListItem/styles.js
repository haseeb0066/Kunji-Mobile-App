import {StyleSheet} from 'react-native';
import {hp, wp} from '../../../utils/CommonMethods';
import colors from '../../../assets/colors/colors';
const styles = StyleSheet.create({
  contianer: {
    height: hp(10),
    width: wp(90),
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    borderBottomWidth: wp(0.2),
    borderColor: colors.GRAY,
  },
  imagecontianer: {
    flex: 0.2,
    justifyContent: 'center',
  },
  imagestyle: {
    width: hp(7),
    height: hp(7),
    borderRadius: 100,
    justifyContent: 'center',
    alignSelf: 'center',
    right: hp(0.5),
  },
  textcontianer: {
    flex: 0.6,
    justifyContent: 'center',
    marginLeft: wp(2),
  },
  namestyle: {
    fontWeight: 'bold',
    color: colors.WHITE,
    fontSize: hp(1.8),
  },
  emailstyle: {
    color: colors.WHITE,
    opacity: 0.9,
    fontSize: hp(1.5),
    marginVertical: hp(0.7),
  },
  timecontianer: {
    flex: 0.2,
    justifyContent: 'center',
  },
  timestyle: {
    alignSelf: 'center',
    color: colors.WHITE,
  },
});
export default styles;
