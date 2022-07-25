import colors from '../../../assets/colors/colors';
import {StyleSheet, Platform} from 'react-native';
import {hp, wp} from '../../../utils/CommonMethods';
import fonts from '../../../assets/fonts/fonts';

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
  inputContainer: {
    marginHorizontal: wp(4),
    flexDirection: 'column',
    flex: 1,
    // marginVertical: hp(3),
    marginTop: hp(4),
  },
});
export default styles;
