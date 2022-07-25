import React, {useEffect, useState} from 'react';
import images from '../../../assets/images/images';
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
import FamilyMemCard from '../../../components/common/FamilyMemberCard/FamilyMemCard';
import CardItem from '../../../components/common/CardItem/CardItem';
import * as Yup from 'yup';
import Header from '../../../components/common/Header/Header';
import {
  UserIcon,
  arrowRihtIcon,
  FamilyProfileIcon,
  CalenderIcon,
  backArrow,
} from '../../../assets/images/svg/SvgImages';
import {wp, hp} from '../../../utils/CommonMethods';
import {launchImageLibrary} from 'react-native-image-picker';
import AppForm from '../../../components/common/FormComponents/AppForm';
import AppFromField from '../../../components/common/FormComponents/AppFormField';
import SubmitButton from '../../../components/common/FormComponents/SubmitButton';
import colors from '../../../assets/colors/colors';
import SvgComponent from '../../../components/common/SvgCustomComponents/SvgCustomComponents';
import PopUpModal from '../../../components/common/PopUpModal/PopUpModal';
import SuccessAnimation from '../../../assets/Animations/success.json';
import AppDateTimePickerField from '../../../components/common/FormComponents/AppDateTimePickerField';
import CommonText from '../../../utils/CommonText';
import AppModalField from '../../../components/common/FormComponents/AppModalField';
import apiClient from '../../../Api/client';
import {END_POINTS} from '../../../server/URL';
import Toast from 'react-native-toast-message';
import {useIsFocused} from '@react-navigation/native';
import CustomActivityIndicator from '../../../components/common/CustomActivityIndicator';

