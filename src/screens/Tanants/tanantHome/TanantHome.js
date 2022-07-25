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
import * as Yup from 'yup';
import {launchImageLibrary} from 'react-native-image-picker';
import AppForm from '../../../components/common/FormComponents/AppForm';
import colors from '../../../assets/colors/colors';
import FamilyMemCard from '../../../components/common/FamilyMemberCard/FamilyMemCard';
import CardItem from '../../../components/common/CardItem/CardItem';
import Header from '../../../components/common/Header/Header';
import images from '../../../assets/images/images';
import {
  arrowRihtIcon,
  UserIcon,
  FamilyProfileIcon,
  TanssntsIcon,
  CalenderIcon,
  backArrow,
} from '../../../assets/images/svg/SvgImages';
import AppFromField from '../../../components/common/FormComponents/AppFormField';
import SubmitButton from '../../../components/common/FormComponents/SubmitButton';
import SvgComponent from '../../../components/common/SvgCustomComponents/SvgCustomComponents';
import PopUpModal from '../../../components/common/PopUpModal/PopUpModal';
import SuccessAnimation from '../../../assets/Animations/success.json';
import {hp} from '../../../utils/CommonMethods';
import CommonText from '../../../utils/CommonText';
import AppDateTimePickerField from '../../../components/common/FormComponents/AppDateTimePickerField';
import AppModalField from '../../../components/common/FormComponents/AppModalField';
import {END_POINTS} from '../../../server/URL';
import apiClient from '../../../Api/client';
import Toast from 'react-native-toast-message';
import moment from 'moment';
import CustomActivityIndicator from '../../../components/common/CustomActivityIndicator';
import {useIsFocused} from '@react-navigation/native';

