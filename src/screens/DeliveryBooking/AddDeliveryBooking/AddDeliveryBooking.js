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
import * as Yup from 'yup';
import styles from './styles';
import images from '../../../assets/images/images';
import colors from '../../../assets/colors/colors';
import CardItem from '../../../components/common/CardItem/CardItem';
import Header from '../../../components/common/Header/Header';
import AppButton from '../../../components/common/AppButton';
import PopUpModal from '../../../components/common/PopUpModal/PopUpModal';
import AppForm from '../../../components/common/FormComponents/AppForm';
import AppFromField from '../../../components/common/FormComponents/AppFormField';
import SubmitButton from '../../../components/common/FormComponents/SubmitButton';
import SvgComponent from '../../../components/common/SvgCustomComponents/SvgCustomComponents';
import SuccessAnimation from '../../../assets/Animations/success.json';
import AppDateTimePickerField from '../../../components/common/FormComponents/AppDateTimePickerField';
import {hp, wp} from '../../../utils/CommonMethods';
import {launchImageLibrary} from 'react-native-image-picker';
import {
  CalenderIcon,
  backArrow,
  FamilyProfileIcon,
} from '../../../assets/images/svg/SvgImages';
import AppModalField from '../../../components/common/FormComponents/AppModalField';
import {useIsFocused} from '@react-navigation/native';
import {END_POINTS} from '../../../server/URL';
import Toast from 'react-native-toast-message';
import apiClient from '../../../Api/client';
import CustomActivityIndicator from '../../../components/common/CustomActivityIndicator';