const AddFamilyMember = ({navigation}) => {
  const {getUserToken} = useAuth();
  const token = getUserToken();
  console.log('token user ===>', token);

  const [modalVisible, setModalVisible] = useState(false);
  const [popUpModalVisible, setPopUpModalVisible] = useState(false);
  // const [parkingOpen, setParkingOpen] = useState(false);
  // const [parkingValue, setParkingValue] = useState(null);
  const [mediaUri, setMediaUri] = useState(null);
  const [showImage, setShowImage] = useState(null);
  const [loading, setLoading] = useState(false);
  // =============
  const [propertyOpen, setPropertyOpen] = useState(false);
  const [propertyValue, setPropertyValue] = useState(null);
  const [propertyItem, setPropertyItem] = useState([]);
  console.log('====???????===property=====??????====registration===>>>>>', propertyItem)
  //==============
  const [parkingID, setParkingID] = useState('');
  const [familyList, setFamilyList] = useState([]);
  const isFocused = useIsFocused();
  const [message, setMessage] = useState('');

  // const [items, setItems] = useState([]);
  // {label: 'Select Property', value: 'Select Property'},
  const [allocate, setItemsAllocateparking] = useState([]);

  const initialValues = {
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    mobileNo: '',
    // vehicleRegNo: '',
    selectProperty: '',
    // allocateparking: '',
  };
  const validationSchema = Yup.object({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    dateOfBirth: Yup.string().required('Please select date of birth'),
    mobileNo: Yup.string().required('Mobile number is required'),
    // vehicleRegNo: Yup.string().required('Vehicle reg no is required'),
    selectProperty: Yup.string().required('Please select property'),
    // allocateparking: Yup.string().required('Please select a aloocate parking'),
  });

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

  const getProperty = async () => {
    const res = await apiClient.get(END_POINTS.societyList);
    console.log('getProperty ==>  ', res.data.select_property_and_parking);

    if (res.ok) {
      console.log('=====2222====2===2==222===222=====',res.data.select_property_and_parking)

      setPropertyItem(res.data.select_property_and_parking);
    } else {
      console.log('res error ===>  ', res.data);
    }
  };

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

  const getFamilyMember = async () => {
    setLoading(true);
    const result = await apiClient.get(END_POINTS.getFamilyMemberList);
    if (result.ok) {
      console.log('result.ok getFamilyMember ===>  ', result.data);
      setItemsAllocateparking(result.data);
      setFamilyList(result.data);
      setLoading(false);
    } else {
      setLoading(false);
      console.log('eror getFamilyMember ===> ', result);
    }
    setLoading(false);
  };

  const Submit = async values => {
    console.log('submit values family members', values);
    if (showImage === null) {
      Toast.show({
        type: 'error',
        text1: 'Required',
        text2: 'Please upload image',
      });
    } else {
      const imageData = {
        uri: mediaUri[0]?.uri,
        name: mediaUri[0]?.fileName,
        type: mediaUri[0]?.type,
      };
      let formdata = new FormData();

      formdata.append('image', imageData);
      formdata.append('first_name', values.firstName);
      formdata.append('last_name', values.lastName);
      formdata.append('dob', values.dateOfBirth);
      formdata.append('mobile', values.mobileNo);
      formdata.append('select_property', values.selectProperty);
    
      // formdata.append('allocated_parking', values.allocateparking);
      // formdata.append('vehicle_reg_no', values.vehicleRegNo);
      console.log('result formdata family member ===>  ', formdata);
      setLoading(true);
      const result = await apiClient.post(END_POINTS.addFamilyMember, formdata);
      if (result.ok) {
        setLoading(false);
        console.log('result.ok ===>  ', result);
        setMessage(result.data.message);
        setParkingID(result);
        setPopUpModalVisible(true);
        getFamilyMember();
      } else {
        setLoading(false);
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: result.data.message,
        });
      }
    }
  };
  useEffect(() => {
    getProperty();
  }, []);

  useEffect(() => {
    getFamilyMember();
  }, [isFocused]);

  return (
    <ImageBackground
      resizeMode={'cover'}
      source={images.splash}
      style={styles.container}>
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
          messageText={message}
          title="OK"
        />
        <View style={styles.modalContainer}>
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
                <View style={styles.familySection}>
                  <Text style={styles.familyText}>
                    {'Add new family member'}
                  </Text>
                  <TouchableOpacity onPress={_launchImageLibrary}>
                    {mediaUri ? (
                      <Image source={mediaUri} style={styles.profileImage} />
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
                      onSubmit={Submit}>
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
                        borderWidth={1}
                        borderRadius={15}
                        borderColor={colors.RED_COLOR}
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
                        borderWidth={1}
                        borderRadius={15}
                        borderColor={colors.RED_COLOR}
                      />

                      <AppDateTimePickerField
                        label={CommonText.DATE_OF_BIRTH}
                        mode="date"
                        rightSvgIcon={CalenderIcon}
                        name="dateOfBirth"
                        borderColor={colors.primary}
                      />
                      <AppFromField
                        label="Mobile No."
                        width={'100%'}
                        placeholderTextColor={colors.placeHolderColor}
                        placeholder="Mobile No."
                        autoCapitalize="none"
                        autoCorrect={false}
                        name="mobileNo"
                        keyboardType="numeric"
                        TextContentType="emailAddress"
                        borderWidth={1}
                        borderColor={colors.primary}
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
                      {/* <AppModalField
                        label={'Allocate Parking'}
                        placeholder={'Allocate Parking'}
                        name="allocateparking"
                        schema={{
                          label: 'parkings',
                          value: 'id',
                        }}
                        open={parkingOpen}
                        value={parkingValue}
                        items={allocate}
                        setOpen={setParkingOpen}
                        setValue={setParkingValue}
                        setItems={setItemsAllocateparking}
                        borderColor={colors.primary}
                      /> */}

                      {/* <AppFromField
                        label="Vehicle Reg No."
                        width={'100%'}
                        placeholderTextColor={colors.placeHolderColor}
                        placeholder="Vehicle Reg No."
                        autoCapitalize="none"
                        autoCorrect={false}
                        name="vehicleRegNo"
                        keyboardType="numeric"
                        TextContentType="emailAddress"
                        borderRadius={15}
                        borderWidth={1}
                        borderColor={colors.primary}
                      /> */}
                      <View style={styles.buttonContainer}>
                        <SubmitButton
                          title="SAVE"
                          loading={loading}
                          width={'100%'}
                          borderRadius={15}
                        />
                      </View>
                    </AppForm>
                  </View>
                </ScrollView>
              </ImageBackground>
            </View>
          </KeyboardAvoidingView>
          {/*  */}
        </View>
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
          <View style={styles.headingView1}>
            <Text style={styles.headingtextStyle}>
              {'Manage my family members'}
            </Text>
          </View>
          {loading ? (
            <CustomActivityIndicator loading={loading} />
          ) : (
            <React.Fragment>
              <View style={styles.flatlistContainer}>
                <FlatList
                  data={familyList}
                  keyExtractor={item => item.id}
                  numColumns={3}
                  showsVerticalScrollIndicator={false}
                  renderItem={({item}) => {
                    return (
                      <View style={styles.flatlistSection}>
                        <CardItem
                          cardImageUri={item.image}
                          image={!item.image && images.imagePlaceholder}
                          cardHeading={item.member_name}
                          cardText={item.mobile}
                          onPress={() =>
                            navigation.navigate('DetailsFamilyMember', item)
                          }
                        />
                      </View>
                    );
                  }}
                />
              </View>
            </React.Fragment>
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
              cardText={'Add new family member'}
              svgIcon={UserIcon}
              svgRightIcon={arrowRihtIcon}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </ImageBackground>
  );
};
export default AddFamilyMember;
