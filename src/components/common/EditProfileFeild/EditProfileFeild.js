import React from 'react';
import {View, Text,TextInput} from 'react-native';
import styles from './styles';

const EditProfileFeild = ({Heading, Name}) => {
  return (
    <View style={styles.inputView}>
      <View style={styles.heading}>
        <Text style={styles.nameText}>{Heading}</Text>
      </View>
      <View style={styles.userText}>
        {/* <Text style={styles.showText}>{Name}</Text> */}
        <TextInput
        style={styles.input}
       // onChangeText={onChangeNumber}
        value={Name}
        placeholder="useless placeholder"
      //  keyboardType="numeric"
      />
      </View>
    </View>
  );
};

export default EditProfileFeild;