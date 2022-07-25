import {StyleSheet} from 'react-native';
import colors from '../../assets/colors/colors';
import {hp, wp} from '../../utils/CommonMethods';

const styles = StyleSheet.create({
  contianer: {
    flex: 1,
  },
  headercontianer: {
    ...Platform.select({
      android: {
        paddingTop: hp(3),
        paddingBottom: hp(2),
      },
      ios: {
        paddingBottom: hp(4),
      },
    }),
  },
  textstyle:{
    color:colors.WHITE,
    fontSize:hp(2.3),
    fontWeight: 'bold',
    paddingBottom: hp(2),
    left:hp(2.8)
  },
});

export default styles;