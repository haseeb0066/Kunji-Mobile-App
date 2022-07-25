import {StyleSheet, Platform} from 'react-native';
import colors from '../../../assets/colors/colors';
import fonts from '../../../assets/fonts/fonts';
import {hp, wp} from '../../../utils/CommonMethods';

const styles = StyleSheet.create({
  topHeaderTextContainer: {
    marginTop: hp(4),
    marginLeft: '4%',
  },
  headerText: {
    color: colors.primary,
    fontSize: fonts.H6,
    fontWeight: 'bold',
  },
  infoText: {
    color: colors.primary,
    fontSize: hp(1.2),
    // fontWeight: 'bold',
    textAlign: 'left',
  },
  inputContainer: {
    width: wp(89),
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: hp(3),
  },
  infoTextContainer: {
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    marginTop: hp(1),
    marginLeft: '4%',
  },
});

export default styles;
