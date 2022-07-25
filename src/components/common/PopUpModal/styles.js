import {Platform, StyleSheet} from 'react-native';
import {hp, wp} from '../../../utils/CommonMethods';
import colors from '../../../assets/colors/colors';
import fontFamily from '../../../assets/fonts/fontFamily';
import fonts from '../../../assets/fonts/fonts';
const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'center',
    flex: 1,
    //backgroundColor: 'black',
    // opacity: 0.8,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  absolute: {
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // bottom: 0,
    // right: 0,
    // flex: 1,
  },
  section2: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRightColor: 10,
    marginHorizontal: wp(5),
    backgroundColor: colors.WHITE,
    borderRadius: 20,
    paddingBottom: hp(2),
    paddingTop: hp(1),
    // padding: Platform.OS === 'ios' ? hp(2) : hp(3),
  },
  icon: {
    width: wp(10),
    height: hp(10),
  },
  mesText: {
    color: colors.BLACK,
    textAlign: 'center',
    fontSize: fonts.H10,
    marginHorizontal: wp(5),
    marginBottom: hp(2),
  },
});

export default styles;
