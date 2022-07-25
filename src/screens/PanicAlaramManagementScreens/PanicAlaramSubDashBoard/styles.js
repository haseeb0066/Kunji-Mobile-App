import {Platform, StyleSheet} from 'react-native';
import colors from '../../../assets/colors/colors';
import {hp, wp} from '../../../utils/CommonMethods';
import fonts from '../../../assets/fonts/fonts';
import fontFamily from '../../../assets/fonts/fontFamily';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // borderWidth:1
  },
  TopHeaderTextContainer: {
    marginTop: '4%',
   
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
    color: colors.BLACK,
  },
  headerView: {
    marginTop: Platform.OS === 'android' ? hp(1.8) : hp(0.5)
  },

  welcomeTextView: {
    width: '90%',
    flex: 0.5,
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
  // FlateMainViewStyle: {
  //   height: hp(11.85),
  //   width: hp(11.7),
  //   resizeMode: 'stretch2',
  //   marginTop: hp(1),
  //   justifyContent: 'center',
  // },

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

  },
  inputView: {
    borderRadius: 15,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        height: hp(5.5),
      },
      android: {
        height: hp(6),
      },
    }),
    marginVertical: 10,
    borderColor: colors.primary,
    backgroundColor: colors.WHITE,
    width:wp('85%'), 
    alignSelf:"center"
  },
  heading: {
    justifyContent: 'center',
    width: wp(65),
    height: hp(6),
  },
  nameText: {
    color: colors.primary,
    fontWeight: '500',
    fontSize: fonts.H10,
    left: wp(3),
  },
  userText: {
    justifyContent: 'center',
    alignItems: 'center',
    width: wp(18),
    height: hp(5.5),
  },
///////////////
// modal style
modalContainer: {
  flex: 1,
},
emptyContainer: {
  flex: 0.3,
},
modalContentContainer: {
  flex: 0.85,
},
inputContainer: {
  marginHorizontal: wp(4),
  flexDirection: 'column',
  paddingTop: hp(2),
  flex: 1,
},
vehicleSection: {
  justifyContent: 'center',
  alignItems: 'center',
},
vehicleTextHeading: {
  color: colors.primary,
  fontSize: fonts.H9,
  fontWeight: 'bold',
  marginVertical: hp(1),
},
uploadImageText: {
  color: colors.primary,
  fontSize: 10,
  paddingBottom: hp(2),
},
buttonContainer: {
  marginTop: hp(1),
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: hp(5),
},

});

export default styles;
