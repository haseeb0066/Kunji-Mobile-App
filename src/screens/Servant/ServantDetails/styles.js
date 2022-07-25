import {Platform, StyleSheet} from 'react-native';
import {hp, wp} from '../../../utils/CommonMethods';
import colors from '../../../assets/colors/colors';
import fonts from '../../../assets/fonts/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileContainer: {
    flex: 0.25,
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
  docText: {
    color: colors.primary,
    fontSize: fonts.H10,
    fontWeight: 'bold',
  },
  docText1: {
    color: colors.primary,
    fontSize: fonts.H10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  contentContainer: {
    flex: 0.9,
    flexDirection: 'column',
  },
  uploadTextDoc: {
    marginBottom: hp(1),
    color: colors.primary,
    fontSize: fonts.H10,
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
    marginVertical: hp(2),
    flexDirection: 'column',
    flex: 1,
  },
  uploadDocText: {
    fontSize: fonts.H9,
    textAlign: 'left',
    marginLeft: '2%',
    fontWeight: 'bold',
    color: colors.primary,
    paddingBottom: hp(1),
  },
  uploadIconContainer: {
    borderRadius: 15,
    justifyContent: 'space-around',
    alignItems: 'center',
    minHeight: hp(13),
    flexDirection: 'row',
  },
  imageContainer: {
    width: '30%',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'column',
    minHeight: hp(13),
  },
  imageStyle: {
    width: wp(17),
    height: wp(17),
    borderRadius: 50,
  },
  docText: {
    color: colors.primary,
    fontSize: fonts.H10,
    fontWeight: '400',
  },
});

export default styles;
