import React from 'react';
import {View, StyleSheet, Image, TouchableHighlight, Text} from 'react-native';

import colors from '../../../assets/colors/colors';
import {hp, wp} from '../../../utils/CommonMethods';
import SvgComponent from '../SvgCustomComponents/SvgCustomComponents';

function BillListItem({
  title,
  subTitle,
  image,
  IconComponent,
  onPress,
  rightIcon,
  svgIcon,
  textStyle,
}) {
  return (
    <TouchableHighlight underlayColor={colors.primary} onPress={onPress}>
      <View style={styles.container}>
        {IconComponent}
        {image && <Image style={styles.image} source={image} />}
        <View style={{alignSelf: 'flex-start'}}>
          {svgIcon && <SvgComponent svgMarkup={svgIcon} />}
        </View>

        <View style={styles.detailsContainer}>
          <Text style={textStyle ? textStyle : styles.title} numberOfLines={1}>
            {title}
          </Text>
          {subTitle && (
            <Text style={styles.subTitle} numberOfLines={2}>
              {subTitle}
            </Text>
          )}
        </View>
        {/* {rightIcon && (
          <MaterialCommunityIcons
            color={colors.medium}
            name="chevron-right"
            size={25}
          />
        )} */}
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: hp(1.6),
    //  backgroundColor: colors.WHITE,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 13,
    justifyContent: 'center',
  },
  image: {
    width: 55,
    height: 55,
    borderRadius: 35,
  },
  subTitle: {
    color: 'grey',
    marginTop: '2%',
  },
  title: {
    fontWeight: '500',
    fontSize: hp(2.4),
  },
});

export default BillListItem;
