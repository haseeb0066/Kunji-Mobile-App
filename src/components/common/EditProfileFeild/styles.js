import {StyleSheet} from 'react-native';
import {wp, hp} from '../../../utils/CommonMethods';
import colors from '../../../assets/colors/colors';
import fonts from '../../../assets/fonts/fonts';

const styles = StyleSheet.create({
  inputView: {
    borderRadius: 15,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    width: '100%',
    borderColor: colors.primary,
    backgroundColor: colors.WHITE,
    //height:hp(1)
  },
  heading: {
    justifyContent: 'center',
    marginVertical: hp(1.8),
    width: wp(43),
  },
  nameText: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: fonts.H10,
    width: wp(40),
    marginLeft: wp(3),
  },
  userText: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: hp(1.8),
    textAlign: 'center',
    width: wp(43),
   // borderWidth:1,
    borderColor:'red'
  },
  showText: {
    color: colors.placeHolderColor,
    fontSize: fonts.H10,
    width: wp(40),
    marginLeft: wp(2),
    textAlign: 'center',
  },
  input: {
   // height: 10,
  //  margin: 12,
  //  borderWidth: 1,
  //  padding: 5,
    //dffdfbackgroundColor:"red",
    justifyContent:"center",
  },
});

export default styles;
