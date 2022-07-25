import Toast, {ErrorToast, BaseToast} from 'react-native-toast-message';
import colors from '../assets/colors/colors';
import React from 'react';
import {hp} from './CommonMethods';
export const toastConfig = {
  success: props => (
    <BaseToast
      {...props}
      text1Style={{
        fontSize: hp(1.9),
        fontWeight: '500',
        // fontFamily: fontFamily.DMSans_Regular,
      }}
      contentContainerStyle={{
        borderColor: colors.success,
        borderWidth: 0.5,
        //borderRadius: 10,
        // width: 230,
      }}
      style={{
        borderLeftColor: colors.success,
        borderWidth: 0.5,
        borderRadius: 10,
        borderColor: colors.success,
      }}
      text2Style={{
        fontSize: hp(1.4),
        //fontFamily: fontFamily.DMSans_Regular,
        color: colors.primary,
      }}
    />
  ),
  error: props => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: hp(1.9),
        fontWeight: '500',

        //fontFamily: fontFamily.DMSans_Regular,
      }}
      contentContainerStyle={{
        borderColor: colors.red,
        borderWidth: 0.5,
        borderRadius: 2,
      }}
      style={{
        borderLeftColor: colors.danger,
        borderWidth: 0.5,
        borderRadius: 8,
        borderColor: colors.danger,
      }}
      text2Style={{
        fontSize: hp(1.4),
        // fontFamily: fontFamily.DMSans_Regular,
        color: colors.red,
      }}
    />
  ),
  tomatoToast: ({text1, props}) => (
    <View style={{height: 60, width: '100%', backgroundColor: 'tomato'}}>
      <Text>{text1}</Text>
      <Text>{props.uuid}</Text>
    </View>
  ),
};
