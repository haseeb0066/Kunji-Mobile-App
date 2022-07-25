import {StyleSheet} from 'react-native';
import {hp, wp} from '../../../utils/CommonMethods';
import colors from '../../../assets/colors/colors';
import fonts from '../../../assets/fonts/fonts';

const styles = StyleSheet.create({
  inputView: {
    borderRadius: 15,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    ...Platform.select({
      ios: {
        height: hp(5.5),
      },
      android: {
        height: hp(6),
      },
    }),
    //borderColor:colors.RED_COLOR,
    backgroundColor: colors.WHITE,
  },
  miancontainer: {
    alignItems: 'center',
    marginVertical: hp(0.7),
  },
  nameText: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: fonts.H10,
    left: wp(5),
  },
  heading: {
    justifyContent: 'center',
    width: '80%',
    height: hp(6),
  },
  arrowdown: {
    justifyContent: 'center',
    width: '20%',
    alignItems: 'center',
    height: hp(6),
  },
  arrowstyle: {
    width: 15,
    height: 15,
    marginRight: 10,
  },
  dropdowncontianer: {
    alignItems: 'center',
  },
  dropdownstyle: {
    width: wp(90),
    //  height: hp(48),
    borderWidth: 1,
    alignItems: 'center',
    borderRadius: wp(4),
    backgroundColor: colors.WHITE,
  },
  datetimecontianer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: hp(1),
  },
  lableText: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: fonts.H10,
    left: wp(2),
  },
  datepickerView: {
    width: '50%',
    borderRadius: 9,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    right: wp(6),
    ...Platform.select({
      ios: {
        height: hp(3.5),
      },
      android: {
        height: hp(4),
      },
    }),
    borderColor: colors.RED_COLOR,
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
    left: wp(2),
  },
  iconView: {
    right: wp(3),
  },
  textstyle: {
    marginTop: hp(1),
    fontSize: fonts.H9,
    marginLeft: '3%',
    fontWeight: 'bold',
    fontSize: hp(1.5),
    color: colors.primary,
  },
  commentstyle: {
    width: wp(70),
    alignSelf: 'center',
    borderRadius: wp(5),
    borderColor: colors.primary,
    borderWidth: 2,
    backgroundColor: 'red',
  },
  // inputContainer: {
  //  // marginHorizontal: wp(4),
  // //  backgroundColor:"red",
  // },
  bottoncontianer: {
   right:hp(1),
   alignSelf:"flex-end",
  },
  //Attach file style
  attachtext: {
    marginHorizontal: hp(1),
    fontSize: hp(1.7),
    color: colors.primary,
    marginBottom: hp(1),
    fontWeight: '600',
   // alignSelf: 'flex-start',
  },
  uploadSection: {
    width: wp('85%'),
    height: hp(6.5),
    alignItems: 'center',
    borderRadius: 15,
    flexDirection: 'row',
    borderColor: colors.RED_COLOR,
    borderWidth: 1,
    marginBottom: hp(1),
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
    marginLeft: '9%',
    alignItems: 'center',
    //backgroundColor:"red"
  },
  imageStyle: {
    width: 50,
    height: 50,
    borderRadius: hp(1),
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
  desContianer: {
    height: hp(10),
    width: wp(85),
    borderWidth: 1,
    borderRadius: 15,
    //marginTop: hp(1),
    marginVertical: hp(1),
  },
  desTextContianer: {
    height: hp(10),
    width: wp(80),
    // borderWidth: 1,
    borderRadius: 15,
    alignSelf: 'center',
    paddingLeft: hp(1),
    paddingTop: hp(1),
    paddingRight: hp(1),
  },
  FlatListView: {
    // borderWidth: 2,
    borderColor: 'red',
    marginHorizontal: hp(1.5),
    justifyContent: 'center',
    height: hp(9.5),
    width: wp(15),
    alignItems: 'center',
  },
});
export default styles;
