import React from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import colors from '../../../assets/colors/colors';
import SvgComponent from '../SvgCustomComponents/SvgCustomComponents';
import styles from './styles';

const CardItem = ({
  cardHeading,
  cardText,
  cardSubInfo,
  cardImageUri,
  svgImage,
  image,
  cardBuliding,
  cardFloor,
  cardflat,
  onPress,
  onPressimage,
}) => {
  // console.log('sdsa', cardImageUri);
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {cardImageUri && (
        <Image
          // resizeMode="contain"
          source={cardImageUri && {uri: cardImageUri}}
          style={styles.imageStyle}
        />
      )}
      {image && (
        <Image
          // resizeMode="contain"
          source={image}
          style={styles.imageStyle}
        />
      )}

      {svgImage && (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            // /marginBottom: '8%',
            borderRadius: 50,
            borderWidth: 1,
            padding: 8,
            borderColor: colors.WHITE,
          }}>
          <SvgComponent svgMarkup={svgImage} />
        </View>
      )}

      <Text style={styles.heading}>{cardHeading}</Text>
      {cardBuliding && cardFloor && cardflat ? (
        <Text style={[styles.infoText]}>
          {cardBuliding}
          {' -'} {cardFloor}
          {' -'} {cardflat}
        </Text>
      ) : (
        <Text style={[styles.infoText]}>{cardSubInfo}</Text>
      )}
      {cardSubInfo && <Text style={styles.subInfo}>{cardText}</Text>}
    </TouchableOpacity>
  );
};

export default CardItem;
