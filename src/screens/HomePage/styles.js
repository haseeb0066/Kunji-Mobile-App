import {Platform, StyleSheet} from 'react-native';
import colors from '../../assets/colors/colors';
import {hp, wp} from '../../utils/CommonMethods';
import fonts from '../../assets/fonts/fonts';
import fontFamily from '../../assets/fonts/fontFamily';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  TopHeaderTextContainer: {
    marginTop: '4%',
    marginBottom: '4%',
  },
  TopHeaderText: {
    fontSize: fonts.H2,
    fontWeight: '700',
    textAlign: 'center',
    color: colors.WHITE,
  },
  SubHeaderTextContainer: {
    marginTop: '2%',
    marginBottom: '4%',
  },
  SubHeaderText: {
    fontSize: fonts.H5,
    fontWeight: '700',
    textAlign: 'left',
    marginLeft: '6%',
    color: colors.BLACK,
  },
  headerView: {
    marginTop: Platform.OS === 'android' ? hp(1.5) : 0, // width: wp(96),
    alignItems: 'center',
    width:'90%',
    paddingBottom:hp(1.3)
  
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
    justifyContent: 'center',
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
    width: wp('90%'),
  },
  FlatListMainView2: {
    flex: 0.5,
    resizeMode: 'cover',
    width: wp('90%'),
    alignItems: 'flex-start',
  },
  FlateMainViewStyle: {
    height: hp(11.85),
    width: hp(11.7),
    resizeMode: 'stretch2',
    marginTop: hp(1),
    justifyContent: 'center',
  },

  FView1: {},
  muldropDowView: {
    flex: 0.23,
    width: wp('90%'),
  },
  dropDowView1: {
    flex: 1,
  },
  drdwn1: {
    flex: 0.33,
    marginTop: Platform.OS == 'android' ? wp(-4) : wp(0),
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
  },
  BottumTabStyle: {},
});

export default styles;
