import {StyleSheet} from 'react-native';
import {hp, wp} from '../../../utils/CommonMethods';
import fonts from '../../../assets/fonts/fonts';
import colors from '../../../assets/colors/colors';

const styles = StyleSheet.create({
  contianer: {
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
        paddingBottom: hp(3),
      },
    }),
  },
  dropdownstyle: {
    width: wp(90),
    justifyContent: 'center',
    alignSelf: 'center',
    height: hp(12),
  },
  dropdownLable: {
    fontSize: fonts.H9,
    textAlign: 'left',
    marginLeft: '6%',
    fontWeight: 'bold',
    color: colors.primary,
    paddingVertical: hp(1),
  },
  checkboxcontianer: {
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
  textstyle: {
    fontSize: fonts.H9,
    marginLeft: '10%',
    fontWeight: 'bold',
    fontSize: hp(2),
    color: colors.primary,
    paddingTop: hp(2),
  },
  commentstyle: {
    width: wp(90),
    alignSelf: 'center',
    borderRadius: wp(5),
    borderColor: colors.primary,
  },
  inputView: {
    borderRadius: 15,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',

    ...Platform.select({
      ios: {
        height: hp(5.8),
      },
      android: {
        height: hp(6),
      },
    }),
    borderColor: colors.primary,
    backgroundColor: colors.WHITE,
  },
  placeholderText: {
    color: colors.placeHolderColor,
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
    left: wp(4),
  },
  RadioButtonContainer: {
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    ...Platform.select({
      ios: {
        paddingTop: hp(1.8),
      },
      android: {
        paddingTop: hp(1),
      },
    }),
  },
});
export default styles;
