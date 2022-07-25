import {StyleSheet} from 'react-native';
import colors from '../../../assets/colors/colors';
import {hp, wp} from '../../../utils/CommonMethods';

const styles = StyleSheet.create({
  conianer: {
    flex: 1,
  },
  headercontianer: {
    paddingLeft: wp(2),
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
  servicescontianer: {
    height: hp(20),
    width: wp(90),
    borderWidth: 1,
    alignSelf: 'center',
    borderRadius: wp(5),
    borderColor: colors.primary,
  },
  headingcontianer: {
    height: hp(6),
    width: wp(90),
    backgroundColor: '#2F5351',
    borderColor: colors.primary,
    alignSelf: 'center',
    borderRadius: wp(5),
    justifyContent: 'center',
  },
  headingstyle: {
    color: colors.WHITE,
    fontWeight: 'bold',
    ...Platform.select({
      ios: {
        fontSize: hp(1.5),
      },
      android: {
        fontSize: hp(1.7),
      },
    }),
    paddingLeft: wp(4),
  },
  textnumconitaner: {
    flex: 0.3,
    width: wp(83),
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  textcontianer: {
    flex: 0.85,
  },
  textstyle: {
    fontSize: hp(2),
    fontWeight: '600',
    color: colors.primary,
  },
  numcontianer: {
    flex: 0.15,
  },
  numstyle: {
    color: colors.primary,
  },
  totalvotesstyle: {
    flex: 0.15,
    width: wp(90),
    alignSelf: 'center',
    justifyContent: 'space-around',
    marginVertical: hp(2),
  },
});

export default styles;
