import {StyleSheet, Platform} from 'react-native';
import {hp, wp} from '../../utils/CommonMethods';
import colors from '../../assets/colors/colors';

import fonts from '../../assets/fonts/fonts';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
  },
  crossContainer: {
    position: 'absolute',
    left: 31,
    bottom: 29,
    // backgroundColor: colors.primary,
    // borderRadius: 50,
    // // padding: 2,
    // height: 18,
    // width: 18,
    alignItems: 'center',
    justifyContent: 'center',
    // alignSelf: 'center',
  },
  profileContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      android: {
        paddingTop: hp(5),
      },
      ios: {
        paddingTop: hp(6),
      },
    }),
  },
  imageStyle: {
    borderTopLeftRadius: hp(4),
    borderTopRightRadius: hp(4),
  },
  profileImage: {
    width: wp(22),
    height: wp(22),
    borderRadius: 50,
  },
  profileHeading: {
    color: colors.primaryTextColor,
    fontWeight: 'bold',
    fontSize: fonts.H6,
    textAlign: 'center',
    marginTop: hp(1),
  },
  headingText: {
    color: colors.WHITE,
    fontSize: fonts.H4,
    paddingTop: hp(3),
    paddingBottom: hp(2),
  },
  formContainer: {
    flex: 1,
  },
  formimage: {
    flex: 1,
    paddingTop: hp(2),
  },
  imageborder: {
    borderTopRightRadius: hp(4),
    borderTopLeftRadius: hp(4),
  },

  inputContainer: {
    marginHorizontal: wp(4),
    flexDirection: 'column',
    paddingTop: hp(3),
    flex: 1,
  },
  dropdownLable: {
    fontSize: fonts.H9,
    textAlign: 'left',
    marginLeft: '2%',
    fontWeight: 'bold',
    color: colors.primary,
    paddingVertical: hp(1),
  },
  buttonContainer: {
    marginTop: hp(2),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(5),
  },
  dropdown: {
    backgroundColor: colors.WHITE,
    width: '100%',
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 15,
    ...Platform.select({
      ios: {
        padding: hp(1.7),
      },
      android: {
        height: hp(6.5),
        // padding: hp(2),
      },
    }),
  },
  privcayText: {
    color: colors.primary,
    textAlign: 'center',
    paddingLeft: hp(1),
    fontSize: 10,
  },
  checkboxContainer: {
    marginHorizontal: wp(6),
    flexDirection: 'row',
    marginTop: hp(3),
  },
  uploadIconContainer: {
    borderRadius: 15,
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: hp(1.5),
    height: hp(15),
    flexDirection: 'row',
  },
  uploadSection: {
    width: '45%',
    height: hp(12),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    flexDirection: 'column',
    borderColor: colors.primary,
    borderWidth: 1,
  },
  uploadText: {
    marginTop: hp(1),
    color: colors.primary,
    fontSize: fonts.H10,
  },
  inputView: {
    borderRadius: 15,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',

    ...Platform.select({
      ios: {
        padding: hp(0.2),
      },
      android: {
        padding: hp(0.1),
      },
    }),
    marginVertical: 7,
    borderColor: 'red',
    backgroundColor: colors.WHITE,
  },
  dateView: {
    width: '90%',
    borderRadius: 15,
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        height: hp(5.5),
      },
      android: {
        height: hp(6),
      },
    }),
  },
  datePickerText: {
    color: colors.BLACK,
    // color: colors.primary,
    left: wp(4),
  },
  RadioButtonContainer: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: '2%',
    //backgroundColor: 'red',
  },
});

export default styles;
