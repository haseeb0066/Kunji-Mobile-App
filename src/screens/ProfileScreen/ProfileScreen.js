import React, {useEffect, useState} from 'react';
import {
  View,
  ImageBackground,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
  Button,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useSelector} from 'react-redux';
import styles from './styles';
import * as Yup from 'yup';
import images from '../../assets/images/images';
import DocumentPicker from 'react-native-document-picker';
import colors from '../../assets/colors/colors';
// import HomeDropDown from '../../components/common/HomeDropDown/HomeDropDown';
import AppForm from '../../components/common/FormComponents/AppForm';
import AppFromField from '../../components/common/FormComponents/AppFormField';
import SubmitButton from '../../components/common/FormComponents/SubmitButton';
import {
  GallaryIcon,
  ProfileIcon,
  UploadIcon,
  EmptyCkeckboxIcon,
  FillCheckboxIcon,
  crossIcon,
  pdfIcon,
  docIcon,
  closeIcon,
  CalenderIcon,
  crossIcon2,
  CalenderIconsmall,
} from '../../assets/images/svg/SvgImages';
import SvgCustomComponents from '../../components/common/SvgCustomComponents/SvgCustomComponents';
// import DropdownPickerComponent from '../../components/common/DropDown/DropDown';
import DropDownPicker from 'react-native-dropdown-picker';
import SvgComponent from '../../components/common/SvgCustomComponents/SvgCustomComponents';
import {hp, wp} from '../../utils/CommonMethods';
import Storage from '../../Auth/Storage';
import useAuth from '../../Auth/useAuth';
import getCties from '../../Api/getCties';
import useApi from '../../hooks/useApi';
import moment from 'moment';
import RadioGroup from 'react-native-radio-buttons-group';
import apiClient from '../../Api/client';
import AppButton from '../../components/common/AppButton';
import FileViewer from 'react-native-file-viewer';
import ImageViewer from 'react-native-image-zoom-viewer';
import {Modal} from 'react-native';
import {
  changePassword,
  getlevelOneMapping,
  getlevelThreeMapping,
  getlevelTwoMapping,
  getSocietiesByCity,
  getUserProfile,
} from '../../server/ApiFunctions';
import AppDateTimePickerField from '../../components/common/FormComponents/AppDateTimePickerField';
import AppModalField from '../../components/common/FormComponents/AppModalField';
import {END_POINTS} from '../../server/URL';
import Toast from 'react-native-toast-message';
const ProfileScreen = ({route}) => {
  const {data: userData} = route.params;

  const user = useSelector(state => state.getData);
  const getProfile = async () => {
    //const token = await getUserToken();
    // console.log(token);
    try {
      const profileResult = await getUserProfile(userData.token);
      if (profileResult.status) {
        setUserProfileInfo(profileResult.data);
        setCityItems(profileResult.data.cities);
      }
      console.log('asdadadasda', profileResult);
    } catch (error) {
      console.log(error);
    }
  };
  const {getUserToken, logIn, storeToken} = useAuth();

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
  const currentDate = new Date();

  const [radioButtons, setRadioButtons] = useState(radioButtonsData);
  const [selectedradioButton, setSelectedradioButton] = useState(
    radioButtonsData[0],
  );

  const [UserProfileInfo, setUserProfileInfo] = useState(false);
  const [mediaUri, setMediaUri] = useState(null);

  const [Loading, setLoading] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);
  const [cityItems, setCityItems] = useState([]);
  const [cityValue, setCityValue] = useState(null);
  const [societyOpen, setSocietyOpen] = useState(false);
  const [date, setDate] = useState('');
  const [open, setOpen] = useState(false);
  //............
  const [societyType, setSocietyType] = useState();

  //.............

  const [societyValue, setSocietyValue] = useState(null);
  const [societyItems, setSocietyItems] = useState([]);
  const [buildingSectorOpen, setBuildingSectorOpen] = useState(false);
  const [buildingSectorValue, setBuildingSectorValue] = useState(null);
  const [buildingSectorItems, setBuildingSectorItems] = useState([]);

  const [FloorOrStreetOpen, setFloorOrStreetOpen] = useState(false);
  const [FloorOrStreetValue, setFloorOrStreetValue] = useState(null);
  const [FloorOrStreetItems, setFloorOrStreetItems] = useState([]);

  const [ApartmentOrHouseOpen, setApartmentOrHouseOpen] = useState(false);
  const [ApartmentOrHouseValue, setApartmentOrHouseValue] = useState(null);
  const [ApartmentOrHouseItems, setApartmentOrHouseItems] = useState([]);
  const [residentailOpen, setResidentailOpen] = useState(false);
  const [residentailValue, setResidentailValue] = useState('');
  const [cncTenancy, setCncTenancy] = useState([]);

  const [cncImages, setCncImages] = useState([]);
  const [items, setItems] = useState([]);
  const [UploadedFiles, setUploadedFiles] = useState([]);
  const [selectedZoomImage, setSelectedZoomImage] = useState([]);
  const [visibleZoomImageModal, setVisibleZoomImageModal] = useState([]);
  //console.log(' SELECTED IMAGES', societyValue);
  useEffect(() => {
    getProfile();
  }, []);
  function onPressRadioButton(radioButtonsArray) {
    console.log('asd', radioButtonsArray);
    setSelectedradioButton(
      radioButtonsArray.filter(btn => btn.selected === true)[0],
    );
    setRadioButtons(radioButtonsArray);
    // setCncImages([]);
  }
  console.log('cncTenancy', cncTenancy);

  const getSocietiesByCityApi = async city_id => {
    console.log('cite id', city_id);
    // const token = await getUserToken();
    const result = await getSocietiesByCity(userData.token, city_id);
    if (result.status) {
      setSocietyItems(result.data);
    }
    console.log('society data', result);
  };

  const getMappingLevelOneApi = async society_id => {
    // console.log('cite id', city_id);
    // const token = await getUserToken();
    const result = await getlevelOneMapping(userData.token, society_id);
    if (result.status) {
      setBuildingSectorItems(result.data);
    }
    console.log('level one data', result);
  };
  const getMappingLevelTwoApi = async mapping_one_id => {
    // console.log('cite id', city_id);
    //const token = await getUserToken();
    const result = await getlevelTwoMapping(
      userData.token,
      societyValue,
      mapping_one_id,
    );
    if (result.status) {
      setFloorOrStreetItems(result.data);
    }
    console.log('level two data', result);
  };

  const getMappingLevelThreeApi = async mapping_two_id => {
    // console.log('cite id', city_id);
    //  const token = await getUserToken();
    const result = await getlevelThreeMapping(
      userData.token,
      societyValue,
      mapping_two_id,
    );
    if (result.status) {
      setApartmentOrHouseItems(result.data);
    }
    console.log('level three data', result);
  };

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
  // open gallery function
  console.log(user);
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
        setCncTenancy(prev => [...prev, selectedImages[0]]);
        // const source = {uri: response.assets[0].uri};
        // console.log('response', JSON.stringify(response));
        // setIsGallery({
        //   filePath: response,
        //   fileData: response.data,
        //   fileUri: response.uri,
        // });
      }
    } catch (error) {
      console.log(error);
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

  // open Documents
  const openDocument = async () => {
    try {
      const res = await DocumentPicker.pickMultiple({
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
        // } else if (DocumentPicker.isInProgress(err)) {
        //   console.log('document in process');
        //
      } else {
        console.log(err, 'error');
      }
    } finally {
    }
  };

  console.log('---test-0-----', societyType === 1);

  // const apicheck = async () => {
  //   const token = await getUserToken();
  //   var formdata = new FormData();
  //   // let body = new FormData();
  //   formdata.append('old_password', '12345qwert');
  //   formdata.append('password', 'Ammark11');
  //   formdata.append('password_confirmation', 'Ammark11');
  //   // formdata.append('ride_type', 2);
  //   // formdata.append('timezone', '2022-03-30 17:51:12');
  //   // formdata.append('start_odo_image', imageData);

  //   // const d = {
  //   //   ride_type: 1,
  //   //   start_odo_image: {
  //   //     name: mediaUri[0]?.fileName,
  //   //     type: mediaUri[0]?.type,
  //   //     uri: mediaUri[0]?.uri,
  //   //   },
  //   //   start_odomiter_value: 10,
  //   //   timezone: 'karachi/Paksitan',
  //   //   description: 'asd',
  //   //   start_date_time: '12:30',
  //   // };
  //   // console.log(formdata);
  //   // const result = await apiClient.post('user/change-password', formdata, {
  //   //   headers: {
  //   //     Accept: 'application/json',
  //   //     'Content-Type': 'application/json',
  //   //     Authorization: 'Bearar 101|jq1iWfeSFv3KNojzKZ6zfuE6JGlls4a2EqSW5h3y',
  //   //   },
  //   // });
  //   const result = await changePassword(formdata, token);
  //   // if (result.ok) {
  //   //   console.log('res=====>', result.data);
  //   // }
  //   console.log('error', result.data);
  // };

  // Formik and yup
  const initialValues = {
    firstName: UserProfileInfo?.first_name,
    lastName: UserProfileInfo?.last_name,
    dateOfBirth: date,
    cnicNo: '',
    city: '',
    society: '',
    EmergencyContact: '',

    Sector_Block: '',
    HouseNo: '',
    SteetNo: '',
    flatNo: '',
    floorNo: '',
    building: '',
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required('First Name is required field'),
    lastName: Yup.string().required('Last name is required field'),

    dateOfBirth: Yup.string().required('Date of birth is required field'),
    cnicNo: Yup.string()
      .required('CNIC is required field')
      .matches('^[0-9]{5}-[0-9]{7}-[0-9]$', 'CNIC should be valid'),
    city: Yup.string().required('City is required field'),
    society: Yup.string().required('Society is required field'),

    EmergencyContact: Yup.number().required(
      'Emergency Contact no is required field',
    ),

    ...(societyType === 1
      ? {
          Sector_Block: Yup.string().required('Sector/Block is required field'),
          HouseNo: Yup.string().required('House no is required field'),
          SteetNo: Yup.string().required('Street no is required field'),
        }
      : {
          flatNo: Yup.string().required('Flat no is required field'),
          floorNo: Yup.string().required('Floor no is required field'),
          building: Yup.string().required('Building no is required field'),
        }),
  });

  const handlesubmitProfile = async value => {
    // console.log('submit data', value, buildingSectorValue);
    if (cncImages.length < 2) {
      Toast.show({
        type: 'error',
        text1: 'Required',
        text2: 'Kindly upload both front and back side of the CNIC',
        // topOffset: 100,
      });
    } else if (UploadedFiles.length < 1) {
      Toast.show({
        type: 'error',
        text1: 'Required',
        text2: 'Kindly upload the aggrement documents',
        // topOffset: 100,
      });
    } else if (!mediaUri) {
      Toast.show({
        type: 'error',
        text1: 'Required',
        text2: 'Kindly upload your profile image',
        // topOffset: 100,
      });
    } else {
      setLoading(true);
      const imageData = {
        uri: mediaUri[0]?.uri,
        name: mediaUri[0]?.fileName,
        type: mediaUri[0]?.type,
      };
      var formdata = new FormData();
      formdata.append('first_name', value.firstName);
      formdata.append('last_name', value.lastName);
      formdata.append('dob', value.dateOfBirth);
      formdata.append('cnic', value.cnicNo);
      formdata.append('emergency_contact', value.EmergencyContact);
      formdata.append('city_id', value.city);
      formdata.append('society_id', value.society);
      formdata.append('profile_picture', imageData);

      formdata.append('mobile_app_role', selectedradioButton.id);

      UploadedFiles.forEach(fileDoc => {
        formdata.append('documents[]', fileDoc);
      });
      cncImages.forEach(cnc => {
        const CncimageData = {
          uri: cnc?.uri,
          name: cnc?.fileName,
          type: cnc?.type,
        };
        formdata.append('cnic_image[]', CncimageData);
      });

      formdata.append('mapping_one_id', buildingSectorValue);
      formdata.append('mapping_two_id', FloorOrStreetValue);
      formdata.append('mapping_three_id', ApartmentOrHouseValue);
      console.log(formdata);
      const result = await apiClient.post(
        END_POINTS.submitEditProfile,
        formdata,
      );

      if (result.ok) {
        setLoading(false);
        storeToken(userData?.token);
        logIn(userData?.user_data);
        console.log('resssssss----1', result.data);
      } else {
        console.log('resssssss----2', result.data);
        setLoading(false);
      }
    }
  };

  console.log(new Date().toString());
  return (
    <View style={styles.container}>
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
                url: selectedZoomImage.uri,

                props: {
                  // headers: ...
                },
              },
            ]}
          />
        </View>
      </Modal>
      <DatePicker
        modal
        mode="date"
        open={open}
        // is24hourSource="device"
        // onDateChange={date => console.log('ssasdasda', date)}
        date={new Date()}
        onConfirm={date => {
          //console.log('ssasdasda', moment(date).format());
          //console.log(moment(date).local());
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />

      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <ImageBackground source={images.splash} style={styles.backgroundImage}>
          <View style={styles.profileContainer}>
            <TouchableOpacity onPress={_launchImageLibrary}>
              {mediaUri ? (
                <Image source={mediaUri} style={styles.profileImage} />
              ) : (
                <SvgCustomComponents svgMarkup={ProfileIcon} />
              )}
            </TouchableOpacity>
            <Text style={styles.profileHeading}>Upload Image</Text>
            <Text style={styles.headingText}>{UserProfileInfo?.name}</Text>
          </View>
          {/* <Button title="abcb" onPress={() => apicheck()} /> */}
          <View style={styles.formContainer}>
            <ImageBackground
              source={images.formBG}
              style={styles.formimage}
              imageStyle={styles.imageborder}>
              <KeyboardAvoidingView
                style={{flex: 1}}
                behavior={Platform.OS === 'ios' ? 'padding' : null}>
                <ScrollView>
                  <View style={styles.inputContainer}>
                    <AppForm
                      initialValues={{
                        firstName: UserProfileInfo?.first_name,
                        lastName: UserProfileInfo?.last_name,
                        dateOfBirth: date,
                        cnicNo: '',
                        city: '',
                        society: '',
                        EmergencyContact: '',

                        Sector_Block: '',
                        HouseNo: '',
                        SteetNo: '',
                        flatNo: '',
                        floorNo: '',
                        building: '',
                      }}
                      enableReinitialize={true}
                      onSubmit={handlesubmitProfile}
                      validationSchema={validationSchema}>
                      <AppFromField
                        label="First Name"
                        width={'100%'}
                        placeholderTextColor={colors.primary}
                        placeholder="First Name"
                        autoCapitalize="none"
                        autoCorrect={false}
                        name="firstName"
                        borderColor={'red'}
                        borderWidth={1}
                        borderRadius={15}
                        defaultValue={UserProfileInfo?.first_name}
                      />
                      <AppFromField
                        label="Last Name"
                        width={'100%'}
                        defaultValue={UserProfileInfo?.last_name}
                        placeholderTextColor={colors.primary}
                        placeholder="Last Name"
                        autoCapitalize="none"
                        autoCorrect={false}
                        name="lastName"
                        borderColor={'red'}
                        borderWidth={1}
                        borderRadius={15}
                      />
                      <AppDateTimePickerField
                        mode="date"
                        label="Date Of Birth"
                        name="dateOfBirth"
                        rightSvgIcon={CalenderIcon}
                      />

                      <AppFromField
                        label="Emergency Contact Number"
                        width={'100%'}
                        placeholderTextColor={colors.primary}
                        placeholder="Emergency Contact Number"
                        autoCapitalize="none"
                        autoCorrect={false}
                        name="EmergencyContact"
                        keyboardType="numeric"
                        borderColor={'red'}
                        borderWidth={1}
                        borderRadius={15}
                      />

                      {/* <Text style={[styles.dropdownLable, {paddingTop: 0}]}>
                        Date Of Birth
                      </Text> */}
                      {/* <TouchableOpacity
                        onPress={() => setOpen(true)}
                        style={[styles.dropdown, {marginBottom: '2%'}]}>
                        <Text>
                          {date
                            ? moment(date).format('MM-DD-YYYY')
                            : 'Date Of Birth'}
                        </Text>
                      </TouchableOpacity> */}
                      {/* <View style={styles.inputView}>
                        <TouchableOpacity
                          onPress={() => setOpen(true)}
                          style={styles.dateView}>
                          <Text style={styles.datePickerText}>
                            {date
                              ? moment(date).format('MM-DD-YYYY')
                              : 'Date Of Birth'}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.iconView}
                          onPress={() => setOpen(true)}>
                          <SvgComponent svgMarkup={CalenderIcon} />
                        </TouchableOpacity>
                      </View> */}
                      {/* <TouchableOpacity onPress={() => setOpen(true)}>
                        <AppFromField
                          label="Date Of Birth"
                          width={'100%'}
                          editable={false}
                          placeholderTextColor={colors.primary}
                          placeholder="Date Of Birth"
                          autoCapitalize="none"
                          autoCorrect={false}
                          name="dateOfBirth"
                          keyboardType="email-address"
                          TextContentType="emailAddress"
                          borderColor={colors.primary}
                          borderWidth={1}
                          borderRadius={15}
                          value={
                            date &&
                            moment(date.toDateString()).format('MM-DD-YYYY')
                          }
                        />
                      </TouchableOpacity> */}
                      <AppFromField
                        label="CNIC No."
                        width={'100%'}
                        placeholderTextColor={colors.primary}
                        //placeholder="CNIC No."
                        autoCapitalize="none"
                        autoCorrect={false}
                        name="cnicNo"
                        maskInput={true}
                        keyboardType="numeric"
                        TextContentType="emailAddress"
                        borderColor={'red'}
                        borderWidth={1}
                        borderRadius={15}
                      />
                      {/* <Text style={[styles.dropdownLable, {paddingTop: 0}]}>
                        Select City
                      </Text> */}
                      <AppModalField
                        name="city"
                        label="Select City"
                        schema={{
                          label: 'name',
                          value: 'id',
                        }}
                        searchable={true}
                        searchPlaceholder="Search city .."
                        style={styles.dropdown}
                        placeholder="Select City"
                        placeholderStyle={{color: colors.primary}}
                        open={cityOpen}
                        value={cityValue}
                        items={cityItems}
                        setOpen={setCityOpen}
                        setValue={setCityValue}
                        setItems={setCityItems}
                        listMode="MODAL"
                        onChangeValue={value => {
                          {
                            value && getSocietiesByCityApi(value);
                            setSocietyValue(null);
                          }
                        }}
                      />
                      {/* <Text style={styles.dropdownLable}>Select Society</Text> */}
                      <AppModalField
                        name="society"
                        label={'Select Society'}
                        schema={{
                          label: 'name',
                          value: 'id',
                        }}
                        style={styles.dropdown}
                        placeholder="Select Society"
                        onSelectItem={item => setSocietyType(item.society_type)}
                        placeholderStyle={{color: colors.primary}}
                        open={societyOpen}
                        value={societyValue}
                        items={societyItems}
                        setOpen={setSocietyOpen}
                        setValue={setSocietyValue}
                        setItems={setSocietyItems}
                        listMode="MODAL"
                        onChangeValue={value => {
                          value && getMappingLevelOneApi(value);
                          setBuildingSectorValue(null);
                          setFloorOrStreetValue(null);
                          setApartmentOrHouseValue(null);
                        }}
                      />
                      {societyType === 1 && (
                        <>
                          {/* <Text style={styles.dropdownLable}>
                            Select Sector/Block no
                          </Text> */}
                          <AppModalField
                            label="Select Sector/Block no"
                            name="Sector_Block"
                            schema={{
                              label: 'sector_block_building',
                              value: 'id',
                            }}
                            style={styles.dropdown}
                            placeholder="Select Sector/Block no"
                            placeholderStyle={{color: colors.primary}}
                            open={buildingSectorOpen}
                            value={buildingSectorValue}
                            items={buildingSectorItems}
                            setOpen={setBuildingSectorOpen}
                            setValue={setBuildingSectorValue}
                            setItems={setBuildingSectorItems}
                            onChangeValue={value =>
                              value && getMappingLevelTwoApi(value)
                            }
                            listMode="MODAL"
                          />
                          {/* <Text style={styles.dropdownLable}>
                            Select Steet No
                          </Text> */}
                          <AppModalField
                            label="Select Steet No"
                            name="SteetNo"
                            schema={{
                              label: 'street_floor',
                              value: 'id',
                            }}
                            style={styles.dropdown}
                            placeholder="Select Steet No"
                            placeholderStyle={{color: colors.primary}}
                            open={FloorOrStreetOpen}
                            value={FloorOrStreetValue}
                            items={FloorOrStreetItems}
                            setOpen={setFloorOrStreetOpen}
                            setValue={setFloorOrStreetValue}
                            setItems={setFloorOrStreetItems}
                            listMode="MODAL"
                            onChangeValue={value =>
                              value && getMappingLevelThreeApi(value)
                            }
                          />
                          {/* <Text style={styles.dropdownLable}>
                            Select House No
                          
                          </Text> */}
                          <AppModalField
                            name="HouseNo"
                            label="Select House No"
                            schema={{
                              label: 'plot_home_apartment',
                              value: 'id',
                            }}
                            style={styles.dropdown}
                            placeholder="Select House No"
                            placeholderStyle={{color: colors.primary}}
                            open={ApartmentOrHouseOpen}
                            value={ApartmentOrHouseValue}
                            items={ApartmentOrHouseItems}
                            setOpen={setApartmentOrHouseOpen}
                            setValue={setApartmentOrHouseValue}
                            setItems={setApartmentOrHouseOpen}
                            listMode="MODAL"
                          />
                        </>
                      )}
                      {societyType === 0 && (
                        <>
                          {/* <Text style={styles.dropdownLable}>
                            Select Building
                          </Text> */}
                          <AppModalField
                            label="Select Building"
                            name="building"
                            schema={{
                              label: 'sector_block_building',
                              value: 'id',
                            }}
                            style={styles.dropdown}
                            placeholder="Select Building"
                            placeholderStyle={{color: colors.primary}}
                            open={buildingSectorOpen}
                            value={buildingSectorValue}
                            items={buildingSectorItems}
                            setOpen={setBuildingSectorOpen}
                            setValue={setBuildingSectorValue}
                            setItems={buildingSectorItems}
                            listMode="MODAL"
                            onChangeValue={value =>
                              value && getMappingLevelTwoApi(value)
                            }
                          />
                          {/* <Text style={styles.dropdownLable}>
                            Select Floor no
                          </Text> */}
                          <AppModalField
                            name="floorNo"
                            label="Select Floor no"
                            schema={{
                              label: 'street_floor',
                              value: 'id',
                            }}
                            style={styles.dropdown}
                            placeholder="Select floor no"
                            placeholderStyle={{color: colors.primary}}
                            open={FloorOrStreetOpen}
                            value={FloorOrStreetValue}
                            items={FloorOrStreetItems}
                            setOpen={setFloorOrStreetOpen}
                            setValue={setFloorOrStreetValue}
                            setItems={setFloorOrStreetItems}
                            listMode="MODAL"
                            onChangeValue={value =>
                              value && getMappingLevelThreeApi(value)
                            }
                          />
                          {/* <Text style={styles.dropdownLable}>
                            Select Flat no
                          

                          </Text> */}
                          <AppModalField
                            name="flatNo"
                            label="Select Flat no"
                            schema={{
                              label: 'plot_home_apartment',
                              value: 'id',
                            }}
                            style={styles.dropdown}
                            placeholder="Select flat No"
                            placeholderStyle={{color: colors.primary}}
                            open={ApartmentOrHouseOpen}
                            value={ApartmentOrHouseValue}
                            items={ApartmentOrHouseItems}
                            setOpen={setApartmentOrHouseOpen}
                            setValue={setApartmentOrHouseValue}
                            setItems={setApartmentOrHouseValue}
                            listMode="MODAL"
                          />
                        </>
                      )}
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
                            <Text style={styles.uploadText}>Upload CNIC</Text>
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
                                justifyContent: 'center',
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

                      {/* <View style={styles.checkboxContainer}>
                        <TouchableOpacity
                          onPress={() => setCheck(!check)}
                          style={styles.ckeckBox}>
                          {check ? (
                            <SvgCustomComponents svgMarkup={FillCheckboxIcon} />
                          ) : (
                            <SvgCustomComponents
                              svgMarkup={EmptyCkeckboxIcon}
                            />
                          )}
                        </TouchableOpacity>
                        <Text style={styles.privcayText}>
                          {
                            'I Agree to the kunji Terms of services and privcay policy.'
                          }
                        </Text>
                      </View> */}
                      <View style={styles.buttonContainer}>
                        <SubmitButton
                          loading={Loading}
                          title="CREATE PROFILE"
                        />
                      </View>
                    </AppForm>
                  </View>
                </ScrollView>
              </KeyboardAvoidingView>
            </ImageBackground>
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ProfileScreen;
