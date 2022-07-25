import React from 'react';
import {ImageBackground, Text, View} from 'react-native';
import images from '../../../assets/images/images';
import styles from './styles';
import SvgComponent from '../SvgCustomComponents/SvgCustomComponents';

const FamilyMemCard = ({cardText, imageIcon, svgIcon, svgRightIcon}) => {
  return (
    <View style={styles.cardView}>
      <ImageBackground source={images.home_card_bg_img} style={styles.imagView}>
        <SvgComponent svgMarkup={svgIcon} />
      </ImageBackground>

      <View style={styles.textView}>
        <Text style={styles.textStyle}>{cardText}</Text>
      </View>

      <View style={styles.rifgtIconView}>
        {svgRightIcon ? <SvgComponent svgMarkup={svgRightIcon} /> : null}
      </View>
    </View>
  );
};

export default FamilyMemCard;
