import {StyleSheet} from 'react-native';
import colors from '../../assets/colors/colors';
import {hp, wp} from '../../utils/CommonMethods';
import fonts from '../../assets/fonts/fonts';
import fontFamily from '../../assets/fonts/fontFamily';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  headerView: {
    flex: 0.1,
    marginTop: hp(4),
    width: '90%',
  },

  welcomeTextView: {
    width: '90%',
    flex: 0.5,
     // borderWidth:1
  },
  mainView: {
    flex: 1,
  },
  textView: {
    flex: 0.2,
    justifyContent: 'center'
  },
  dropDowView: {
    flex: 0.2,
  },
  headingStyle: {
    fontSize: fonts.H2,
    color: colors.DEEP_PURPLE,
    fontFamily: fontFamily.Mulish_ExtraBold,
  },
  FlatListMainView: {
    flex: 0.6,
    resizeMode: 'cover',
    width:wp("90%"),
    // alignItems:"flex-start"

  },
  FlatListMainView2: {
    flex: 0.5,
    // borderWidth:1,
    resizeMode: 'cover',
    width:wp("90%"),
    alignItems:"flex-start"

  },
  FlateMainViewStyle: {
    height: hp(11.85),
    width: hp(11.7),
    resizeMode: 'stretch2',
    marginTop: hp(1),
    justifyContent: 'center',


  },

  FView1: {

  },
  muldropDowView: {
    flex: 0.23,
    width: wp('90%'),
  },
  dropDowView1: {
    flex: 1,
  },
  drdwn1: {
    flex: 0.33,
    marginTop: Platform.OS == 'android' ? wp(-4) : wp(0)

  },
  drdwn2: {
    flex: 0.33,
  },
  drdwn3: {
    flex: 0.33,
  },
  buttonTabBar: {
    flex: 0.3,
    width: wp('90%'),
    // borderWidth:1
  },
  BottumTabStyle: {
    // borderWidth:1,
    // backgroundColor:"red",
    // alignItems:"center"
  },
});

export default styles;
