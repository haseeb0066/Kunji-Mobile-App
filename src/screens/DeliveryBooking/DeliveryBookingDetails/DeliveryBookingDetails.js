import React, {useState} from 'react';
import {
  View,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {backArrow, crossIcon2} from '../../../assets/images/svg/SvgImages';
import styles from './styles';
import images from '../../../assets/images/images';
import Header from '../../../components/common/Header/Header';
import CardItem from '../../../components/common/CardItem/CardItem';
import AppButton from '../../../components/common/AppButton';
import colors from '../../../assets/colors/colors';
import ViewDetailField from '../../../components/common/ViewDetailField/ViewDetailField';
import ImageViewer from 'react-native-image-zoom-viewer';
import SvgComponent from '../../../components/common/SvgCustomComponents/SvgCustomComponents';
import {Modal} from 'react-native';

const DeliveryBookingDetails = ({navigation}) => {
  const {params} = useRoute();
  const [visibleZoomImageModal, setVisibleZoomImageModal] = useState(false);
  return (
    <ImageBackground source={images.splash} style={styles.container}>
      <Modal visible={visibleZoomImageModal}>
        <View
          style={{
            flex: 1,
          }}>
          <ImageViewer
            renderHeader={() => (
              <TouchableOpacity
                onPress={() => setVisibleZoomImageModal(false)}
                style={{
                  top: 70,
                  position: 'absolute',
                  right: 30,
                  backgroundColor: 'black',
                  zIndex: 1,
                  borderRadius: 40,
                  padding: 8,
                }}>
                <SvgComponent svgMarkup={crossIcon2} />
              </TouchableOpacity>
            )}
            onSwipeDown={() => setVisibleZoomImageModal(false)}
            enableSwipeDown={true}
            enableImageZoom={true}
            imageUrls={[
              {
                // Simplest usage.
                url: params.image,

                props: {
                  // headers: ...
                },
              },
            ]}
          />
        </View>
      </Modal>
      <View style={styles.headerContainer}>
        <Header
          onLeftIconPress={() => {
            navigation.goBack();
          }}
          leftSvgIcon={backArrow(colors.WHITE)}
          title="Delivery booking details"
          textColor={colors.WHITE}
        />
      </View>
      <View style={styles.profileContainer}>
        <CardItem
          cardImageUri={params.image}
          image={!params.image && images.imagePlaceholder}
          cardHeading={params.vendor_id}
          // cardText={params.userInfo}
          onPress={async () => setVisibleZoomImageModal(true)}
        />
      </View>

      <View style={styles.contentContainer}>
        <ImageBackground
          source={images.formBG}
          style={styles.formbackground}
          imageStyle={styles.formBG}>
          <View style={styles.inputContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <ViewDetailField
                Heading={'Delivery Vendor'}
                Name={params.vendor_id}
              />
              <ViewDetailField
                Heading={'Order Number'}
                Name={params.order_no}
              />
              <ViewDetailField
                Heading={'Arrival Date From'}
                Name={params.arrival_date_from}
              />
              <ViewDetailField
                Heading={'Arrival Date To'}
                Name={params.arrival_date_to}
              />
              <ViewDetailField
                Heading={'Arrival Time From'}
                Name={params.arrival_time_form}
              />
              <ViewDetailField
                Heading={'Arrival Time To'}
                Name={params.arrival_time_to}
              />
              <View>
                <AppButton
                  title="OK"
                  width={'100%'}
                  onPress={() => navigation.navigate('AddDeliveryBooking')}
                  borderRadius={15}
                />
              </View>
            </ScrollView>
          </View>
        </ImageBackground>
      </View>
    </ImageBackground>
  );
};

export default DeliveryBookingDetails;
