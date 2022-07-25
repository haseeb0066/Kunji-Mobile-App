import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {Dimensions} from 'react-native';
const {height, width} = Dimensions.get('screen');

export function wp(value) {
  return widthPercentageToDP(value);
}

export function hp(value) {
  return heightPercentageToDP(value);
}
