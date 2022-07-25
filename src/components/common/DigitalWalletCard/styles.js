import {StyleSheet} from 'react-native';
import {hp, wp} from '../../../utils/CommonMethods';
import colors from '../../../assets/colors/colors';
import fonts from '../../../assets/fonts/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    height: hp(7),
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'row',
    marginHorizontal: hp(1),
  },
  shadowProp: {
    shadowColor: 'black',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  contentContainer: {
    width: '70%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
  headingText: {
    color: colors.primary,
    left: '10%',
    fontSize: fonts.H9,
    fontWeight: '500',
    paddingBottom: hp(0.5),
  },
  info: {
    color: colors.primary,
    left: '10%',
    fontSize: 10,
    fontWeight: '500',
  },
  priceContainer: {
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  priceText: {
    color: colors.primary,
    fontWeight: 'bold',
  },
});

export default styles;
