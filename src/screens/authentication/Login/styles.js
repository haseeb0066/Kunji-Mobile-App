import colors from '../../../assets/colors/colors';
import {Platform, StyleSheet} from 'react-native';
import {hp, wp} from '../../../utils/CommonMethods';
import fonts from '../../../assets/fonts/fonts';
import fontFamily from '../../../assets/fonts/fontFamily';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: hp(2),
    marginTop: hp(10),
    marginBottom: hp(6),
  },
  phoneFieldContainer: {
    width: wp(89),
    borderRadius: 10,
    marginTop: '2.5%',
    marginBottom: '2%',
    borderColor: 'red',
    borderWidth: 1,
    // height: hp(4),
    // marginVertical: -20,
  },
  phoneNoTextCon: {
  
    paddingVertical: Platform.OS === 'android' ? hp(0.15) : hp(1.4),
    justifyContent: 'center',
    borderRadius: 10,
  },
  phoneNoInputcon: {
    paddingVertical: Platform.OS === 'android' ? hp(1.15) : hp(0.15),
 
  },
  codeTextStyle: {
    paddingVertical: Platform.OS === 'android' ? hp(0.15) : hp(0.15),
   
  },
  logoStyles: {
    height: hp(17),
    width: hp(17),
    resizeMode: 'contain',
    marginTop: hp(4),
  },
  contentContainer: {
    alignItems: 'center',
  },

  logoStyles: {
    height: hp(17),
    width: hp(17),
    resizeMode: 'contain',
    marginTop: hp(4),
    marginTop: hp(6),
  },
  contentContainer: {
    borderTopLeftRadius: hp(4),
    borderTopRightRadius: hp(4),
    alignItems: 'center',
  },

  mainContainer: {
    width: wp(87),
  },
  headingContainer: {
    justifyContent: 'center',
    marginTop: hp(2),
    marginBottom: hp(3),
  },
  inputContainer: {
    justifyContent: 'center',
  },
  labelContainer: {
    width: '100%',
    marginTop: hp(5),
  },
  forgotPassView: {
    width: wp('100%'),
    alignItems: 'flex-end',
    paddingRight: wp(8),
  },
  textView3: {
    marginTop: hp(0.4),
  },
  textStyle3: {
    color: 'red',
    fontSize: fonts.H10,
  },
  forgotPassStyle: {
    marginTop: hp(0.5),
    color: colors.WHITE,
    fontFamily: fontFamily.Mulish_Bold,
    fontSize: fonts.H9,
    paddingRight: wp(4),
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: hp(9),
    paddingBottom: hp(8),
  },
  headingStyle: {
    fontSize: fonts.H5,
    color: colors.WHITE,
    fontFamily: fontFamily.Mulish_Bold,
  },
  textStyleEmail: {
    fontSize: 14,
    color: colors.WHITE,
    fontFamily: fontFamily.Mulish_Bold,
  },
  textStyle: {
    fontSize: fonts.H6,
    color: colors.INPUT_PLACE_HOLDER_TEXT_COLOR,
    fontFamily: fontFamily.Mulish_Regular,
  },
  textStyle2: {
    color: 'red',
    fontFamily: fontFamily.Mulish_Regular,
    fontSize: fonts.H9,
  },
  bottomTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(2),
  },
});

export default styles;

// import colors from "../../../assets/colors/colors";
// import {StyleSheet} from "react-native";
// import {hp} from "../../../utils/CommonMethods";
// import fonts from "../../../assets/fonts/fonts";
// import fontFamily from "../../../assets/fonts/fontFamily";
//
// const styles = StyleSheet.create({
//     container:{
//         flex:1,
//     },
//     mainContainer:{
//         flex:1,
//         padding:hp(4),
//     },
//     headingContainer:{
//         flex:0.25,
//         // borderWidth:1
//     },
//     inputContainer:{
//         flex:0.4,
//         //borderWidth:1,
//         // justifyContent:"center",
//         alignItems:'center'
//     },
//     labelContainer:{
//       width:"100%",
//         marginTop:hp(1.7),
//         // paddingLeft:hp(1),
//     },
//     buttonContainer:{
//         flex:0.35,
//         // borderWidth:1,
//         paddingTop:hp(3),
//         justifyContent:"space-between",
//         alignItems:"center"
//
//     },
//     headingStyle:{
//         fontSize:fonts.H3,
//         color:colors.BUTTON_COLOR,
//         fontFamily:fontFamily.Mulish_SemiBold
//     },
//     textStyle:{
//         fontSize:fonts.H6,
//         color:colors.BLACK,
//         fontFamily:fontFamily.Mulish_Regular
//     },
//     bottomTextContainer:{
//         flexDirection:"row",
//     }
// });
//
// export default styles;
