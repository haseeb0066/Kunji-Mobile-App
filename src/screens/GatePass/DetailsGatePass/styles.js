import {StyleSheet} from 'react-native';
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
  profileContainer: {
    flex: 0.7,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: hp(4),
  },
  formbackground: {
    flex: 0.85,
    // backgroundColor:'red',
    // borderWidth:1,
  },
  fromBGstyle: {
    borderTopRightRadius: hp(4),
    borderTopLeftRadius: hp(4),
  },
  inputcontainer: {
    marginHorizontal: wp(4),
    marginVertical: hp(3),
    flexDirection: 'column',
    flex: 1,
  },
});
export default styles;