const TanantHome = ({navigation, user}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const [popUpModalVisible, setPopUpModalVisible] = useState(false);
  const [mediaUri, setMediaUri] = useState(null);
  const [loading, setLoading] = useState(false);

  const [selectedProperyOpen, setSelectedProperyOpen] = useState('');
  const [selectedProperyValue, setSelectedProperyValue] = useState('');
  const [selectedProperyItem, setselectedProperyItem] = useState([]);
  const [propertyList, setPropertyList] = useState([]);
  const [tenantListData, setTenantListData] = useState([]);
  const isFocused = useIsFocused();

  // let CreatedDate = moment(user.dob).format('YYYY-MM-DD');
  // CreatedDate = CreatedDate.slice(0, 10);
  // console.log(' data of beith=========>>>'.CreatedDate);
  //================= get api tenantlist==========
  const getTenantListApi = async () => {
    const result = await apiClient.get(END_POINTS.getTenantList);
    if (result.ok) {
      setTenantListData(result.data);
      console.log('====get tenant api ===>>>>', result.data);
    } else console.log('error');
  };

  const addTenantListSubmit = async value => {
    console.log('values', value);
  };
  useEffect(() => {
    getTenantListApi();
  }, []);

  const getPropertiesList = async () => {
    setLoading(true);
    const res = await apiClient.get(END_POINTS.getTenantPropertyList);
    console.log('getPropertiesList ==>  ', res.data);

    if (res.ok) {
      setLoading(false);
      setPropertyList(res.data);
      setselectedProperyItem(res.data);
      // setPropertyListItems(res.data.user_property_list);
    } else {
      setLoading(false);
      console.log('res error ===>  ', res.data);
    }
  };
  const data = [
    {
      id: 1,
      image: images.profileUserImage,
      heading: 'Anup Joshi',
      info: '23A Pentasquare DHA Lahore',
    },
    {
      id: 2,
      image: images.profileUserImage,
      heading: 'Anup Joshi',
      info: '23A Pentasquare DHA Lahore',
    },
    {
      id: 3,
      image: images.profileUserImage,
      heading: 'Anup Joshi',
      info: '23A Pentasquare DHA Lahore',
    },
    {
      id: 4,
      image: images.profileUserImage,
      heading: 'Anup Joshi',
      info: '23A Pentasquare DHA Lahore',
    },
  ];

  const initialValues = {
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    mobileNo: '',
    property: '',
    tanancystartdate: '',
    tanancyenddate: '',
  };
  const validationSchema = Yup.object({
    firstName: Yup.string().required('First name is required field'),
    lastName: Yup.string().required('Last name is required field'),
    dateOfBirth: Yup.string().required('Please select date of birth'),
    tanancystartdate: Yup.string().required('Please select tanancy start date'),
    tanancyenddate: Yup.string().required('Please select tanancy end date'),
    mobileNo: Yup.string().required('Mobile no is required field'),
    property: Yup.string().required('Please select property'),
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
        // setCncTenancy(prev => [...prev, selectedImages[0]]);
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

  const handleAddTenant = async values => {
    console.log(
      'asda',
      values.tanancyenddate,
      values.tanancystartdate,
      moment(values.tanancyenddate).isAfter(values.tanancystartdate),
    );
    if (
      moment(values.tanancyenddate).isAfter(values.tanancystartdate) === false
    ) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'start date must be less then end date',
      });
    } else {
      setLoading(true);
      var data = new FormData();

      data.append('first_name', values.firstName);
      data.append('last_name', values.lastName);
      data.append('dob', values.dateOfBirth);
      data.append('mobile', values.mobileNo);
      data.append('property_id', values.property);
      data.append('tenancy_start_date', values.tanancystartdate);
      data.append('tenancy_end_date', values.tanancyenddate);
      if (mediaUri) {
        const imageData = {
          uri: mediaUri[0]?.uri,
          name: mediaUri[0]?.fileName,
          type: mediaUri[0]?.type,
        };
        data.append('profile_image', imageData);
      }

      const addTenantResult = await apiClient.post(END_POINTS.addTenant, data);
      console.log('result', addTenantResult.data);
      if (addTenantResult.ok) {
        if (addTenantResult.data.success) {
          setLoading(false);
          setModalVisible(false);
          getTenantListApi();
          Toast.show({
            type: 'success',
            text1: 'Success',
            text2: addTenantResult.data?.message,
          });
        } else {
          setLoading(false);
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: addTenantResult.data?.message,
          });
        }
      } else {
        setLoading(false);
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: addTenantResult.data?.message,
        });
      }
    }
  };

  useEffect(() => {
    getPropertiesList();
  }, []);
  useEffect(() => {
    getTenantListApi();
  }, [isFocused]);

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
        <PopUpModal
          modalVisiblePopUp={popUpModalVisible}
          source={SuccessAnimation}
          onPress={() => {
            setPopUpModalVisible(false);
            setModalVisible(false);
          }}
          messageText={'Tenant Added Successfully!'}
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
                style={{flex: 1, paddingTop: hp(1)}}
                imageStyle={styles.formBG}>
                <View style={styles.tenantSection}>
                  <Text style={styles.tenantText}>
                    {CommonText.ADD_NEW_TENANT}
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
                <KeyboardAvoidingView
                  style={{flex: 1}}
                  behavior={Platform.OS === 'ios' ? 'padding' : null}>
                  <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.inputContainer}>
                      <AppForm
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleAddTenant}>
                        <AppFromField
                          label={'First Name'}
                          width={'100%'}
                          placeholderTextColor={colors.placeHolderColor}
                          placeholder="First Name"
                          autoCapitalize="none"
                          autoCorrect={false}
                          name="firstName"
                          keyboardType="email-address"
                          TextContentType="emailAddress"
                          borderColor={colors.primary}
                          borderWidth={1}
                          borderRadius={15}
                          borderWidth={1}
                          borderColor={colors.RED_COLOR}
                        />
                        <AppFromField
                          label={'Last Name'}
                          width={'100%'}
                          placeholderTextColor={colors.placeHolderColor}
                          placeholder="Last Name"
                          autoCapitalize="none"
                          autoCorrect={false}
                          name="lastName"
                          keyboardType="email-address"
                          TextContentType="emailAddress"
                          borderColor={colors.primary}
                          borderWidth={1}
                          borderRadius={15}
                          borderWidth={1}
                          borderColor={colors.RED_COLOR}
                        />

                        <AppDateTimePickerField
                          label={CommonText.DATE_OF_BIRTH}
                          mode="date"
                          rightSvgIcon={CalenderIcon}
                          name="dateOfBirth"
                        />

                        <AppFromField
                          label={CommonText.MOBILE_NO}
                          width={'100%'}
                          placeholderTextColor={colors.placeHolderColor}
                          placeholder="Mobile No."
                          autoCapitalize="none"
                          autoCorrect={false}
                          name="mobileNo"
                          keyboardType="numeric"
                          TextContentType="emailAddress"
                          borderColor={colors.primary}
                          borderWidth={1}
                          borderColor={colors.RED_COLOR}
                          borderRadius={15}
                        />

                        <AppModalField
                          label={'Select Property'}
                          placeholder={'Select Property'}
                          name="property"
                          open={selectedProperyOpen}
                          value={selectedProperyValue}
                          items={selectedProperyItem}
                          setOpen={setSelectedProperyOpen}
                          setValue={setSelectedProperyValue}
                          setItems={setselectedProperyItem}
                          schema={{
                            label: 'address',
                            value: 'id',
                          }}
                        />

                        <AppDateTimePickerField
                          label={CommonText.TENANCY_START_DATE}
                          mode="date"
                          rightSvgIcon={CalenderIcon}
                          name="tanancystartdate"
                        />
                        {/*  */}

                        {/* end tenancy date */}
                        <AppDateTimePickerField
                          label={CommonText.TENANCY_END_DATE}
                          mode="date"
                          rightSvgIcon={CalenderIcon}
                          name="tanancyenddate"
                        />

                        <View style={styles.buttonContainer}>
                          <SubmitButton
                            title={CommonText.SAVE}
                            loading={loading}
                            borderRadius={15}
                          />
                        </View>
                      </AppForm>
                    </View>
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
          {loading ? (
            <CustomActivityIndicator loading={loading} />
          ) : (
            <>
              <View style={styles.headingView1}>
                <Text style={styles.headingtextStyle}>
                  {CommonText.MANAGE_MY_TENANTS}
                </Text>
              </View>
              <View style={styles.flatlistContainer}>
                <FlatList
                  data={tenantListData}
                  keyExtractor={item => item.id}
                  numColumns={3}
                  showsVerticalScrollIndicator={false}
                  renderItem={({item}) => {
                    return (
                      <View style={styles.flatlistSection}>
                        <CardItem
                          cardImageUri={item.user.profile_picture}
                          image={
                            !item.user.profile_picture &&
                            images.imagePlaceholder
                          }
                          cardHeading={item.user.name}
                          cardText={item.mapping_level_one_name}
                          cardSubInfo={item.user.mobile}
                          onPress={() =>
                            navigation.navigate('ShowTanantDetails', item)
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
              cardText={CommonText.ADD_NEW_TENANT}
              svgIcon={UserIcon}
              svgRightIcon={arrowRihtIcon}
              svgIcon={TanssntsIcon}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </ImageBackground>
  );
};
export default TanantHome;
