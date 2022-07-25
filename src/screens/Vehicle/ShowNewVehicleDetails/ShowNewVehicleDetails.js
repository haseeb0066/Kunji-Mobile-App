import React,{useState} from 'react';
import {View, ImageBackground, ScrollView, Text,TouchableOpacity} from 'react-native';
import {backArrow,crossIcon2} from '../../../assets/images/svg/SvgImages';

import styles from './styles';
import images from '../../../assets/images/images';
import Header from '../../../components/common/Header/Header';
import CardItem from '../../../components/common/CardItem/CardItem';
import AppButton from '../../../components/common/AppButton';
import colors from '../../../assets/colors/colors';
import CommonText from '../../../utils/CommonText';
import ViewDetailField from '../../../components/common/ViewDetailField/ViewDetailField';
import ImageViewer from 'react-native-image-zoom-viewer';
import SvgComponent from '../../../components/common/SvgCustomComponents/SvgCustomComponents';
import {Modal} from "react-native";
import {useRoute} from '@react-navigation/native';

const ShowNewVehicleDetails = ({navigation,route}) => {
  const {
    id,
    user_id,
    socity_id,
    image,
    registration_no,
    make,
    model,
    color,
    year,
    created_at,
    updated_at,
  } = route.params;
  const {params} = useRoute();
  const [visibleZoomImageModal, setVisibleZoomImageModal] = useState(false);
  return (
    <ImageBackground source={images.splash} style={styles.container}>
      <Modal visible={visibleZoomImageModal}>
     <View
          style={{
            flex: 1,
            // justifyContent: 'center',
            // alignItems: 'center',
            // backgroundColor: 'black',
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
                
                //url: params.userImage,
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
          title={CommonText.VIEW_VEHICLE_DETAILS}
          textColor={colors.WHITE}
        />
      </View>
      <View 
      style={styles.profileContainer}>
        <CardItem
          cardImageUri={image}
          image={!params.image && images.imagePlaceholder}
          cardHeading={make}
          cardText={registration_no}
          onPress={async()=> setVisibleZoomImageModal(true)}
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
                Heading={' Registration No.'}
                Name={registration_no}
              />
              <ViewDetailField Heading={CommonText.MAKE} Name={make} />
              <ViewDetailField Heading={CommonText.MODEL} Name={model} />
              <ViewDetailField Heading={CommonText.COLOR} Name={color} />
              <ViewDetailField Heading={CommonText.YEAR} Name={year} />
              <AppButton
                title={CommonText.DONE}
                width="100%"
                onPress={() => navigation.navigate('ManageMyVehicle')}
                borderRadius={15}
              />
            </ScrollView>
          </View>
        </ImageBackground>
      </View>
    </ImageBackground>
  );
};

export default ShowNewVehicleDetails;
