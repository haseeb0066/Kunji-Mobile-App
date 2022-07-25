import {StyleSheet} from 'react-native';
import {hp, wp} from '../../utils/CommonMethods';
import colors from '../../assets/colors/colors';
import fontFamily from '../../assets/fonts/fontFamily';
import fonts from '../../assets/fonts/fonts';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headingView: {
    width: wp('100%'),
    alignItems: 'center',
    flexDirection: 'column',
  },
  headingText: {
    color: colors.primaryTextColor,
    fontWeight: 'bold',
    fontSize: fonts.H5,
    textAlign: 'center',
    marginTop: hp(1),
  },
  numberText: {
    color: colors.WHITE,
    fontSize: fonts.H7,
    fontWeight: '400',
    textAlign: 'center',
  },
  logoContainer: {
    flex: 0.5,
  },
  editContainer: {
    flex: 0.2,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginRight: wp(10),
  },
  editText: {
    color: colors.WHITE,
    fontWeight: '600',
    fontSize: 14,
  },
  profileSection: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginBottom: hp(3),
  },
  logoStyles: {
    height: hp(15),
    width: hp(15),
    resizeMode: 'contain',
  },
  contentContainer: {
    flex: 0.5,
    borderTopLeftRadius: hp(5),
    borderTopRightRadius: hp(5),
    backgroundColor: colors.WHITE,
  },
  cardView: {
    width:wp('100%'),
    // borderWidth:1,
    alignItems:'center'
   
  },
  formImage: {
    borderTopRightRadius: hp(4),
    borderTopLeftRadius: hp(4),
  },
});

export default styles;
