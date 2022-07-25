import colors from '../../../assets/colors/colors';
import {Platform, StyleSheet} from 'react-native';
import {hp, wp} from '../../../utils/CommonMethods';
import fonts from '../../../assets/fonts/fonts';
import fontFamily from '../../../assets/fonts/fontFamily';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    // paddingLeft: wp(2),
    // ...Platform.select({
    //   android: {
    //     paddingTop: hp(3),
    //     paddingBottom: hp(2),
    //   },
    //   ios: {
    //     paddingBottom: hp(1),
    //   },
    // }),
    marginTop: Platform.OS === 'android' ? hp(1.5) : hp(0.5),
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: hp(2),
    marginTop: hp(3),
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
    height: hp(15),
    width: hp(15),
    resizeMode: 'contain',
  },
  contentContainer: {
    // flex: 0.73,
    // borderTopLeftRadius: hp(4),
    // borderTopRightRadius: hp(4),
    // backgroundColor: colors.WHITE,
  },

  mainContainer: {
    // flex: 1,
    padding: hp(1),
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  headingContainer: {
    //  marginTop: hp(3),
    // flex: 0.25,
    // width: wp(80),
    marginLeft: '7.5%',
  },
  inputContainer: {
    // flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(7),
    paddingBottom: hp(8),
  },
  labelContainer: {
    width: '100%',
    paddingTop: hp(1.6),
  },
  buttonContainer: {
    // flex: 0.45,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: hp(8),
    marginTop: hp(7),
  },
  headingStyle: {
    fontSize: fonts.H5,
    color: colors.WHITE,
    fontWeight: 'bold',
  },
  textStyleEmail: {
    fontSize: fonts.H8,
    color: colors.BLACK,
    fontFamily: fontFamily.Mulish_Regular,
    marginTop: hp(0.5),
  },
  textStyle: {
    fontSize: fonts.H6,
    color: colors.INPUT_PLACE_HOLDER_TEXT_COLOR,
    fontFamily: fontFamily.Mulish_Regular,
  },
  bottomTextContainer: {
    flexDirection: 'row',
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
