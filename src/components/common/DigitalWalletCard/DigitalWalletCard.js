import React from 'react';
import {View, Text} from 'react-native';
import styles from './styles';
const DigitalWalletCard = ({Heading, Info, Price}) => {
  return (
    <View style={styles.container}>
      <View style={[styles.cardContainer, styles.shadowProp, {elevation: 5}]}>
        <View style={styles.contentContainer}>
          <Text style={styles.headingText}>{Heading}</Text>
          <Text style={styles.info}>{Info}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>{Price}</Text>
        </View>
      </View>
    </View>
  );
};

export default DigitalWalletCard;
