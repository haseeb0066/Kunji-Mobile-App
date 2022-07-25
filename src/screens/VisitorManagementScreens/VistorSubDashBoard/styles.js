import {StyleSheet} from 'react-native';

import colors from '../../../assets/colors/colors';
import fontFamily from '../../../assets/fonts/fontFamily';
import fonts from '../../../assets/fonts/fonts';
import {hp, wp} from '../../../utils/CommonMethods';

const styles = StyleSheet.create({
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
    marginTop: hp(4),
    backgroundColor: 'red',
    // width: wp(96),
    // paddingBottom: hp(4),
    // // borderWidth:1,
    // height: hp(9),
    flex: 0.1,

    alignItems: 'center',
  },

  headingStyle: {
    fontSize: fonts.H2,
    color: colors.DEEP_PURPLE,
    fontFamily: fontFamily.Mulish_ExtraBold,
  },
});

export default styles;
