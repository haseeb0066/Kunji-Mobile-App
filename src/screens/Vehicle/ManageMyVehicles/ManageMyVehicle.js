import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import images from '../../../assets/images/images';
import styles from './styles';
import Header from '../../../components/common/Header/Header';
import CardItem from '../../../components/common/CardItem/CardItem';
import FamilyMemCard from '../../../components/common/FamilyMemberCard/FamilyMemCard';
import * as Yup from 'yup';
import {
  arrowRihtIcon,
  vehicleprofile,
  vehicleIcon,
  backArrow,
  carPlaceHolderIcon,
} from '../../../assets/images/svg/SvgImages';
import {useSelector} from 'react-redux';
import AppForm from '../../../components/common/FormComponents/AppForm';
import AppFromField from '../../../components/common/FormComponents/AppFormField';
import SubmitButton from '../../../components/common/FormComponents/SubmitButton';
import colors from '../../../assets/colors/colors';
import {launchImageLibrary} from 'react-native-image-picker';
import SvgCustomComponents from '../../../components/common/SvgCustomComponents/SvgCustomComponents';
import PopUpModal from '../../../components/common/PopUpModal/PopUpModal';
import SuccessAnimation from '../../../assets/Animations/success.json';
import CommonText from '../../../utils/CommonText';
import useAuth from '../../../Auth/useAuth';
import VehicleApis from '../../../Api/VehicleApis';
import useApi from '../../../hooks/useApi';
import {
  addVehicleData,
  getVehicleListApiFetch,
} from '../../../server/ApiFunctions';
import apiClient from '../../../Api/client';
import {BASE_URL, END_POINTS} from '../../../server/URL';
import CustomActivityIndicator from '../../../components/common/CustomActivityIndicator';

