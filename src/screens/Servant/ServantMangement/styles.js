import {StyleSheet, Platform} from 'react-native';

import colors from '../../../assets/colors/colors';
import fontFamily from '../../../assets/fonts/fontFamily';
import fonts from '../../../assets/fonts/fonts';
import {hp, wp} from '../../../utils/CommonMethods';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    marginTop: Platform.OS === 'android' ? hp(1.5) : hp(0.5),
  },
  flatListContainer: {
    alignItems: 'flex-start',
    marginTop: hp(3),
    flex: 1,
    marginLeft: wp(4),
  },
});

export default styles;
