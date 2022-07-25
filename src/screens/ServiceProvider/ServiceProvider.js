import React, {useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import images from '../../assets/images/images';
import styles from './styles';

import {useNavigation} from '@react-navigation/native';
import AppButton from '../../components/common/AppButton';

const data = [
  {
    id: 1,
    itemText: 'Mobile 1',
  },
  {
    id: 2,
    itemText: 'Mobile 2',
  },
  {
    id: 3,
    itemText: 'Telephone 1',
  },
  {
    id: 4,
    itemText: 'Broadband',
  },
];

const ServiceProvider = ({navigation}) => {
  const {navigate} = useNavigation();

  const [check, setCheck] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <View style={styles.listContainer}>
                <TouchableOpacity
                  style={[styles.listContentContainer, styles.shadowProp]}>
                  <Text>{item.itemText}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setCheck(!check)}
                  style={styles.ckeckBox}>
                  {check && <Image source={images.tickIcon} />}
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
      <View style={styles.headingContainer}>
        <Text style={styles.vistorlistText}>{'New Utility Registration'}</Text>
        <Text style={styles.infoText}>{'No new requests pending'}</Text>
      </View>
      <View style={styles.paymentContainer}>
        <Text style={styles.paymentText}>{'Payment Method'}</Text>
      </View>
      <View style={styles.cardConatiner}>
        <TouchableOpacity
          style={styles.cardSection}
          onPress={() => navigate('PaymentScreen')}>
          <Image source={images.cashCard} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.cardSection}>
          <Image source={images.cashIcone} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.cardSection}>
          <Image source={images.walletCard} />
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <AppButton title={'Submit'} width={'60%'} />
      </View>
    </View>
  );
};

export default ServiceProvider;