const AddDeliveryBooking = ({navigation}) => {
  const isFocused = useIsFocused();
  const [modalVisible, setModalVisible] = useState(false);
  const [popUpModalVisible, setPopUpModalVisible] = useState(false);
  const [mediaUri, setMediaUri] = useState(null);
  const [popUpModalMessage, setPopUpModalMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [deliverDate, setDeliveryDate] = useState([]);
  const [reloadDeliveryListing, setReloadDeliveryListing] = useState(null);

  const [propertyOpen, setPropertyOpen] = useState(false);
  const [propertyValue, setPropertyValue] = useState(null);
  const [propertyItem, setPropertyItem] = useState([]);

  const initialValues = {
    deliveryVendor: '',
    orderNumber: '',
    arrivalDate: '',
    arrivalTime: '',
    leavingDate: '',
    leavingTime: '',
    selectProperty: '',
  };
  const validationSchema = Yup.object({
    deliveryVendor: Yup.string().required('Delivery vendor is required field'),
    orderNumber: Yup.string().required('Order number no is required field'),
    arrivalTime: Yup.string().required('Please select arrival time to '),
    arrivalDate: Yup.string().required('Please select arrival date to'),
    leavingDate: Yup.string().required('Please select arrival date from'),
    leavingTime: Yup.string().required('Please select arrival time from '),
    selectProperty: Yup.string().required('Please select property'),
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
      }
    } catch (error) {
      console.log(error);
    }
  };
  const Submit = async values => {
    if (!mediaUri) {
      Toast.show({
        type: 'error',
        text1: 'Required',
        text2: 'Kindly upload image',
      });
    } else {
      setLoading(true);
      const imageData = {
        uri: mediaUri[0]?.uri,
        name: mediaUri[0]?.fileName,
        type: mediaUri[0]?.type,
      };
      let formdata = new FormData();
      formdata.append('image', imageData);
      formdata.append('delivery_vendor', values.deliveryVendor);
      formdata.append('order_no', values.orderNumber);
      formdata.append('arrival_date_to', values.arrivalDate);
      formdata.append('arrival_date_form', values.leavingDate);
      formdata.append('arriaval_time_to', values.arrivalTime);
      formdata.append('arriaval_time_form', values.leavingTime);
      formdata.append('select_property', values.selectProperty);
      const result = await apiClient.post(
        END_POINTS.addDeliveryBooking,
        formdata,
      );
      console.log('result delivery book data ===>', result);
      if (result.ok) {
        setLoading(false);
        setPopUpModalMessage(result.data?.message);
        setPopUpModalVisible(true);
        setReloadDeliveryListing(true);
      } else {
        setLoading(false);
        Toast.show({
          type: 'error',
          text1: 'Required',
          text2: result.data.message,
        });
      }
    }
  };

  const getDeliveryListApi = async () => {
    setLoading(true);
    const response = await apiClient.get(END_POINTS.getDeliveryBookingList);
    // console.log('response delivery booking===>', response);
    if (response.ok) {
      setLoading(false);
      setDeliveryDate(response?.data);
    } else {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: response.data.message,
      });
    }
  };

  useEffect(() => {
    getDeliveryListApi();
  }, [reloadDeliveryListing]);

  // get property api
  const getProperty = async () => {
    const res = await apiClient.get(END_POINTS.getPropertiesList);
    // console.log('getProperty list res==>  ', res.data?.user_property_list);
    if (res.ok) {
      setPropertyItem(res.data?.user_property_list);
    } else {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: res.data.message,
      });
    }
  };
  useEffect(() => {
    getProperty();
  }, []);

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
                style={{flex: 1, paddingTop: hp(1)}}
                imageStyle={styles.formBG}>
                <View style={styles.headingSection}>
                  <Text style={styles.headingText}>{'Add New Delivery '}</Text>
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
                        label="Delivery Vendor"
                        width={'100%'}
                        placeholderTextColor={colors.placeHolderColor}
                        placeholder="Delivery Vendor"
                        autoCapitalize="none"
                        autoCorrect={false}
                        name="deliveryVendor"
                        keyboardType="email-address"
                        TextContentType="emailAddress"
                        borderColor={colors.red}
                        borderWidth={1}
                        borderRadius={15}
                      />
                      <AppFromField
                        label="Order Number"
                        width={'100%'}
                        placeholderTextColor={colors.placeHolderColor}
                        placeholder="Order number"
                        autoCapitalize="none"
                        autoCorrect={false}
                        name="orderNumber"
                        keyboardType="numeric"
                        TextContentType="numeric"
                        borderColor={colors.red}
                        borderWidth={1}
                        borderRadius={15}
                      />
                      {/* arrival date */}
                      <AppDateTimePickerField
                        label={'Arrival Date To'}
                        mode="date"
                        rightSvgIcon={CalenderIcon}
                        name="arrivalDate"
                      />
                      <AppDateTimePickerField
                        label={'Arrival Date From'}
                        mode="date"
                        rightSvgIcon={CalenderIcon}
                        name="leavingDate"
                      />
                      <AppDateTimePickerField
                        label={'Arrival Time To'}
                        mode="time"
                        name="arrivalTime"
                      />
                      <AppDateTimePickerField
                        label={'Arrival Time From'}
                        mode="time"
                        name="leavingTime"
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
                      />
                      <SubmitButton
                        title="SUBMIT"
                        width={'100%'}
                        borderRadius={15}
                        loading={loading}
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
          title="Delivery Booking"
          fontSize={hp(2.2)}
          textColor={colors.WHITE}
        />
      </View>
      <View style={styles.buttonContainer}>
        <AppButton
          title="ADD NEW DELIVERY"
          width={wp(45)}
          backgroundColor={colors.secondaryButtonColor}
          padding={hp(1.2)}
          borderRadius={50}
          onPress={() => setModalVisible(true)}
        />
      </View>
      <View style={styles.flatListContainer}>
        {loading ? (
          <CustomActivityIndicator loading={loading} />
        ) : (
          <React.Fragment>
            <FlatList
              data={deliverDate}
              keyExtractor={item => item.id}
              numColumns={3}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => {
                return (
                  <TouchableOpacity style={styles.flatlistSection}>
                    <CardItem
                      onPress={() =>
                        navigation.navigate('DeliveryBookingDetails', item)
                      }
                      cardImageUri={item.image}
                      image={!item.image && images.imagePlaceholder}
                      cardHeading={item.vendor_id}
                      // cardText={item.order_no}
                      cardSubInfo={item.order_no}
                    />
                  </TouchableOpacity>
                );
              }}
            />
          </React.Fragment>
        )}
      </View>
    </ImageBackground>
  );
};

export default AddDeliveryBooking;
