import {Platform, StyleSheet} from 'react-native';
import {hp, wp} from '../../../utils/CommonMethods';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileContainer: {
    flex: 0.3,
    alignItems: 'center',
    paddingTop: hp(4),
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
  contentContainer: {
    flex: 0.74,
    flexDirection: 'column',
  },
  formBG: {
    borderTopLeftRadius: hp(4),
    borderTopRightRadius: hp(4),
  },
  formbackground: {
    flex: 1,
  },
  inputContainer: {
    marginHorizontal: wp(4),
    marginVertical: hp(5),
    flexDirection: 'column',
    flex: 1,
  },
});

export default styles;
