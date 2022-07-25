import React from 'react';
import {View, Modal, Text} from 'react-native';
import styles from './styles';
// import {BlurView} from '@react-native-community/blur';
import AppButton from '../AppButton';
import {hp} from '../../../utils/CommonMethods';
import LottieView from 'lottie-react-native';

const PopUpModal = ({
  modalVisiblePopUp,
  source,
  messageText,
  title,
  onPress,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisiblePopUp}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
      }}>
      <View style={styles.modalContainer}>
        <View style={styles.section2}>
          <LottieView source={source} autoPlay loop style={styles.icon} />
          <Text style={styles.mesText}>{messageText}</Text>
          <AppButton
            title={title}
            onPress={onPress}
            width="35%"
            padding={hp(1)}
            borderRadius={20}
          />
        </View>
      </View>
    </Modal>
  );
};

export default PopUpModal;
