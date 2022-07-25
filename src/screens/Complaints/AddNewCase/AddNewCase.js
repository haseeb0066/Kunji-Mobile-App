import React, {useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  AttachIcon,
  backArrow,
  crossIcon,
  closeIcon,
  UploadIcon,
  crossIcon2,
} from '../../../assets/images/svg/SvgImages';
import images from '../../../assets/images/images';
import styles from './styles';
import Header from '../../../components/common/Header/Header';
import colors from '../../../assets/colors/colors';
import AppForm from '../../../components/common/FormComponents/AppForm';
import AppFromField from '../../../components/common/FormComponents/AppFormField';
import {hp, wp} from '../../../utils/CommonMethods';
import * as Yup from 'yup';
import AppButton from '../../../components/common/AppButton';
import PopUpModal from '../../../components/common/PopUpModal/PopUpModal';
import SuccessAnimation from '../../../assets/Animations/success.json';
import {launchImageLibrary} from 'react-native-image-picker';
import ImageViewer from 'react-native-image-zoom-viewer';
import SvgComponent from '../../../components/common/SvgCustomComponents/SvgCustomComponents';
import {Modal} from 'react-native';
import {useRoute} from '@react-navigation/native';
import SubmitButton from '../../../components/common/FormComponents/SubmitButton';
import apiClient from '../../../Api/client';
import {END_POINTS} from '../../../server/URL';

const AddNewCase = ({navigation}) => {
  const {params} = useRoute();
  const [visibleZoomImageModal, setVisibleZoomImageModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [popUpModalVisible, setPopUpModalVisible] = useState(false);
  const [attachimage, setAttachImage] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [showImage, setShowImage] = useState(null);
  const [message, setMessage] = useState('');

  //=========== Formik ===================
  const initialValues = {
    casetitle: '',
    description: '',
  };
  const validationSchema = Yup.object({
    casetitle: Yup.string().required('Case title is required field'),
    description: Yup.string().required('Description is required field'),
  });

  // remove attachimage upload images
  const removeImageList = fileName => {
    const data = attachimage.filter(img => img.fileName !== fileName);
    setAttachImage(data);
  };

  // gallary open function
  const galleryOpen = async () => {
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
        console.log('selectedImages 123 ==> ', selectedImages);
        setAttachImage(prev => [...prev, selectedImages[0]]);
        setShowImage(response.assets);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addComplainAPI = async value => {
    let formdata = new FormData();

    formdata.append('title', value.casetitle);
    formdata.append('description', value.description);
    attachimage?.forEach(fileDoc => {
      console.log('attachimage ==>  ', fileDoc?.fileName);
      let obj = {
        uri: fileDoc?.uri,
        name: fileDoc?.fileName,
        type: fileDoc?.type,
      };
      formdata.append('attachments[]', obj);
    });

    console.log('result formdata ===>  ', formdata);
    setLoading(true);
    const result = await apiClient.post(END_POINTS.AddNewComplain, formdata);
    if (result.ok) {
      setLoading(false);
      console.log('result.ok ===>  ', result);
      setMessage(result.data.message);
      setPopUpModalVisible(true);
    } else {
      setLoading(false);
      console.log('erorrrr ===> ', result.data);
    }
  };

  return (
    <ImageBackground
      source={images.appBackgroundLight}
      style={styles.contianer}>
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

                //url: params.userImage,
                // url: params.image,

                props: {
                  // headers: ...
                },
              },
            ]}
          />
        </View>
      </Modal>
      <View style={styles.headercontianer}>
        <Header
          onLeftIconPress={() => {
            navigation.goBack();
          }}
          leftSvgIcon={backArrow(colors.primary)}
          title="Complaints"
          textColor={colors.primary}
        />
      </View>
      <PopUpModal
        modalVisiblePopUp={popUpModalVisible}
        source={SuccessAnimation}
        onPress={() => {
          setPopUpModalVisible(false);
          setModalVisible(false);
          navigation.navigate('OpenCase');
        }}
        messageText={message}
        title="OK"
      />

      <Text style={styles.textstyle}>New Case</Text>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <ScrollView>
          <View style={styles.inputContainer}>
            <AppForm
              initialValues={initialValues}
              validationSchema={validationSchema}
              // onSubmit={addComplainAPI}
              onSubmit={value => addComplainAPI(value)}>
              <AppFromField
                label={'Case Title'}
                width={'95%'}
                placeholderTextColor={colors.placeHolderColor}
                placeholder="Dirty Bill"
                autoCapitalize="none"
                autoCorrect={false}
                name="casetitle"
                keyboardType="email-address"
                TextContentType="emailAddress"
                borderColor={colors.primary}
                borderWidth={1}
                borderRadius={15}
              />
              <AppFromField
                width={'95%'}
                label={'Desription'}
                placeholderTextColor={colors.placeHolderColor}
                placeholder="These  Terms Conditions Constitute Alegally"
                autoCapitalize="none"
                autoCorrect={false}
                name="description"
                keyboardType="email-address"
                TextContentType="emailAddress"
                borderWidth={1}
                borderRadius={15}
                maxHeight={80}
                minHeight={Platform.OS === 'ios' ? hp(13.5) : hp(16)}
                multiline={true}
                textAlignVertical="top"
                borderColor={colors.primary}
              />

              {/* attachimage components */}
              <Text style={styles.attachtext}>Attachments</Text>
              <View>
                {attachimage.length < 1 && (
                  <TouchableOpacity
                    style={styles.uploadSection}
                    onPress={galleryOpen}>
                    <Text style={styles.uploadTextDoc}>{'Attach Image'}</Text>
                    <View style={{marginHorizontal: hp(22)}}>
                      <SvgComponent svgMarkup={AttachIcon} />
                    </View>
                  </TouchableOpacity>
                )}
                {attachimage.length >= 1 && (
                  <View style={styles.uploadSection}>
                    <View style={styles.selectContainer}>
                      {attachimage.length >= 1 &&
                        attachimage.map(image => (
                          <TouchableOpacity
                            key={image.fileName}
                            style={styles.imageContainer}
                            onPress={async () =>
                              setVisibleZoomImageModal(true)
                            }>
                            <Image style={styles.imageStyle} source={image} />
                            <TouchableOpacity
                              style={styles.crossContainer}
                              onPress={() => removeImageList(image.fileName)}>
                              <SvgComponent svgMarkup={closeIcon} />
                            </TouchableOpacity>
                          </TouchableOpacity>
                        ))}
                      {attachimage.length < 2 >= 1 && (
                        <View style={styles.imageContainer}>
                          <TouchableOpacity onPress={galleryOpen}>
                            <Text style={styles.plusStyle}>{'+'}</Text>
                          </TouchableOpacity>
                        </View>
                      )}
                    </View>
                  </View>
                )}
                <View style={styles.buttonContainer}>
                  <SubmitButton
                    title="SUBMIT"
                    width={'100%'}
                    borderRadius={15}
                    loading={Loading}
                  />
                </View>
              </View>
            </AppForm>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default AddNewCase;
