import React, {useState} from 'react';
import {View, ImageBackground, ScrollView, Text, Image} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {
  backArrow,
  docIcon,
  pdfIcon,
} from '../../../assets/images/svg/SvgImages';
import styles from './styles';
import images from '../../../assets/images/images';
import Header from '../../../components/common/Header/Header';
import CardItem from '../../../components/common/CardItem/CardItem';
import AppButton from '../../../components/common/AppButton';
import colors from '../../../assets/colors/colors';
import ViewDetailField from '../../../components/common/ViewDetailField/ViewDetailField';
import {hp} from '../../../utils/CommonMethods';
import SvgComponent from '../../../components/common/SvgCustomComponents/SvgCustomComponents';
import {Modal} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

const ServantDetails = ({navigation, route}) => {
  const [visibleZoomImageModal, setVisibleZoomImageModal] = useState([]);
  const [itemData, setItemDatta] = useState();
  // const {params} = useRoute();
  const {item} = route.params;
  console.log('====ietm==>>>>', item);
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
                // url: params.userImage,

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
          title="View worker details"
          textColor={colors.WHITE}
        />
      </View>
      {/* <View> */}
      <View style={styles.profileContainer}>
        <CardItem
          cardImageUri={item.profile_image}
          image={!item.profile_image && images.imagePlaceholder}
          cardHeading={item.first_name}
          cardText={item.servent_name?.name}
        />
        {/* </View> */}
      </View>
      <View style={styles.contentContainer}>
        <ImageBackground
          source={images.formBG}
          style={styles.formbackground}
          imageStyle={styles.formBG}>
          <View style={styles.inputContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <ViewDetailField Heading={'First Name'} Name={item.first_name} />
              <ViewDetailField Heading={'Last Name'} Name={item.last_name} />
              <ViewDetailField Heading={'Mobile Number'} Name={item.mobile} />
              <ViewDetailField Heading={'CNIC No.'} Name={item.cnic} />
              <ViewDetailField Heading={'Address'} Name={item.address} />
              <ViewDetailField
                Heading={'Worker Type'}
                Name={item.servent_name?.name}
              />
               {/* <ViewDetailField
                Heading={'Selected Property'}
                Name={item.servent_name?.name}
              /> */}
              <Text style={styles.uploadDocText}>{'Uploaded Documents'}</Text>

              {/* ///////////////////////////////////// */}

              <View
                style={{
                  height: hp(12),
                  flexDirection: 'row',
                  marginTop: hp(0.3),
                }}>
                <View
                  style={{
                    flex: 0.5,
                    height: hp(12),
                  }}>
                  <Text style={styles.docText1}>{'CNIC'}</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignSelf: 'center',
                    }}>
                    {item.cnic_images.map((cncImg, index) => (
                      <View style={{padding: hp(0.7)}}>
                        <Image
                          style={{
                            width: 50,
                            height: 50,
                            borderRadius: 10,
                            // borderWidth: 1,
                            marginTop: hp(0.2),
                          }}
                          source={{
                            uri: cncImg,
                          }}
                        />
                      </View>
                    ))}
                  </View>
                </View>
                <View
                  style={{
                    flex: 0.5,
                    alignItems: 'center',
                  }}>
                  <Text style={styles.docText1}>{'Police Report'}</Text>

                  <View
                    style={{
                      // flexDirection: 'row',
                      // borderWidth: 1,
                      width: 120,
                      borderRadius: 5,
                      padding: hp(0.3),
                      alignItems: 'center',
                      borderRightColor: colors.primaryTextColor,
                      marginTop: hp(0.2),
                    }}>
                    <View style={{}}>
                      {/* <SvgComponent
                        svgMarkup={
                          item.police_report_image === 'doc' ? docIcon : pdfIcon
                        }
                      /> */}
                      <Image
                        style={{
                          width: 50,
                          height: 50,
                          borderRadius: 10,
                          marginTop: hp(0.3),
                        }}
                        source={{
                          uri: item.police_report_image,
                        }}
                      />
                    </View>
                  </View>
                </View>
              </View>
              {item.servent_name?.name === 'Driver' && (
                <View
                  style={{
                    // borderWidth: 1,
                    height: hp(12),
                    flexDirection: 'row',
                  }}>
                  <View
                    style={{
                      flex: 0.5,
                      // borderWidth: 1,
                      alignItems: 'center',
                      // justifyContent: 'center',
                    }}>
                    <Text style={styles.docText1}>{'Driving Licence'}</Text>
                    <Image
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 10,
                        marginTop: hp(1),
                        // borderWidth: 1,
                      }}
                      source={{
                        uri: item.driving_licence,
                      }}
                    />
                  </View>
                </View>
              )}

              <AppButton
                title="OK"
                width="100%"
                onPress={() => navigation.navigate('ServantRegistration')}
                borderRadius={15}
              />
            </ScrollView>
          </View>
        </ImageBackground>
      </View>
    </ImageBackground>
  );
};

export default ServantDetails;