const ManageMyVehicle = ({navigation}) => {
  const user = useSelector(state => state.getData);
  const vehicleApi = useApi(VehicleApis.getVehicleList);
  const {getUserToken} = useAuth();
  // const token = getUserToken();
  const [mediaUri, setMediaUri] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reloadVechileListing, setReloadVechileListing] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [popUpModalVisible, setPopUpModalVisible] = useState(false);
  const [popUpModalMessage, setPopUpModalMessage] = useState('');
  const [vehicleListData, setVehicleListData] = useState([]);

  const getAddedVehicleDataList = async () => {
    const token = await getUserToken();
    const result = await getVehicleListApiFetch(token);
    if (result.status) {
      setVehicleListData(result.data?.vehicle_list);
    }
    // if (result.ok) {
    //   console.log('response', result.data);
    // }
    console.log('sada error', result);
  };
  console.log(mediaUri);

  const addVehicleSubmit = async value => {
    setLoading(true);
    //const token = await getUserToken();
    console.log('values', value);

    var formdata = new FormData();

    if (mediaUri) {
      const imageData = {
        uri: mediaUri[0]?.uri,
        name: mediaUri[0]?.fileName,
        type: mediaUri[0]?.type,
      };
      formdata.append('image', imageData);
    }
    formdata.append('registration_no', value.RegistrationNoOFVehicle);
    formdata.append('make', value.Make);
    formdata.append('model', value.Model);
    formdata.append('color', value.Color);
    formdata.append('year', value.Year);

    console.log(formdata);
    const result = await apiClient.post(END_POINTS.addVehicle, formdata);
    if (result.ok) {
      setLoading(false);
      setPopUpModalMessage(result.data?.message);
      setPopUpModalVisible(true);
      setReloadVechileListing(true);
      console.log('added', result.data);
    } else setLoading(false);
    setLoading(false);
  };

  useEffect(() => {
    getAddedVehicleDataList();
  }, [reloadVechileListing]);
  const data = [
    {
      id: 1,
      user_id: 1,
      socity_id: 1,
      image: null,
      registration_no: 'sasas',
      Make: 'sasasas',
      model: 'sasasas',
      color: 'sasasa',
      year: 'sasasas',
      created_at: '2022-04-14T09:33:48.000000Z',
      updated_at: '2022-04-14T09:33:48.000000Z',
    },
    {
      id: 2,
      user_id: 1,
      socity_id: 1,
      image: null,
      registration_no: 'sasas',
      Make: 'sasasas',
      model: 'sasasas',
      color: 'sasasa',
      year: 'sasasas',
      created_at: '2022-04-14T09:33:59.000000Z',
      updated_at: '2022-04-14T09:33:59.000000Z',
    },
  ];

  const initialValues = {
    RegistrationNoOFVehicle: '',
    Make: '',
    Model: '',
    Color: '',
    Year: '',
  };
  const validationSchema = Yup.object({
    RegistrationNoOFVehicle: Yup.string().required(
      'Registration no. of vehicle is required field',
    ),
    Make: Yup.string().required('Company make is required field'),
    Model: Yup.string().required('Model is required field'),
    Color: Yup.string().required('Color is required field'),
    Year: Yup.string().required('Year is required field'),
  });
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
      }
    } catch (error) {
      console.log(error);
    }
  };

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
          messageText={popUpModalMessage}
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
                style={{flex: 1}}
                imageStyle={styles.formBG}>
                <View style={styles.profileContainer}>
                  <Text style={styles.vehicleTextHeading}>
                    {CommonText.ADD_NEW_VEHICLES}
                  </Text>

                  <TouchableOpacity onPress={_launchImageLibrary}>
                    {mediaUri ? (
                      <Image source={mediaUri} style={styles.profileImage} />
                    ) : (
                      <SvgCustomComponents svgMarkup={vehicleprofile} />
                    )}
                  </TouchableOpacity>
                  <Text style={styles.uploadImageText}>Upload Image</Text>
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                  <View style={styles.inputContainer}>
                    <AppForm
                      initialValues={initialValues}
                      validationSchema={validationSchema}
                      onSubmit={addVehicleSubmit}>
                      <AppFromField
                        label={'Registration No.'}
                        width={'100%'}
                        placeholderTextColor={colors.placeHolderColor}
                        placeholder="Registration No."
                        autoCapitalize="none"
                        autoCorrect={false}
                        name="RegistrationNoOFVehicle"
                        keyboardType="email-address"
                        TextContentType="emailAddress"
                        borderColor={colors.primary}
                        borderWidth={1}
                        borderColor={colors.RED_COLOR}
                        borderRadius={15}
                      />
                      <AppFromField
                        label={CommonText.MAKE}
                        width={'100%'}
                        placeholderTextColor={colors.placeHolderColor}
                        placeholder="Make"
                        autoCapitalize="none"
                        autoCorrect={false}
                        name="Make"
                        keyboardType="email-address"
                        borderColor={colors.primary}
                        borderWidth={1}
                        borderColor={colors.RED_COLOR}
                        borderRadius={15}
                      />
                      <AppFromField
                        label={CommonText.MODEL}
                        width={'100%'}
                        placeholderTextColor={colors.placeHolderColor}
                        placeholder="Model"
                        autoCapitalize="none"
                        autoCorrect={false}
                        name="Model"
                        keyboardType="numeric"
                        TextContentType="emailAddress"
                        borderColor={colors.primary}
                        borderWidth={1}
                        borderColor={colors.RED_COLOR}
                        borderRadius={15}
                      />
                      <AppFromField
                        label={CommonText.COLOR}
                        width={'100%'}
                        placeholderTextColor={colors.placeHolderColor}
                        placeholder="Color"
                        autoCapitalize="none"
                        autoCorrect={false}
                        name="Color"
                        keyboardType="email-address"
                        TextContentType="emailAddress"
                        borderColor={colors.primary}
                        borderWidth={1}
                        borderColor={colors.RED_COLOR}
                        borderRadius={15}
                      />
                      <AppFromField
                        label={CommonText.YEAR}
                        width={'100%'}
                        placeholderTextColor={colors.placeHolderColor}
                        placeholder="Year"
                        autoCapitalize="none"
                        autoCorrect={false}
                        name="Year"
                        keyboardType="numeric"
                        TextContentType="emailAddress"
                        borderColor={colors.primary}
                        borderWidth={1}
                        borderColor={colors.RED_COLOR}
                        borderRadius={15}
                      />
                      <View style={styles.buttonContainer}>
                        <SubmitButton
                          width={'100%'}
                          loading={loading}
                          // onPress={() => setPopUpModalVisible(true)}
                          title={CommonText.SAVE}
                          borderRadius={15}
                        />
                      </View>
                    </AppForm>
                  </View>
                </ScrollView>
              </ImageBackground>
            </View>
          </KeyboardAvoidingView>
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
          {loading ? (
            <CustomActivityIndicator loading={loading} />
          ) : (
            <>
              <View style={styles.headingView1}>
                <Text style={styles.headingtextStyle}>
                  {CommonText.MANAGE_MY_VEHICLE}
                </Text>
              </View>
              <View style={styles.flatlistContainer}>
                <FlatList
                  data={vehicleListData}
                  keyExtractor={item => item.id}
                  numColumns={3}
                  showsVerticalScrollIndicator={false}
                  renderItem={({item}) => {
                    return (
                      <View style={styles.flatlistSection}>
                        <CardItem
                          cardImageUri={item.image}
                          // svgImage={!item.image && carPlaceHolderIcon}
                          image={!item.image && images.imagePlaceholder}
                          cardHeading={item.make}
                          cardText={item.registration_no}
                          onPress={() =>
                            navigation.navigate('ShowNewVehicleDetails', item)
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
              cardText={CommonText.ADD_NEW_VEHICLES}
              svgIcon={vehicleIcon}
              svgRightIcon={arrowRihtIcon}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </ImageBackground>
  );
};

export default ManageMyVehicle;
