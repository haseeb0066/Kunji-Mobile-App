import React, {useState} from 'react';
import {
  View,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  Modal,
} from 'react-native';
import styles from './styles';
import images from '../../../assets/images/images';
import Header from '../../../components/common/Header/Header';
import CardItem from '../../../components/common/CardItem/CardItem';
import AppButton from '../../../components/common/AppButton';
import {useRoute} from '@react-navigation/native';
import {backArrow, crossIcon2} from '../../../assets/images/svg/SvgImages';
import colors from '../../../assets/colors/colors';
import CommonText from '../../../utils/CommonText';
import ViewDetailField from '../../../components/common/ViewDetailField/ViewDetailField';
import ImageViewer from 'react-native-image-zoom-viewer';
import SvgComponent from '../../../components/common/SvgCustomComponents/SvgCustomComponents';

const VisitorDetails = ({navigation}) => {
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
          title="View visitor details"
          textColor={colors.WHITE}
        />
      </View>
      {/* <TouchableOpacity  
      onPress={async()=> setVisibleZoomImageModal(true)}
      style={styles.profileContainer}>  */}
      <View style={styles.profileContainer}>
        <CardItem
          cardImageUri={params.image}
          image={!params.image && images.imagePlaceholder}
          cardHeading={params.first_name}
          cardText={params.last_name}
          //  onPress={( )=>navigation.navigate('VisitorDetails')}
          onPress={async () => setVisibleZoomImageModal(true)}
        />
        {/* </TouchableOpacity> */}
      </View>
      <View style={styles.contentContainer}>
        <ImageBackground
          source={images.formBG}
          style={styles.formbackground}
          imageStyle={styles.formBG}>
          <View style={styles.inputContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <ViewDetailField Heading={'Pin Code'} Name={'2345676'} />
              <ViewDetailField
                Heading={'First Name'}
                Name={params.first_name}
              />
              <ViewDetailField Heading={'Last Name'} Name={params.last_name} />
              <ViewDetailField
                Heading={CommonText.MOBILE_NO}
                Name={params.mobile}
              />
              <ViewDetailField Heading={CommonText.EMAIL} Name={params.email} />
              <ViewDetailField
                Heading={CommonText.ARRIVAL_DATE}
                Name={params.arrival_date}
              />
              <ViewDetailField
                Heading={CommonText.ARRIVAL_TIME}
                Name={params.time_in}
              />
              <ViewDetailField
                Heading={CommonText.LEAVING_DATE}
                Name={params.leaving_date}
              />
              <ViewDetailField
                Heading={CommonText.LEAVING_TIME}
                Name={params.time_out}
              />
              <AppButton
                title="OK"
                width={'100%'}
                onPress={() => navigation.navigate('AddVisitor')}
                borderRadius={15}
              />
            </ScrollView>
          </View>
        </ImageBackground>
      </View>
    </ImageBackground>
  );
};

export default VisitorDetails;
