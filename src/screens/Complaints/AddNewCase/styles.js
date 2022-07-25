import {StyleSheet, Platform} from 'react-native';
import colors from '../../../assets/colors/colors';
import {hp, wp} from '../../../utils/CommonMethods';
import fonts from '../../../assets/fonts/fonts';

const styles = StyleSheet.create({
  contianer: {
    flex: 1,
  },
  headercontianer: {
    paddingLeft: wp(1),
    ...Platform.select({
      android: {
        paddingTop: hp(3),
        paddingBottom: hp(2),
      },
      ios: {
        paddingBottom: hp(3),
      },
    }),
  },
  textstyle: {
    paddingLeft: wp(5),
    fontWeight: '700',
    fontSize: fonts.H6,
    color: colors.primary,
  },
  inputContainer: {
    marginVertical: hp(2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  lableText1: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: fonts.H10,
    left: wp(2),
    alignSelf: 'center',
  },
  buttonContainer: {
    marginTop: hp(2),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(5),
  },
  profileImage: {
    width: hp(4),
    height: hp(4),
    backgroundColor: 'green',
    borderRadius: hp(1.3),
  },

  //Attach file style
  attachtext: {
    marginHorizontal: hp(3.5),
    fontSize: hp(1.8),
    color: colors.primary,
    marginBottom: hp(1),
    fontWeight: '600',
    alignSelf: 'flex-start',
  },
  uploadSection: {
    width: wp('90%'),
    height: hp(6.5),
    alignItems: 'center',
    borderRadius: 15,
    flexDirection: 'row',
    borderColor: colors.primary,
    borderWidth: 1,
  },
  uploadTextDoc: {
    marginHorizontal: hp(2),
    color: colors.primary,
    fontSize: fonts.H10,
  },
  selectContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  imageContainer: {
    marginLeft: '10%',
    alignItems: 'center',
  },
  imageStyle: {
    width: 30,
    height: 30,
    borderRadius: hp(0.6),
  },
  plusStyle: {
    color: colors.BLACK,
    fontSize: 25,
    marginHorizontal: hp(1.5),
    //textAlign: 'center',
  },
  crossContainer: {
    position: 'absolute',
    left: 31,
    // bottom: 29,
    // backgroundColor: colors.primary,
    // borderRadius: 50,
    // // padding: 2,
    // height: 18,
    // width: 18,
    alignItems: 'center',
    justifyContent: 'center',
    // alignSelf: 'center',
  },
  imageStyle: {
    width: 30,
    height: 30,
    borderRadius: hp(0.6),
  },
});
export default styles;
