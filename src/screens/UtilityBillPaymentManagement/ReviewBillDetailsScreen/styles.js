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
  paymentMethoText:{
    color: colors.BLACK,
    fontSize: fonts.H5,
    fontWeight: 'bold',
  },
  infoText: {
    color: colors.primary,
    fontSize: hp(1.2),
    textAlign: 'left',
  },
  inputContainer: {
    width: wp(89),
    alignSelf: 'center',

    marginTop: hp(3),
  },
  infoTextContainer: {
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    marginTop: hp(1),
    marginLeft: '4%',
  },
  amountText: {
    color: colors.primary,
    fontSize: fonts.H1,
    fontWeight: 'bold',
  },
  ammountContainer: {
    marginTop: hp(1),
  },
});

export default styles;
