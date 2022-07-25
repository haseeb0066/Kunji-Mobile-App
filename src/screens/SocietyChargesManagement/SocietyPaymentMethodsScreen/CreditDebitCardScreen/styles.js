import {StyleSheet, Platform} from 'react-native';
import {wp, hp} from '../../../../utils/CommonMethods';
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
  lottieStyle: {
    height: hp(30),
    width: wp(90),
    marginBottom: hp(10),
  },
  commingSoon: {
    flex: 0.9,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
