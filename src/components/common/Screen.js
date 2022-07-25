import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  StatusBar,
  Platform,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
let hasNotch = DeviceInfo.hasNotch();

function Screen({children, style}) {
  console.log('asd', hasNotch, StatusBar.currentHeight);
  return (
    <SafeAreaView style={[styles.screen, style]}>
      <View style={[styles.View, style]}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    // paddingTop:  Platform.OS === 'ios'? StatusBar.currentHeight : 0,
    flex: 1,
    // backgroundColor: 'transparent',
  },
  View: {
    flex: 1,
  },
});

export default Screen;
