import React, {useState, useEffect} from 'react';
import {
  View,
  ImageBackground,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import images from '../../assets/images/images';
import Header from '../../components/common/Header/Header';
import CardItem from '../../components/common/CardItem/CardItem';
import AppButton from '../../components/common/AppButton';
import FileViewer from 'react-native-file-viewer';
import ImageViewer from 'react-native-image-zoom-viewer';
import {Modal} from 'react-native';

import {
  backArrow,
  docIcon,
  pdfIcon,
  crossIcon2,
} from '../../assets/images/svg/SvgImages';
import colors from '../../assets/colors/colors';
import SvgCustomComponents from '../../components/common/SvgCustomComponents/SvgCustomComponents';
import ViewDetailField from '../../components/common/ViewDetailField/ViewDetailField';
import {BASE_URL, END_POINTS} from '../../server/URL';
import apiClient from '../../Api/client';
import {hp, wp} from '../../utils/CommonMethods';
import {useRoute} from '@react-navigation/native';
import SvgComponent from '../../components/common/SvgCustomComponents/SvgCustomComponents';
import {useIsFocused} from '@react-navigation/native';


const ViewProfile = ({navigation}) => {
  const {params} = useRoute();
  const isFocused = useIsFocused();

  const [userDetails, setUserDetails] = useState();
  console.log('===userDetails===userDetails=>>>', userDetails);
  const [visibleZoomImageModal, setVisibleZoomImageModal] = useState(false);
  const [cnicImage, setCnicImage] = useState();
  const getViewProfileUsers = async () => {
    const result = await apiClient.get(END_POINTS.getProfileDetails);
    if (result.ok) {
      console.table('====Result==userDetails=ViewProfile===>>>>', result.data);
      setUserDetails(result.data);
      console.log(
        'userDetails.societies_maps.mapping_type',
        result.data.societies_maps[0]?.mapping_type,
      );
    } else console.log('error');
  };
  useEffect(() => {
    getViewProfileUsers();
  }, [isFocused]);

  //   const {params} = useRoute();
  const [check, setCheck] = useState(false);
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
                // url: params.document_file_name,
                url: cnicImage,
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
          title="View Profile"
          textColor={colors.WHITE}
          righttitle="edit"
          righttitleSize={hp(1.8)}
          righttextColor={colors.WHITE}
          onRightIconPress={()=>navigation.navigate('EditProfile')}
        />
      </View>
      {userDetails && (
        <View style={styles.profileContainer}>
          <CardItem
            cardImageUri={userDetails.profile_picture}
            cardHeading={userDetails.name}
            // cardText={userDetails.mobile}
          />
        </View>
      )}
      <View style={styles.contentContainer}>
        <ImageBackground
          source={images.formBG}
          style={styles.formbackground}
          imageStyle={styles.formBG}>
          {userDetails && (
            <View style={styles.inputContainer}>
              <ScrollView
                contentContainerStyle={{paddingBottom: hp(10)}}
                showsVerticalScrollIndicator={false}>
                <ViewDetailField
                  Heading={'First Name'}
                  Name={userDetails.first_name}
                />
                <ViewDetailField
                  Heading={'Last Name'}
                  Name={userDetails.last_name}
                />
                <ViewDetailField
                  Heading={'Mobile Number'}
                  Name={userDetails.mobile}
                />
                <ViewDetailField Heading={'Date Of Birth'} Name={'12/0/2022'} />
                <ViewDetailField Heading={'CNIC No.'} Name={userDetails.cnic} />
                <ViewDetailField
                  Heading={'Emergency Contact No'}
                  Name={userDetails.emergency_contact}
                />
                <ViewDetailField Heading={'City'} Name={userDetails.city_id} />
                <ViewDetailField
                  Heading={'Society'}
                  Name={userDetails.selected_society_name.name}
                />
                <ViewDetailField
                  Heading={
                    userDetails.societies_maps[0]?.mapping_type === 'Vertical'
                      ? 'Building'
                      : 'Sector/Block'
                  }
                  Name={userDetails.societies_maps[0]?.mapping_level_one_name}
                />
                <ViewDetailField
                  Heading={
                    userDetails.societies_maps[0]?.mapping_type === 'Vertical'
                      ? 'Street'
                      : 'Floor'
                  }
                  Name={userDetails.societies_maps[0]?.mapping_level_two_name}
                />
                <ViewDetailField
                  Heading={
                    userDetails.societies_maps[0]?.mapping_type === 'Vertical'
                      ? 'Flat No'
                      : 'House No'
                  }
                  Name={userDetails.societies_maps[0]?.mapping_level_three_name}
                />

                <View style={styles.inputView}>
                  <View style={styles.heading}>
                    <Text style={styles.nameText}>{'Residential Status'}</Text>
                  </View>

                  <View style={styles.userText}>
                    <Text style={styles.showText}>
                      {userDetails.societies_maps[0]?.residential_status}
                    </Text>
                  </View>
                </View>

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
                      height: hp(12),
                      // backgroundColor: 'yellow',
                    }}>
                    <Text style={styles.docText1}>{'CNIC'}</Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        // justifyContent: 'space-around',
                        alignSelf: 'center',
                      }}>
                      {userDetails.documents.map((image, index) => (
                        <View key={image.id}>
                          {image.document_type === 'cnic' && (
                            <TouchableOpacity
                              onPress={() => {
                                setCnicImage(image.document_file_name);
                                setVisibleZoomImageModal(true);
                              }}
                              style={{
                                paddingLeft: wp(2),
                                justifyContent: 'center',
                                marginTop: hp(1),
                              }}>
                              <Image
                                style={{
                                  width: 50,
                                  height: 50,
                                  borderRadius: 10,
                                }}
                                source={{
                                  uri:
                                    image.document_type === 'cnic' &&
                                    image.document_file_name,
                                }}
                              />
                            </TouchableOpacity>
                          )}
                        </View>
                      ))}
                    </View>
                  </View>
                  <View
                    style={{
                      flex: 0.5,
                      // borderWidth: 1,
                      height: hp(12),
                      backgroundColor: 'dark',
                      alignItems: 'center',
                      marginTop: hp(0.5),
                    }}>
                    <Text style={styles.docText}>{'TENANCY AGREEMENT'}</Text>

                    {userDetails.documents.map((docs, index) => (
                      <View key={docs.id}>
                        {(docs.document_type === 'Landlord documents' ||
                          docs.document_type === 'Tenant Documents') && (
                          <TouchableOpacity
                            onPress={async () =>
                              await FileViewer.open(docs.document_file_name)
                            }
                            key={docs.document_file_name}
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              marginTop: hp(0.8),
                              width: 150,
                              borderWidth: 1.2,
                              borderRadius: 4,
                              borderColor: colors.primaryTextColor,
                            }}>
                            <View
                              style={{
                                flexDirection: 'row',
                                padding: 2,
                              }}>
                              <View style={{marginRight: '2%'}}>
                                <SvgComponent
                                  svgMarkup={
                                    docs.file_type === 'doc' ? docIcon : pdfIcon
                                  }
                                />
                              </View>

                              <View
                                style={{
                                  height: 20,
                                  width: 120,
                                  justifyContent: 'center',
                                }}>
                                <Text style={{textAlign: 'center'}}>
                                  {docs.document_file_name.slice(-15)}
                                </Text>
                              </View>
                            </View>
                          </TouchableOpacity>
                        )}
                      </View>
                    ))}
                  </View>
                </View>

                {/* <AppButton title="SAVE" width="100%" borderRadius={15} /> */}
              </ScrollView>
            </View>
          )}
        </ImageBackground>
      </View>
    </ImageBackground>
  );
};

export default ViewProfile;
