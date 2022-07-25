import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {ProfileIcon, ProfileIcon2} from '../../../assets/images/svg/SvgImages';
import SvgComponent from '../SvgCustomComponents/SvgCustomComponents';
import styles from './styles';
const Listitem = ({image, imageUri, title, subTitle, time, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.contianer}>
      <View style={styles.imagecontianer}>
        {image && (
          <Image
            resizeMode="contain"
            style={styles.imagestyle}
            source={image}
          />
        )}
        {imageUri ? (
          <Image
            // resizeMode="contain"
            style={styles.imagestyle}
            source={{uri: imageUri}}
          />
        ) : (
          <SvgComponent svgMarkup={ProfileIcon2} />
        )}
      </View>
      <View style={styles.textcontianer}>
        <Text style={styles.namestyle}>{title}</Text>
        <Text style={styles.emailstyle}>{subTitle}</Text>
      </View>
      <View style={styles.timecontianer}>
        <Text style={styles.timestyle}>{time}</Text>
      </View>
    </TouchableOpacity>
  );
};
export default Listitem;
