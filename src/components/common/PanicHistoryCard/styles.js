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
  // imagecontianer: {
  //   flex: 0.2,
  //   justifyContent: 'center',
  // },
  // imagestyle: {
  //   width: wp(15),
  //   height: hp(7),
  //   borderRadius: 50,
  //   justifyContent: 'center',
  //   alignSelf: 'center',
  //   right: hp(0.5),
  // },
  textcontianer: {
    flex: 0.9,
  },
  timestylcontiner: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addressstylcontiner: {
    flex: 0.5,
  },
  namestyle: {
    fontWeight: 'bold',
    color: colors.WHITE,
    fontSize: hp(2),
    alignSelf: 'flex-end',
    width: wp(40),
  },
  emailstyle: {
    color: colors.WHITE,
    opacity: 0.9,
    fontSize: hp(1.5),
    top: hp(1),
  },
  timestyle: {
    color: colors.WHITE,
    alignSelf: 'flex-end',
    opacity: 0.9,
    fontSize: hp(1.6),
  },
});
export default styles;
