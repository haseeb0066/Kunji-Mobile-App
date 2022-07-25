import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  ImageBackground,
  Modal,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Image,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {hp, wp} from '../../../utils/CommonMethods';
import DocumentPicker from 'react-native-document-picker';
import {
  UploadIcon,
  backArrow,
  closeIcon,
  FamilyProfileIcon,
  crossIcon2,
  docIcon,
  pdfIcon,
} from '../../../assets/images/svg/SvgImages';
import * as Yup from 'yup';
import styles from './styles';
import images from '../../../assets/images/images';
import colors from '../../../assets/colors/colors';
import CardItem from '../../../components/common/CardItem/CardItem';
import Header from '../../../components/common/Header/Header';
import AppButton from '../../../components/common/AppButton';
import CommonText from '../../../utils/CommonText';
import PopUpModal from '../../../components/common/PopUpModal/PopUpModal';
import AppForm from '../../../components/common/FormComponents/AppForm';
import AppFromField from '../../../components/common/FormComponents/AppFormField';
import SubmitButton from '../../../components/common/FormComponents/SubmitButton';
import SvgComponent from '../../../components/common/SvgCustomComponents/SvgCustomComponents';
import SuccessAnimation from '../../../assets/Animations/success.json';
import AppModalField from '../../../components/common/FormComponents/AppModalField';
import ImageViewer from 'react-native-image-zoom-viewer';
import {END_POINTS} from '../../../server/URL';
import apiClient from '../../../Api/client';
import Toast from 'react-native-toast-message';
import CustomActivityIndicator from '../../../components/common/CustomActivityIndicator';

