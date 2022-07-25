import React from 'react';
import TabShape from './TabShap';

import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import TabBarButton from './TabBarButton';
import {wp} from '../../../utils/CommonMethods';
import SvgComponent from '../../common/SvgCustomComponents/SvgCustomComponents';
import {
  panicAlarm,
  noticesIcon,
  pollIcon,
  userIcon,
  messageIcon,
  heartIcon,
  tabIconWallet,
  userIcon2,
  walletIcon,
} from '../../../assets/images/svg/SvgImages';
import colors from '../../../assets/colors/colors';
const TabBar = ({state, descriptors, navigation}) => {
  const renderIcon = (routeName, isFocused) => {
    if (routeName === 'Home')
      return (
        <SvgComponent
          svgMarkup={walletIcon(isFocused ? colors.WHITE : colors.secondary)}
        />
      );
    else if (routeName === 'Building')
      return (
        <SvgComponent
          svgMarkup={heartIcon(isFocused ? colors.WHITE : colors.secondary)}
        />
      );
    else if (routeName === 'Messages')
      return (
        <SvgComponent
          svgMarkup={messageIcon(isFocused ? colors.WHITE : colors.secondary)}
        />
      );
    else if (routeName === 'AppProfile')
      return (
        <SvgComponent
          svgMarkup={userIcon(isFocused ? colors.WHITE : colors.secondary)}
        />
      );
  };
  const TAB_HEIGHT = 60;
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View
      style={{
        position: 'absolute',
        height: TAB_HEIGHT,

        width: wp(85),
        // shadowOffset: {
        //   width: 0,
        //   height: 0,
        // },
        // shadowOpacity: 0.2,
        // elevation: 5,
        bottom: 30,
        alignItems: 'center',
        alignSelf: 'center',
        // borderRadius: 60,
        justifyContent: 'center',
        backgroundColor: 'transparent',
      }}>
      <TabShape />
      <View style={[StyleSheet.absoluteFill, {flexDirection: 'row'}]}>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {state.routes.map((route, index) => {
            const {options} = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;

            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            const onLongPress = () => {
              navigation.emit({
                type: 'tabLongPress',
                target: route.key,
              });
            };

            return (
              <TouchableOpacity
                key={index}
                accessibilityRole="button"
                activeOpacity={0.4}
                accessibilityState={isFocused ? {selected: true} : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={styles.button}>
                {options.tabBarButton ? (
                  <TabBarButton isFocused={isFocused ? true : false} />
                ) : (
                  // <Text style={isFocused ? styles.label : styles.inactiveLabel}>
                  //   {label}
                  // </Text>
                  <View style={{alignItems: 'center'}}>
                    {renderIcon(label, isFocused)}
                    {isFocused && (
                      <View
                        style={{
                          width: 2,
                          backgroundColor: 'red',
                          borderWidth: 3,
                          borderRadius: 50,
                          borderColor: colors.WHITE,
                          marginTop: 5,
                        }}
                      />
                    )}
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
};
export default TabBar;
const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    position: 'absolute',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    elevation: 5,

    justifyContent: 'center',
    bottom: 0,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    flex: 1,
    alignItems: 'center',
  },
  label: {
    color: 'purple',
    fontWeight: 'bold',
  },
  inactiveLabel: {
    color: 'gray',
    fontWeight: 'bold',
  },
});
