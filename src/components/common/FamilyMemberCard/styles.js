import {StyleSheet} from 'react-native';
import {wp, hp} from '../../../utils/CommonMethods';
import fontFamily from '../../../assets/fonts/fontFamily';
import fonts from '../../../assets/fonts/fonts';
import colors from '../../../assets/colors/colors';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: hp(2),
  },
  cardView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    marginTop: hp(1),
    // borderWidth:1
  },
  imagView: {
    justifyContent: 'center',
    alignItems: 'center',
    height: hp(7),
    width: wp(15),
  },
  imageStyle: {
    height: hp(3),
    width: hp(3),
  },
  textView: {
    alignItems: 'flex-start',
    paddingLeft: wp(4),
    width: '75%',
  },
  rifgtIconView: {
    alignItems: 'flex-end',
    width: '8%',
  },
  textStyle: {
    fontSize: 15,
    color: colors.primaryTextColor,
    fontWeight: '600',
  },
  rightIconStyle: {
    height: hp(1.5),
    width: hp(1.5),
    resizeMode: 'contain',
  },
});

export default styles;
