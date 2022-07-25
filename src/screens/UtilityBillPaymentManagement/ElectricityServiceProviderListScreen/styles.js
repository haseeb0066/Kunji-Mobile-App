import {StyleSheet, Platform} from 'react-native';
import {hp, wp} from '../../../utils/CommonMethods';

const styles = StyleSheet.create({
  SearchContainer: {
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: wp(95),
    alignSelf: 'center',
    //marginVertical: 200,
    padding: Platform.OS === 'ios' ? hp(1.4) : hp(0),
    borderRadius: 20,
    marginTop: hp(2),
  },
  searchIcon: {
    marginLeft: Platform.OS === 'ios' ? '2%' : '4%',
    marginRight: '4%',
  },
});

export default styles;
