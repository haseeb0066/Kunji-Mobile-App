import React, {useEffect, useState} from 'react';
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

const ViewPropertiesDetails = ({navigation}) => {
  // const [data, setData] = useState()
  // console.log('======dataaaa=====>>>>>', data)
  // const getPropertyUsersData = async () => {
  //     try {
  //      const response = await fetch('https://reactnative.dev/movies.json');
  //      const json = await response.json();
  //       setData(json.movies);
  //    } catch (error) {
  //      console.error(error);
  //    } finally {
  //    }
  //  }
  //  useEffect(() => {
  //   getPropertyUsersData();

  //  }, []);

  const {params} = useRoute();
  const [visibleZoomImageModal, setVisibleZoomImageModal] = useState(false);
  console.log('params ==> ', params);
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
                url: params.userImage,

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
          title="View property details"
          textColor={colors.WHITE}
        />
      </View>
      <View style={styles.profileContainer}>
        <CardItem
          cardImageUri={params.userImage}
          image={!params.userImage && images.imagePlaceholder}
          cardHeading={params.userName}
          cardText={params.userInfo}
          cardBuliding={params.cardBuliding}
          cardFloor={params.cardFloor}
          cardflat={params.cardflat}
        />
      </View>
      <View style={styles.contentContainer}>
        <ImageBackground
          source={images.formBG}
          style={styles.formbackground}
          imageStyle={styles.formBG}>
          <View style={styles.inputContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {/* <ViewDetailField Heading={'Select City'} Name={'Lahore'} /> */}
              <ViewDetailField
                Heading={
                  params.mappingType === 'Vertical'
                    ? 'Building'
                    : 'Sector/Block'
                }
                Name={params.cardBuliding}
              />
              {/* params.mappingType === 'Vertical'
                    ? 'Building'
                    : 'Sector/Block'
                }
                  profileDetails.societies_maps[0]?.mapping_type ===
                              'Vertical'
                                ? 'Street'
                                : 'Floor' */}
              <ViewDetailField
                Heading={params.mappingType === 'Vertical' ? 'Street' : 'Floor'}
                Name={params.cardFloor}
              />
              <ViewDetailField
                Heading={
                  params.mappingType === 'Vertical' ? 'Flat No' : 'House No'
                }
                Name={params.cardflat}
              />
              <ViewDetailField
                Heading={'Residential Status'}
                Name={params.role_type}
              />
              <AppButton
                title="DONE"
                width="100%"
                onPress={() => navigation.navigate('PropertiesMainDetails')}
                borderRadius={15}
              />
            </ScrollView>
          </View>
        </ImageBackground>
      </View>
    </ImageBackground>
  );
};

export default ViewPropertiesDetails;
