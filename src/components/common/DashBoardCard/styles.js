import {StyleSheet} from 'react-native';
import {hp, wp} from '../../../utils/CommonMethods';
import fontFamily from '../../../assets/fonts/fontFamily';
const styles = StyleSheet.create({
  FlateMainViewStyle: {
    height: hp(12),
    width: hp(11.7),
    resizeMode: 'stretch2',
    marginTop: hp(1),
    justifyContent: 'center',
    alignItems:'center'
  },
  textStyle: {
    textAlign: 'center',
    color: 'white',
    fontFamily: fontFamily.Mulish_Bold,
    fontSize: Platform.OS == 'android' ? wp(2.6) : wp(2.5),
    width: wp(19)
  }
});
export default styles;
