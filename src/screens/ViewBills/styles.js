import {StyleSheet, Platform} from 'react-native';
import {hp, wp} from '../../utils/CommonMethods';
import colors from '../../assets/colors/colors';
import fonts from '../../assets/fonts/fonts';
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
  buttonContainer: {
    marginTop: hp(2),
    marginRight: hp(1),
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatListContainer: {
    marginTop: hp(5),
    minHeight: hp(15),
  },
  flatListView: {
    marginVertical: hp(0.5),
  },
  dateText: {
    color: colors.primary,
    fontSize: fonts.H9,
    fontWeight: 'bold',
    left: '8%',
    marginBottom: hp(1),
  },
});

export default styles;