const ServantRegistration = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [popUpModalVisible, setPopUpModalVisible] = useState(false);
  const [profileImage, setProfileImage] = useState(false);
  const [selectedZoomImage, setSelectedZoomImage] = useState([]);
  const [visibleZoomImageModal, setVisibleZoomImageModal] = useState([]);
  const [cnic, setCnic] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [policeReport, setPoliceReport] = useState([]);
  const [drivingLicense, setDrivingLicense] = useState([]);
  const [workerTypeItem, setWorkerTypeItem] = useState();
  const [workerTypeValue, setWorkerTypeValue] = useState();
  // console.log('===workerTypeValue===dropdown>>>', workerTypeValue);
  // property 
  const [allocate, setItemsAllocateparking] = useState([]);
  

  const [propertyOpen, setPropertyOpen] = useState(false);
  const [propertyValue, setPropertyValue] = useState(null);
  const [propertyItem, setPropertyItem] = useState([]);
  console.log('===5555===5=5==5=5=5=5=>>>>>', propertyItem[0]?.id)



  const [workerTypeOpen, setWorkerTypeOpen] = useState(false);
  const [nameItem, setNameItem] = useState();
  const [getServantListApi, setGetServantListApi] = useState();
  const [reloadData, setReloadData] = useState(false);

  // Get Servant List API
  const getServantList = async () => {
    setLoading(true);
    const result = await apiClient.get(END_POINTS.getServantList);
    if (result.ok) {
      setLoading(false);
      setGetServantListApi(result.data);
    } else {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: result.data.message,
      });
    }
  };
  useEffect(() => {
    getServantList();
  }, [reloadData]);

  // property
  const getProperty = async () => {
    const res = await apiClient.get(END_POINTS.societyList);

    if (res.ok) {
    console.log('getProperty ==>  ', res.data.select_property_and_parking);
      setPropertyItem(res.data.select_property_and_parking);
    } else {
      console.log('res error ===>  ', res.data);
    }
  };

  useEffect(() => {
    getProperty();
  }, []);
  const getParkingApi = async value => {
    console.log('parking receive id ==> ', value);
    const result = await apiClient.get(
      END_POINTS.societyParking + `?parking_id=${value}`,
    );
    if (result.ok) {
      console.log('result.ok ===>  ', result.data);
      setItemsAllocateparking(result.data);
    } else {
      console.log('erorrrr ===> ', result);
    }
  };

  // get Servant Type API
  const getServantType = async () => {
    const result = await apiClient.get(END_POINTS.servantTypeapi);
    if (result.ok) {
      setWorkerTypeItem(result.data);
    } else console.log('error', result.data);
  };
  useEffect(() => {
    getServantType();
  }, []);

  // post API

  const NewServantRegistration = async value => {
    console.log('submit data', value.workerType);
    if (cnic.length < 2) {
      Toast.show({
        type: 'error',
        text1: 'Required',
        text2: 'Kindly upload both front and back side of the CNIC',
        // topOffset: 100,
      });
    } else if (policeReport.length < 1) {
      Toast.show({
        type: 'error',
        text1: 'Required',
        text2: 'Kindly upload your Police Report Img',
        // topOffset: 100,
      });
    } else if (nameItem?.name === 'Driver') {
      if (drivingLicense.length < 1) {
        Toast.show({
          type: 'error',
          text1: 'Required',
          text2: 'Kindly upload your Driving Licence',
          // topOffset: 100,
        });
      } else {
        setLoading(true);
        var formdata = new FormData();
        formdata.append('first_name', value.firstName);
        formdata.append('last_name', value.lastName);
        formdata.append('mobile', value.mobileNo);
        formdata.append('cnic', value.cnicNo);
        formdata.append('address', value.address);
        formdata.append('servet_type', value.workerType);
        formdata.append('id', propertyItem[0]?.id)
        // Upload Profile Image
        // profileImage.forEach(img => {
        const profImg = {
          name: profileImage[0]?.fileName,
          uri: profileImage[0]?.uri,
          type: profileImage[0]?.type,
        };
        formdata.append('profile_image', profImg);
        // });
        //upload for cnic images
        cnic.forEach(cnc => {
          const CncimageData = {
            uri: cnc?.uri,
            name: cnc?.fileName,
            type: cnc?.type,
          };
          formdata.append('cnic_images[]', CncimageData);
        });

        //upload for Police Report
        const policeImageReport = {
          uri: policeReport[0]?.uri,
          name: policeReport[0]?.fileName,
          fileType: policeReport[0]?.type,
        };
        formdata.append('police_report', policeImageReport);

        // policeReport.forEach(fileDoc => {
        //   formdata.append('police_report', fileDoc);
        // });

        // Upload For Driving Licence
        if (nameItem?.name === 'Driver') {
          drivingLicense.forEach(cnc => {
            const drivingLicenceImg = {
              uri: cnc?.uri,
              name: cnc?.fileName,
              type: cnc?.type,
            };
            formdata.append('driving_licence', drivingLicenceImg);
          });
        }
        const result = await apiClient.post(END_POINTS.addNewServant, formdata);

        if (result.ok) {
          setLoading(false);
          Toast.show({
            type: 'success',
            text1: 'Added Successfully',
          });
          setModalVisible(false);
          setReloadData(true);
        } else {
          console.log('api_error', result.data);
          setLoading(false);
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: result.data.message,
          });
        }

        console.log('====formData===>>===formData===>>>>', formdata);
      }
    } else {
      setLoading(true);
      var formdata = new FormData();
      formdata.append('first_name', value.firstName);
      formdata.append('last_name', value.lastName);
      formdata.append('mobile', value.mobileNo);
      formdata.append('cnic', value.cnicNo);
      formdata.append('address', value.address);
      formdata.append('servet_type', value.workerType);
      formdata.append('id', propertyItem[0]?.id)

      const profImg = {
        name: profileImage[0]?.fileName,
        uri: profileImage[0]?.uri,
        type: profileImage[0]?.type,
      };
      formdata.append('profile_image', profImg);
      // Upload Profile Image
      // profileImage.forEach(img => {
      //   const profImg = {
      //     name: img?.fileName,
      //     uri: img?.uri,
      //     type: img?.type,
      //   };
      //   formdata.append('profile_image', profImg);
      // });
      //upload for cnic images
      cnic.forEach(cnc => {
        const CncimageData = {
          uri: cnc?.uri,
          name: cnc?.fileName,
          type: cnc?.type,
        };
        formdata.append('cnic_images[]', CncimageData);
      });

      //upload for Police Report
      const policeImageReport = {
        uri: policeReport[0]?.uri,
        name: policeReport[0]?.fileName,
        fileType: policeReport[0]?.type,
      };
      formdata.append('police_report', policeImageReport);

      // policeReport.forEach(fileDoc => {
      //   formdata.append('police_report', fileDoc);
      // });

      // Upload For Driving Licence
      if (nameItem?.name === 'Driver') {
        drivingLicense.forEach(cnc => {
          const drivingLicenceImg = {
            uri: cnc?.uri,
            name: cnc?.fileName,
            type: cnc?.type,
          };
          formdata.append('driving_licence', drivingLicenceImg);
        });
      }
      const result = await apiClient.post(END_POINTS.addNewServant, formdata);

      if (result.ok) {
        setLoading(false);
        console.log('==resssssss==>>', result.data);
        Toast.show({
          type: 'success',
          text1: 'Added Successfully',
        });
        setModalVisible(false);
      } else {
        console.log('api_error', result.data);
        setLoading(false);
      }

      console.log('====formData===>>===formData===>>>>', formdata);
    }
  };
  // remove cnic upload images
  const removeCnicList = fileName => {
    const data = cnic.filter(img => img.fileName !== fileName);
    setCnic(data);
  };
  // remove police report image
  const removePoliceReportList = fileName => {
    const data = policeReport.filter(img => img.fileName !== fileName);
    setPoliceReport(data);
  };
  // remove driving license image
  const removeDrivingLicenseList = fileName => {
    const data = drivingLicense.filter(img => img.fileName !== fileName);
    setDrivingLicense(data);
  };

  // open Documents
  const uploadDocumentImageAndDocuments = async () => {
    try {
      const res = await DocumentPicker.pickMultiple({
        // allowMultiSelection: boolean,
        type: [
          DocumentPicker.types.images,
          DocumentPicker.types.pdf,
          DocumentPicker.types.doc,
          DocumentPicker.types.docx,
        ],
      });
      if (policeReport.length) setPoliceReport(prev => [...prev, res[0]]);
      else setPoliceReport(res);
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

  const initialValues = {
    firstName: '',
    lastName: '',
    mobileNo: '',
    cnicNo: '',
    address: '',
    workerType: '',
  };
  const validationSchema = Yup.object({
    firstName: Yup.string().required('First name is required field'),
    lastName: Yup.string().required('Last name is required field'),
    mobileNo: Yup.string().required('Mobile no is required field'),
    cnicNo: Yup.string()
      .required('Cnic is required field')
      .matches('^[0-9]{5}-[0-9]{7}-[0-9]$', 'CNC should be valid'),
    address: Yup.string().required('Address is required field'),
    workerType: Yup.string().required('Please select a worker type'),
  });
  // profile select image
  const galleryOpenForProfile = async () => {
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
        setProfileImage(selectedImages);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // gallary open function
  const galleryOpenForCnic = async () => {
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
        setCnic(prev => [...prev, selectedImages[0]]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // police report select images
  const galleryOpenPoliceReport = async () => {
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
        setPoliceReport(prev => [...prev, selectedImages[0]]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // gallery open for driving

  const galleryOpenDrivingLicense = async () => {
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
        setDrivingLicense(prev => [...prev, selectedImages[0]]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ImageBackground source={images.splash} style={styles.container}>
      {/* modal start */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <PopUpModal
          modalVisiblePopUp={popUpModalVisible}
          source={SuccessAnimation}
          onPress={() => {
            setPopUpModalVisible(false);
            setModalVisible(false);
          }}
          messageText={'Worker Registration has been Submitted Successfully!'}
          title="OK"
        />
        <View style={styles.modalContainer}>
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
                    url: selectedZoomImage.uri,

                    // props: {},
                  },
                ]}
              />
            </View>
          </Modal>
          <KeyboardAvoidingView
            style={{flex: 1}}
            behavior={Platform.OS === 'ios' ? 'padding' : null}>
            <TouchableOpacity
              style={styles.emptyContainer}
              onPress={() => setModalVisible(false)}></TouchableOpacity>
            <View style={styles.modalContentContainer}>
              <ImageBackground
                source={images.formBG}
                style={{flex: 1, paddingTop: hp(1)}}
                imageStyle={styles.formBG}>
                {/*  */}
                <View style={styles.headingSection}>
                  <Text style={styles.headingText}>
                    {CommonText.Worker_Registration}
                  </Text>
                  <TouchableOpacity onPress={galleryOpenForProfile}>
                    {profileImage ? (
                      <Image
                        source={profileImage}
                        style={styles.profileImage}
                      />
                    ) : (
                      <SvgComponent svgMarkup={FamilyProfileIcon} />
                    )}
                  </TouchableOpacity>
                  <Text style={styles.uploadText}>{'Upload Image'}</Text>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <View style={styles.inputContainer}>
                    <AppForm
                      initialValues={initialValues}
                      validationSchema={validationSchema}
                      onSubmit={NewServantRegistration}>
                      <AppFromField
                        label="First Name"
                        width={'100%'}
                        placeholderTextColor={colors.placeHolderColor}
                        placeholder="First Name"
                        autoCapitalize="none"
                        autoCorrect={false}
                        name="firstName"
                        keyboardType="email-address"
                        TextContentType="emailAddress"
                        borderColor={colors.red}
                        borderWidth={1}
                        borderRadius={15}
                      />
                      <AppFromField
                        label="Last Name"
                        width={'100%'}
                        placeholderTextColor={colors.placeHolderColor}
                        placeholder="Last Name"
                        autoCapitalize="none"
                        autoCorrect={false}
                        name="lastName"
                        keyboardType="email-address"
                        TextContentType="emailAddress"
                        borderColor={colors.red}
                        borderWidth={1}
                        borderRadius={15}
                      />
                      <AppFromField
                        label="Mobile No"
                        width={'100%'}
                        placeholderTextColor={colors.placeHolderColor}
                        placeholder="Mobile No."
                        autoCapitalize="none"
                        autoCorrect={false}
                        name="mobileNo"
                        keyboardType="numeric"
                        TextContentType="emailAddress"
                        borderColor={colors.red}
                        borderWidth={1}
                        borderRadius={15}
                      />
                      <AppFromField
                        label="CNIC No."
                        width={'100%'}
                        placeholderTextColor={colors.placeHolderColor}
                        autoCapitalize="none"
                        autoCorrect={false}
                        name="cnicNo"
                        maskInput={true}
                        keyboardType="numeric"
                        TextContentType="emailAddress"
                        borderColor={colors.red}
                        borderWidth={1}
                        borderRadius={15}
                      />
                      <AppFromField
                        label="Address"
                        width={'100%'}
                        placeholderTextColor={colors.placeHolderColor}
                        placeholder="Address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        name="address"
                        keyboardType="email-address"
                        TextContentType="emailAddress"
                        borderColor={colors.red}
                        borderWidth={1}
                        borderRadius={15}
                      />
                         <AppModalField
                        label={'Select Property'}
                        placeholder={'Select Property'}
                        name="selectProperty"
                        schema={{
                          label: 'society_name',
                          value: 'id',
                        }}
                        open={propertyOpen}
                        value={propertyValue}
                        items={propertyItem}
                        setOpen={setPropertyOpen}
                        setValue={setPropertyValue}
                        setItems={setPropertyItem}
                        onChangeValue={value => {
                          {
                            value && getParkingApi(value);
                            // setSocietyValue(null);
                          }
                        }}
                      />
                      <AppModalField
                        schema={{
                          label: 'name',
                          value: 'id',
                        }}
                        label={'Worker Type'}
                        placeholder="Worker Types"
                        name="workerType"
                        open={workerTypeOpen}
                        value={workerTypeValue}
                        items={workerTypeItem}
                        setOpen={setWorkerTypeOpen}
                        setValue={setWorkerTypeValue}
                        setItems={setWorkerTypeItem}
                        listMode="MODAL"
                        onSelectItem={value => {
                          setNameItem(value);
                        }}
                      />
                      <Text style={styles.dropdownLable}>Upload Documents</Text>
                      {/*  */}
                      <View style={styles.uploadIconContainer}>
                        {cnic.length < 1 && (
                          <TouchableOpacity
                            style={styles.uploadSection}
                            onPress={galleryOpenForCnic}>
                            <SvgComponent svgMarkup={UploadIcon} />
                            <Text style={styles.uploadTextDoc}>
                              {'Upload CNIC'}
                            </Text>
                          </TouchableOpacity>
                        )}
                        {cnic.length >= 1 && (
                          <View style={styles.uploadSection}>
                            <View style={styles.selectContainer}>
                              {cnic.length >= 1 &&
                                cnic.map(image => (
                                  <TouchableOpacity
                                    key={image.fileName}
                                    onPress={() => {
                                      setSelectedZoomImage(image);
                                      setVisibleZoomImageModal(true);
                                    }}
                                    style={styles.imageContainer}>
                                    <Image
                                      style={styles.imageStyle}
                                      source={image}
                                    />
                                    <TouchableOpacity
                                      style={styles.crossContainer}
                                      onPress={() =>
                                        removeCnicList(image.fileName)
                                      }>
                                      <SvgComponent svgMarkup={closeIcon} />
                                    </TouchableOpacity>
                                  </TouchableOpacity>
                                ))}
                              {cnic.length < 2 >= 1 && (
                                <View style={styles.imageContainer}>
                                  <TouchableOpacity
                                    onPress={galleryOpenForCnic}>
                                    <Text style={styles.plusStyle}>{'+'}</Text>
                                  </TouchableOpacity>
                                </View>
                              )}
                            </View>
                          </View>
                        )}
                        {policeReport.length < 1 && (
                          <TouchableOpacity
                            style={styles.uploadSection}
                            onPress={galleryOpenPoliceReport}>
                            <SvgComponent svgMarkup={UploadIcon} />
                            <Text style={styles.uploadTextDoc}>
                              {'Upload Police Report'}
                            </Text>
                          </TouchableOpacity>
                        )}

                        {policeReport.length >= 1 && (
                          <TouchableOpacity
                            style={styles.uploadSection}
                            onPress={galleryOpenPoliceReport}>
                            <ScrollView
                              contentContainerStyle={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                flex: 1,
                              }}>
                              {policeReport.map(file => (
                                <TouchableOpacity
                                  key={file.id}
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
                                    {/* <SvgComponent
                                      svgMarkup={
                                        file.type === 'application/pdf'
                                          ? pdfIcon
                                          : docIcon
                                      }
                                    /> */}
                                    <Image
                                      style={styles.imageStyle}
                                      source={file}
                                    />
                                  </View>

                                  <Text style={{color: colors.BLACK}}>
                                    {file.fileName.slice(-10)}
                                  </Text>
                                  <TouchableOpacity
                                    onPress={() =>
                                      removePoliceReportList(file.fileName)
                                    }
                                    style={{marginLeft: '2%'}}>
                                    <SvgComponent svgMarkup={closeIcon} />
                                  </TouchableOpacity>
                                </TouchableOpacity>
                              ))}
                            </ScrollView>
                          </TouchableOpacity>
                        )}
                      </View>
                      {/* 2nd */}
                      {nameItem?.name === 'Driver' && (
                        <React.Fragment>
                          <View
                            style={[
                              styles.uploadIconContainer,
                              {
                                justifyContent: 'flex-start',
                                left: '1%',
                                marginTop: hp(1),
                              },
                            ]}>
                            {drivingLicense.length < 1 && (
                              <TouchableOpacity
                                style={styles.uploadSection}
                                onPress={galleryOpenDrivingLicense}>
                                <SvgComponent svgMarkup={UploadIcon} />
                                <Text style={styles.uploadTextDoc}>
                                  {'Driving License'}
                                </Text>
                              </TouchableOpacity>
                            )}
                            {/*  */}
                            {drivingLicense.length >= 1 && (
                              <View style={styles.uploadSection}>
                                <View style={styles.selectContainer}>
                                  {drivingLicense.length >= 1 &&
                                    drivingLicense.map(image => (
                                      <TouchableOpacity
                                        key={image.fileName}
                                        onPress={() => {
                                          setSelectedZoomImage(image);
                                          setVisibleZoomImageModal(true);
                                        }}
                                        style={styles.imageContainer}>
                                        <Image
                                          style={styles.imageStyle}
                                          source={image}
                                        />
                                        <TouchableOpacity
                                          style={styles.crossContainer}
                                          onPress={() =>
                                            removeDrivingLicenseList(
                                              image.fileName,
                                            )
                                          }>
                                          <SvgComponent svgMarkup={closeIcon} />
                                        </TouchableOpacity>
                                      </TouchableOpacity>
                                    ))}
                                  {/* {drivingLicense.length < 2 >= 1 && (
                                    <View style={styles.imageContainer}>
                                      <TouchableOpacity
                                        onPress={galleryOpenDrivingLicense}>
                                        <Text style={styles.plusStyle}>
                                          {'+'}
                                        </Text>
                                      </TouchableOpacity>
                                    </View>
                                  )} */}
                                </View>
                              </View>
                            )}
                            {/*  */}
                          </View>
                        </React.Fragment>
                      )}

                      {/* 2nd */}
                      {/* main end */}
                      <SubmitButton
                        loading={Loading}
                        title="SUBMIT"
                        width={'100%'}
                        borderRadius={15}
                      />
                    </AppForm>
                  </View>
                </ScrollView>
              </ImageBackground>
            </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>
      {/* modal end */}
      <View style={styles.headerContainer}>
        <Header
          onLeftIconPress={() => {
            navigation.goBack();
          }}
          leftSvgIcon={backArrow(colors.WHITE)}
          title={CommonText.Worker_Registration}
          fontSize={hp(2.2)}
          textColor={colors.WHITE}
        />
      </View>
      <View style={styles.buttonContainer}>
        <AppButton
          title="ADD NEW WORKER"
          width={wp(45)}
          backgroundColor={colors.secondaryButtonColor}
          padding={hp(1.2)}
          borderRadius={50}
          onPress={() => setModalVisible(true)}
        />
      </View>
      <View style={styles.flatListContainer}>
        {Loading ? (
          <CustomActivityIndicator loading={Loading} />
        ) : (
          <React.Fragment>
            <FlatList
              data={getServantListApi}
              keyExtractor={item => item.id}
              numColumns={3}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => {
                return (
                  <View style={styles.flatlistSection}>
                    <CardItem
                      cardHeading={item.full_name}
                      cardImageUri={item.profile_image}
                      image={!item.profile_image && images.imagePlaceholder}
                      // cardText={item.mobile}
                      // cardSubInfo={item.address}
                      onPress={() =>
                        navigation.navigate('ServantDetails', {
                          item,
                        })
                      }
                    />
                  </View>
                );
              }}
            />
          </React.Fragment>
        )}
      </View>
    </ImageBackground>
  );
};

export default ServantRegistration;
