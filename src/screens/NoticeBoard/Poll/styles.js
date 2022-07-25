import {StyleSheet} from 'react-native';
import {hp, wp} from '../../../utils/CommonMethods';

const styles = StyleSheet.create({
  contianer: {
    flex: 1,
  },
  headercontianer: {
    ...Platform.select({
      android: {
        paddingTop: hp(3),
        paddingBottom: hp(2),
      },
      ios: {
        paddingBottom: hp(5),
      },
    }),
  },
  buttonstyles: {
    width: wp(100),
    justifyContent: 'center',
    alignSelf: 'center',
  },
  flatlistView: {
    flex: 1,
    marginBottom: hp(2),
  },
});
export default styles;
