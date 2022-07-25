import React from 'react';
import {View, Text} from 'react-native';
import styles from './styles';

const ViewDetailField = ({Heading, Name}) => {
  return (
    <View style={styles.inputView}>
      <View style={styles.heading}>
        <Text style={styles.nameText}>{Heading}</Text>
      </View>
      <View style={styles.userText}>
        <Text style={styles.showText}>{Name}</Text>
      </View>
    </View>
  );
};

export default ViewDetailField;
