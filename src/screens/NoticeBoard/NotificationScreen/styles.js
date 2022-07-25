import {Platform, StyleSheet} from 'react-native';
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
        paddingBottom: hp(4),
      },
    }),
  },
  flatlistView: {
    flex: 1,
    ...Platform.select({
      ios: {
        marginBottom: hp(2.5),
      },
    }),
  },
});

export default styles;
