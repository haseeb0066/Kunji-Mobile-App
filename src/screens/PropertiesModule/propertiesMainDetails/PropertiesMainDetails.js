import React, {useEffect, useState} from 'react';
import styles from './styles';
import {
  Image,
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import * as Yup from 'yup';
import {launchImageLibrary} from 'react-native-image-picker';
import AppForm from '../../../components/common/FormComponents/AppForm';
import colors from '../../../assets/colors/colors';
import DropDownPicker from 'react-native-dropdown-picker';
import FamilyMemCard from '../../../components/common/FamilyMemberCard/FamilyMemCard';
import CardItem from '../../../components/common/CardItem/CardItem';
import Header from '../../../components/common/Header/Header';
import images from '../../../assets/images/images';
import ImageViewer from 'react-native-image-zoom-viewer';
import {
  arrowRihtIcon,
  UserIcon,
  FamilyProfileIcon,
  TanssntsIcon,
  BuildingIcon,
  backArrow,
  UploadIcon,
  closeIcon,
  crossIcon2,
  UploadedFiles,
  docIcon,
  pdfIcon,
} from '../../../assets/images/svg/SvgImages';
import DocumentPicker from 'react-native-document-picker';
import AppFromField from '../../../components/common/FormComponents/AppFormField';
import SubmitButton from '../../../components/common/FormComponents/SubmitButton';
import SvgComponent from '../../../components/common/SvgCustomComponents/SvgCustomComponents';
import PopUpModal from '../../../components/common/PopUpModal/PopUpModal';
import SuccessAnimation from '../../../assets/Animations/success.json';
import AppModalField from '../../../components/common/FormComponents/AppModalField';
import {hp} from '../../../utils/CommonMethods';
import SvgCustomComponents from '../../../components/common/SvgCustomComponents/SvgCustomComponents';
import {END_POINTS} from '../../../server/URL';
import apiClient from '../../../Api/client';
import {
  getlevelOneMapping,
  getlevelThreeMapping,
  getlevelTwoMapping,
} from '../../../server/ApiFunctions';
import useAuth from '../../../Auth/useAuth';
import Toast from 'react-native-toast-message';
import {useIsFocused} from '@react-navigation/native';
import {RadioGroup} from 'react-native-radio-buttons-group';
import CustomActivityIndicator from '../../../components/common/CustomActivityIndicator';

const PropertiesMainDetails = ({navigation}) => {
  const {navigate} = useNavigation();
  const isFocused = useIsFocused();
  const {getUserToken} = useAuth();
  const [modalVisible, setModalVisible] = useState(false);

  const [mediaUri, setMediaUri] = useState(null);
  const [popUpModalVisible, setPopUpModalVisible] = useState(false);
  const [cnic, setCnic] = useState([]);
  const [policeReport, setPoliceReport] = useState([]);
  const [residentailOpen, setResidentailOpen] = useState(false);
  const [residentailValue, setResidentailValue] = useState('');

  const [isLoading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [cncImages, setCncImages] = useState([]);
  const [items, setItems] = useState([]);
  const [UploadedFiles, setUploadedFiles] = useState([]);
  const [selectedZoomImage, setSelectedZoomImage] = useState([]);
  const [visibleZoomImageModal, setVisibleZoomImageModal] = useState(false);
  const openDocument = async () => {
    try {
      const res = await DocumentPicker.pick({
        allowMultiSelection: true,
        type: [
          DocumentPicker.types.pdf,
          DocumentPicker.types.doc,
          DocumentPicker.types.docx,
          DocumentPicker.types.images,
        ],
      });
      setUploadedFiles(res);
      console.log(res);
      // const result = await FileViewer.open(res[0].uri);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('document cancle ');
      } else if (DocumentPicker.isInProgress(err)) {
        console.log('document in process');
      } else {
        console.log(err, 'error');
      }
    } finally {
    }
  };
  const launchImageLibraryForCnc = async () => {
    try {
      let options = {
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };
      const response = await launchImageLibrary(options);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const selectedImages = response.assets;
        setCncImages(prev => [...prev, selectedImages[0]]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  function onPressRadioButton(radioButtonsArray) {
    console.log('asd', radioButtonsArray);
    setSelectedradioButton(
      radioButtonsArray.filter(btn => btn.selected === true)[0],
    );
    setRadioButtons(radioButtonsArray);
    // setCncImages([]);
  }
  const radioButtonsData = [
    {
      id: '1',
      label: 'Landlord',
      value: 'Landlord Agreement',
      labelStyle: {color: colors.primary, fontWeight: 'bold'},
      color: colors.primary,
      borderColor: colors.primary,
      selected: true,
    },
    {
      id: '2',
      label: 'Tenat',
      value: 'Tenancy Agreement',
      labelStyle: {color: colors.primary, fontWeight: 'bold'},
      color: colors.primary,
      borderColor: colors.primary,
    },
  ];
  const [radioButtons, setRadioButtons] = useState(radioButtonsData);
  const [selectedradioButton, setSelectedradioButton] = useState(
    radioButtonsData[0],
  );

  //=================  api states  ========
  const [selectSoceity, setSelectSoceity] = useState('');

  console.log('====residentailValue==console==>>>>', residentailValue);

  const initialValues = {
    floorNo: '',
    building: '',
    flatNo: '',
    // ResidentialStatus: '123',
  };
  const validationSchema = Yup.object({
    //  society: Yup.string().required('Society is required field'),
    floorNo: Yup.string().required('Floor no is required field'),
    building: Yup.string().required('Building is required field'),
    flatNo: Yup.string().required('Flatno is required field'),
    // ResidentialStatus: Yup.string().required(
    //   'Residential status is required field',
    // ),
  });

  //=============== society floor flat ==============
  const [sectorBuildingOpen, setSectorBuildingOpen] = useState('');
  const [sectorBuildingValue, setSectorBuildingValue] = useState('');
  const [sectorBuildingItem, setSectorBuildingItem] = useState([]);

  const [streetFloorOpen, setStreetFloorOpen] = useState('');
  const [streetFloorValue, setStreetFloorValue] = useState('');
  const [streetFloorItem, setStreetFloorItem] = useState([]);

  const [houseFlatOpen, setHouseFlatOpen] = useState('');
  const [houseFlatValue, setHouseFlatValue] = useState('');
  const [houseFlatItem, setHouseFlatItem] = useState([]);

  const [showImage, setShowImage] = useState(null);
  const [LoadingPost, setLoadingPost] = useState(false);
  const [profileDetails, setprofileDetails] = useState('');
  const [profileList, setProfileList] = useState([]);

  // gallary open function
  const _launchImageLibrary = async () => {
    try {
      let options = {
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };
      const response = await launchImageLibrary(options);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const selectedImages = response.assets;
        console.log(selectedImages);
        setMediaUri(selectedImages);
        setShowImage(selectedImages);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //============== profile API ============
  const getMappingLevelOneApi = async society_id => {
    // console.log('cite id', city_id);
    const token = await getUserToken();
    const result = await getlevelOneMapping(token, society_id);
    if (result.status) {
      setSectorBuildingItem(result.data);
      console.log('level one if', result);
    }
    // console.log('level one else', result);
  };
  const getMappingLevelTwoApi = async mapping_one_id => {
    const token = await getUserToken();
    const result = await getlevelTwoMapping(
      token,
      selectSoceity,
      mapping_one_id,
    );
    if (result.status) {
      console.log('level two if', result);
      setStreetFloorItem(result.data);
    }
    // console.log('level two data', result);
  };

  const getMappingLevelThreeApi = async mapping_two_id => {
    const token = await getUserToken();
    const result = await getlevelThreeMapping(
      token,
      selectSoceity,
      mapping_two_id,
    );
    if (result.status) {
      console.log('level three if', result);
      setHouseFlatItem(result.data);
    }
    // console.log('level three data', result);
  };

  const GetProfileAPI = async () => {
    // ViewProfile
    const result = await apiClient.get(END_POINTS.ViewProfile);
    if (result.ok) {
      setLoading(false);
      console.log('result GetProfileAPI ===>  ', result.data);
      setSelectSoceity(result.data.selected_society_id);
      getMappingLevelOneApi(result.data.selected_society_id);
      setprofileDetails(result.data);
      setMessage(result.data.message);
      // setParkingID(result);
      // setPopUpModalVisible(true);
    } else {
      setLoading(false);
      // console.log('erorr GetProfileAPI ===> ', result);
    }
  };

  //=============== post API ============

  const postPropertyAPI = async values => {
    console.log('asdasd', selectedradioButton.id);
    if (!mediaUri) {
      Toast.show({
        type: 'error',
        text1: 'Required',
        text2: 'Kindly upload your profile image',
        // topOffset: 100,
      });
    } else if (UploadedFiles.length < 1) {
      Toast.show({
        type: 'error',
        text1: 'Required',
        text2: 'Kindly upload the agreement documents',
        // topOffset: 100,
      });
    } else if (cncImages.length < 2) {
      Toast.show({
        type: 'error',
        text1: 'Required',
        text2: 'Kindly upload both front and back side of the CNIC',
        // topOffset: 100,
      });
    } else {
      const imageData = {
        uri: mediaUri[0]?.uri,
        name: mediaUri[0]?.fileName,
        type: mediaUri[0]?.type,
      };
      let formdata = new FormData();

      formdata.append('city_id', profileDetails.city_id);
      formdata.append('society_id', selectSoceity);

      formdata.append('mapping_one_id', values.building);
      formdata.append('mapping_two_id', values.floorNo);
      formdata.append('mapping_three_id', values.flatNo);

      UploadedFiles.forEach(fileDoc => {
        formdata.append('documents[]', fileDoc);
      });
      cncImages.forEach(cnc => {
        const CncimageData = {
          uri: cnc?.uri,
          name: cnc?.fileName,
          type: cnc?.type,
        };
        formdata.append('cnic[]', CncimageData);
      });
      // formdata.append('building_id', values.building);
      // formdata.append('flat_no', values.flatNo);
      formdata.append('reidential_status', selectedradioButton.id);
      formdata.append('property_image', imageData);

      console.log('result formdata ===>  ', formdata);
      setLoadingPost(true);
      const result = await apiClient.post(
        END_POINTS.AddPropertiesData,
        formdata,
      );
      if (result.ok) {
        setLoadingPost(false);
        console.log('result.ok AddPropertiesData ===>  ', result);
        setMessage(result.data.message);
        // setParkingID(result);
        setPopUpModalVisible(true);
        getPropertiesList();
      } else {
        setLoadingPost(false);
        console.log('err AddPropertiesData ===> ', result.data);
      }
    }
  };

  //================= Open documents ================
  const filterImageData = fileName => {
    const data = cncImages.filter(img => img.fileName !== fileName);
    console.log('here 1', data, fileName);
    setCncImages(data);
  };
  const removeFile = fileName => {
    const data = UploadedFiles.filter(file => file.name !== fileName);
    console.log('here 1', data, fileName);
    setUploadedFiles(data);
  };

  // open Documents

  //============== get properties list ==============

  const getPropertiesList = async () => {
    setLoading(true);
    const res = await apiClient.get(END_POINTS.getPropertiesList);
    console.log('getPropertiesList ==>  ', res.data.user_property_list);

    if (res.ok) {
      setLoading(false);
      setProfileList(res.data.user_property_list);
    } else {
      setLoading(false);
      console.log('res error ===>  ', res.data);
    }
  };

  useEffect(() => {
    getPropertiesList();
  }, [isFocused]);

  useEffect(() => {
    GetProfileAPI();
  }, []);
  console.log(visibleZoomImageModal);

  return (
    <ImageBackground
      resizeMode={'cover'}
      source={images.splash}
      style={styles.container}>
      {/* Modal start */}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <Modal visible={visibleZoomImageModal}>
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
                url: selectedZoomImage.uri,

                props: {
                  // headers: ...
                },
              },
            ]}
          />
        </Modal>
        <PopUpModal
          modalVisiblePopUp={popUpModalVisible}
          source={SuccessAnimation}
          onPress={() => {
            setPopUpModalVisible(false);
            setModalVisible(false);
          }}
          messageText={message}
          title="OK"
        />

        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : null}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.emptyContainer}
              onPress={() => setModalVisible(false)}></TouchableOpacity>
            <View style={styles.modalContentContainer}>
              <ImageBackground
                source={images.formBG}
                style={{flex: 1}}
                imageStyle={styles.formBG}>
                <View style={styles.familySection}>
                  <Text style={styles.familyText}>{'Add New Property'}</Text>
                  <TouchableOpacity onPress={_launchImageLibrary}>
                    {mediaUri ? (
                      <Image source={mediaUri} style={styles.profileImage} />
                    ) : (
                      <SvgComponent svgMarkup={FamilyProfileIcon} />
                    )}
                  </TouchableOpacity>
                  <Text style={styles.uploadText}>{'Upload Image'}</Text>
                </View>
                <KeyboardAvoidingView
                  style={{flex: 1}}
                  behavior={Platform.OS === 'ios' ? 'padding' : null}>
                  <ScrollView showsVerticalScrollIndicator={false}>
                    {profileDetails && (
                      <View style={styles.inputContainer}>
                        <AppForm
                          initialValues={initialValues}
                          validationSchema={validationSchema}
                          onSubmit={value => postPropertyAPI(value)}>
                          <AppModalField
                            label={`Select ${
                              profileDetails.societies_maps[0]?.mapping_type ===
                              'Vertical'
                                ? 'Building'
                                : 'Sector/Block'
                            }`}
                            placeholder={`Select ${
                              profileDetails.societies_maps[0]?.mapping_type ===
                              'Vertical'
                                ? 'Building'
                                : 'Sector/Block'
                            }`}
                            name="building"
                            open={sectorBuildingOpen}
                            value={sectorBuildingValue}
                            items={sectorBuildingItem}
                            setOpen={setSectorBuildingOpen}
                            setValue={setSectorBuildingValue}
                            setItems={setSectorBuildingItem}
                            schema={{
                              label: 'sector_block_building',
                              value: 'id',
                            }}
                            onChangeValue={value => {
                              {
                                value && getMappingLevelTwoApi(value);
                                // setSocietyValue(null);
                              }
                            }}
                          />
                          <AppModalField
                            label={`Select ${
                              profileDetails.societies_maps[0]?.mapping_type ===
                              'Vertical'
                                ? 'Street'
                                : 'Floor'
                            }`}
                            placeholder={`Select ${
                              profileDetails.societies_maps[0]?.mapping_type ===
                              'Vertical'
                                ? 'Street'
                                : 'Floor'
                            }`}
                            name="floorNo"
                            open={streetFloorOpen}
                            value={streetFloorValue}
                            items={streetFloorItem}
                            setOpen={setStreetFloorOpen}
                            setValue={setStreetFloorValue}
                            setItems={setStreetFloorItem}
                            schema={{
                              label: 'street_floor',
                              value: 'id',
                            }}
                            onChangeValue={value => {
                              {
                                value && getMappingLevelThreeApi(value);
                                // setSocietyValue(null);
                              }
                            }}
                          />
                          <AppModalField
                            label={`Select ${
                              profileDetails.societies_maps[0]?.mapping_type ===
                              'Vertical'
                                ? 'Flat No'
                                : 'House No'
                            }`}
                            placeholder={`Select ${
                              profileDetails.societies_maps[0]?.mapping_type ===
                              'Vertical'
                                ? 'Flat No'
                                : 'House No'
                            }`}
                            name="flatNo"
                            open={houseFlatOpen}
                            value={houseFlatValue}
                            items={houseFlatItem}
                            setOpen={setHouseFlatOpen}
                            setValue={setHouseFlatValue}
                            setItems={setHouseFlatItem}
                            schema={{
                              label: 'plot_home_apartment',
                              value: 'id',
                            }}
                          />

                          <Text style={styles.dropdownLable}>
                            Residential Status
                          </Text>

                          <RadioGroup
                            radioButtons={radioButtons}
                            onPress={onPressRadioButton}
                            layout="row"
                            containerStyle={styles.RadioButtonContainer}
                          />

                          <View style={styles.uploadIconContainer}>
                            {cncImages.length < 1 && (
                              <TouchableOpacity
                                style={styles.uploadSection}
                                onPress={launchImageLibraryForCnc}>
                                <SvgCustomComponents svgMarkup={UploadIcon} />
                                <Text style={styles.uploadText}>
                                  Upload CNIC
                                </Text>
                              </TouchableOpacity>
                            )}
                            {cncImages.length >= 1 && (
                              <View style={styles.uploadSection}>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                  }}>
                                  {cncImages.length >= 1 &&
                                    cncImages.map((image, index) => (
                                      <TouchableOpacity
                                        key={image.fileName}
                                        onPress={() => {
                                          console.log('asdasd open');
                                          setSelectedZoomImage(image);
                                          setVisibleZoomImageModal(true);
                                        }}
                                        style={{
                                          marginLeft: index === 1 ? '10%' : 0,
                                        }}>
                                        <Image
                                          style={{
                                            width: 40,
                                            height: 40,
                                            borderRadius: 10,
                                          }}
                                          source={image}
                                        />
                                        <TouchableOpacity
                                          style={styles.crossContainer}
                                          onPress={() =>
                                            filterImageData(image.fileName)
                                          }>
                                          <SvgComponent svgMarkup={closeIcon} />
                                        </TouchableOpacity>
                                      </TouchableOpacity>
                                    ))}

                                  {cncImages.length < 2 >= 1 && (
                                    <View
                                      style={{
                                        marginLeft: '10%',
                                      }}>
                                      <TouchableOpacity
                                        onPress={launchImageLibraryForCnc}>
                                        <Text
                                          style={{
                                            color: colors.BLACK,
                                            fontSize: 30,
                                            textAlign: 'center',
                                          }}>
                                          +
                                        </Text>
                                      </TouchableOpacity>
                                    </View>
                                  )}
                                </View>
                              </View>
                            )}
                            {UploadedFiles.length < 1 && (
                              <TouchableOpacity
                                style={styles.uploadSection}
                                onPress={openDocument}>
                                <SvgCustomComponents svgMarkup={UploadIcon} />
                                <Text style={styles.uploadText}>
                                  {selectedradioButton.value}
                                </Text>
                              </TouchableOpacity>
                            )}

                            {UploadedFiles.length >= 1 && (
                              <TouchableOpacity
                                style={styles.uploadSection}
                                onPress={openDocument}>
                                <ScrollView
                                  contentContainerStyle={{
                                    alignItems: 'flex-start',
                                    justifyContent: 'center',
                                    flex: 1,
                                  }}>
                                  {UploadedFiles.map(file => (
                                    <TouchableOpacity
                                      onPress={async () =>
                                        await FileViewer.open(file.uri)
                                      }
                                      key={file.uri}
                                      style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        marginTop: hp(0.2),
                                      }}>
                                      <View style={{marginRight: '2%'}}>
                                        <SvgComponent
                                          svgMarkup={
                                            file.type === 'application/pdf'
                                              ? pdfIcon
                                              : docIcon
                                          }
                                        />
                                      </View>

                                      <Text style={{color: colors.BLACK}}>
                                        {/* {file.uri.slice(
                                      file.uri.lastIndexOf('%') + 1,
                                    )} */}
                                        {file.name.slice(-10)}
                                      </Text>
                                      <TouchableOpacity
                                        onPress={() => removeFile(file.name)}
                                        style={{marginLeft: '2%'}}>
                                        <SvgComponent svgMarkup={closeIcon} />
                                      </TouchableOpacity>
                                    </TouchableOpacity>

                                    // <Text style={{color: 'red'}}>sadads</Text>
                                  ))}
                                </ScrollView>
                              </TouchableOpacity>
                            )}
                          </View>

                          <View style={styles.buttonContainer}>
                            <SubmitButton
                              // width={'100%'}
                              title="SAVE"
                              borderRadius={15}
                              loading={LoadingPost}
                            />
                          </View>
                        </AppForm>
                      </View>
                    )}
                  </ScrollView>
                </KeyboardAvoidingView>
              </ImageBackground>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
      {/* Modal end */}

      <View style={styles.headerContainer}>
        <Header
          onLeftIconPress={() => {
            navigation.goBack();
          }}
          leftSvgIcon={backArrow(colors.WHITE)}
        />
      </View>

      <View style={styles.logoContainer}>
        <View style={styles.cardView1}>
          {isLoading ? (
            <CustomActivityIndicator loading={isLoading} />
          ) : (
            <>
              <View style={styles.headingView1}>
                <Text style={styles.headingtextStyle}>
                  {'Manage my properties'}
                </Text>
              </View>
              <View style={styles.flatlistContainer}>
                <FlatList
                  data={profileList}
                  keyExtractor={item => item.id}
                  numColumns={3}
                  showsVerticalScrollIndicator={false}
                  renderItem={({item}) => {
                    // console.log('item list ===>  ', item);
                    return (
                      <View style={styles.flatlistSection}>
                        <CardItem
                          cardImageUri={item.property_image}
                          image={
                            !item.property_image && images.imagePlaceholder
                          }
                          cardHeading={item.society_name}
                          cardBuliding={item.mapping_level_one_name}
                          cardFloor={item.mapping_level_two_name}
                          cardflat={item.mapping_level_three_name}
                          onPress={() =>
                            navigation.navigate('ViewPropertiesDetails', {
                              userImage: item.property_image,
                              userName: item.society_name,
                              userInfo: item.socity_id,
                              cardBuliding: item.mapping_level_one_name,
                              cardFloor: item.mapping_level_two_name,
                              cardflat: item.mapping_level_three_name,
                              mappingType: item?.mapping_type,
                              role_type: item.role_type,
                            })
                          }
                        />
                      </View>
                    );
                  }}
                />
              </View>
            </>
          )}
        </View>
      </View>

      <ImageBackground
        source={images.formBG}
        style={styles.contentContainer}
        imageStyle={styles.formBG}>
        <View style={styles.cardView}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <FamilyMemCard
              cardText={'Add new properties'}
              svgRightIcon={arrowRihtIcon}
              svgIcon={BuildingIcon}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </ImageBackground>
  );
};
export default PropertiesMainDetails;
