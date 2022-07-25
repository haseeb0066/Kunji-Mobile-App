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
import CommonText from '../../../utils/CommonText';
import ViewDetailField from '../../../components/common/ViewDetailField/ViewDetailField';
import ImageViewer from 'react-native-image-zoom-viewer';
import SvgComponent from '../../../components/common/SvgCustomComponents/SvgCustomComponents';
import {Modal} from 'react-native';
import moment from 'moment';
//import {useRoute} from '@react-navigation/native';

const ShowTanantDetails = ({navigation, route}) => {
  // const {
  //   // profile_picture,
  //   // name,
  //   // mapping_level_one_name
  //   first_name,
  // } = route.params;
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
                url: params.user.profile_picture,

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
          title={'View tenant details'}
          textColor={colors.WHITE}
        />
      </View>
      <View style={styles.profileContainer}>
        <CardItem
          cardImageUri={params.user.profile_picture}
          image={!params.user.profile_picture && images.imagePlaceholder}
          cardHeading={params.user.name}
          cardText={params.mapping_level_one_name}
          cardSubInfo={params.user.mobile}
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
                Heading={'First Name'}
                Name={params.user.first_name}
              />
              <ViewDetailField
                Heading={'Last Name'}
                Name={params.user.last_name}
              />
              <ViewDetailField
                Heading={'Date Of Birth'}
                Name={moment(params.user.dob).format('YYYY-MM-DD')}
              />
              <ViewDetailField
                Heading={'Mobile Number'}
                Name={params.user.mobile}
              />
              <ViewDetailField
                Heading={'Select Property'}
                Name={params.mapping_level_one_name}
              />
              <ViewDetailField
                Heading={CommonText.TENANCY_START_DATE}
                Name={params.tenancy_start_date}
              />
              <ViewDetailField
                Heading={CommonText.TENANCY_END_DATE}
                Name={params.tenancy_end_date}
              />
              <AppButton
                title={CommonText.DONE}
                width="100%"
                onPress={() => navigation.navigate('TanantHome')}
                borderRadius={15}
              />
            </ScrollView>
          </View>
        </ImageBackground>
      </View>
    </ImageBackground>
  );
};

export default ShowTanantDetails;
