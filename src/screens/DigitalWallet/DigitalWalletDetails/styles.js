import {Platform, StyleSheet} from 'react-native';
import {hp, wp} from '../../../utils/CommonMethods';
import colors from '../../../assets/colors/colors';
import fontFamily from '../../../assets/fonts/fontFamily';
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
  flatListContainer: {
    marginTop: hp(5),
    minHeight: hp(15),
  },
  flatListView: {
    marginVertical: hp(1),
  },
  buttonContainer: {
    flex: 0.3,
    justifyContent: 'center',
  },
});

export default styles;
