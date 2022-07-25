import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import moment from 'moment';

const PanicHistoryCard = ({source, name, address, dateandtime, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.contianer}>
      {/* <View style={styles.imagecontianer}>
        <Image resizeMode="contain" style={styles.imagestyle} source={source} />
      </View> */}
      <View style={styles.textcontianer}>
        <View style={styles.timestylcontiner}>
          <Text style={styles.namestyle}>{name}</Text>
          <Text style={styles.timestyle}>
            {moment(dateandtime).format('DD/MM/YYYY HH:mm')}
          </Text>
        </View>
        <View style={styles.addressstylcontiner}>
          <Text style={styles.emailstyle}>{address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default PanicHistoryCard;
