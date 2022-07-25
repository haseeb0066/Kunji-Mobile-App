import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  FlatList,
  Modal,
} from 'react-native';
import {wp, hp} from '../../../utils/CommonMethods';
import styles from './styles';
import colors from '../../../assets/colors/colors';
import SvgComponent from '../SvgCustomComponents/SvgCustomComponents';
import {CalenderIcon, crossIcon2} from '../../../assets/images/svg/SvgImages';
import moment from 'moment';
import AppButton from '../AppButton';
import {arrowdown} from '../../../assets/images/svg/SvgImages';
import ImageViewer from 'react-native-image-zoom-viewer';

const ComplaintDropDown = ({Object}) => {
  const [complainDropDown, setcomplainDropDown] = useState(false);
  const [ImageShow, setImageShow] = useState('');
  const [visibleZoomImageModal, setVisibleZoomImageModal] = useState(false);

  // console.log('Object ===> ', Object.created_at);

  let CreatedDate = moment(Object.created_at).format();
  CreatedDate = CreatedDate.slice(0, 10);
  // console.log('CreatedDate ===> ', CreatedDate);

  let CreatedTime = moment(Object.created_at).format();
  CreatedTime = CreatedTime.slice(11, 19);
  // console.log('CreatedTime ===> ', CreatedTime);

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
        console.log(selectedImages);
        setAttachImage(prev => [...prev, selectedImages[0]]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <View style={styles.miancontainer}>
        <TouchableOpacity
          style={styles.inputView}
          onPress={() => setcomplainDropDown(!complainDropDown)}>
          <View style={styles.heading}>
            <Text style={styles.nameText}>{Object.title}</Text>
          </View>
          <View style={styles.arrowdown}>
            <SvgComponent svgMarkup={arrowdown} />
          </View>
        </TouchableOpacity>
      </View>

      {complainDropDown && (
        <React.Fragment>
          <View style={styles.dropdowncontianer}>
            <View style={styles.dropdownstyle}>
              <View style={styles.datetimecontianer}>
                <Text style={styles.lableText}>{'Date'}</Text>
                <View style={styles.datepickerView}>
                  <View style={styles.dateView}>
                    <Text style={styles.datePickerText}>{CreatedDate}</Text>
                  </View>
                  <View style={styles.iconView}>
                    <SvgComponent svgMarkup={CalenderIcon} />
                  </View>
                </View>
              </View>
              <View style={styles.datetimecontianer}>
                <Text style={styles.lableText}>{'Time'}</Text>
                <View style={styles.datepickerView}>
                  <View style={styles.dateView}>
                    <Text style={styles.datePickerText}>{CreatedTime}</Text>
                  </View>
                  <View style={styles.iconView}>
                    <SvgComponent svgMarkup={CalenderIcon} />
                  </View>
                </View>
              </View>
              {/* ====================  Desription ===================== */}
              <View style={styles.inputContainer}>
                <Text style={styles.textstyle}>{'Desription'}</Text>
                <View style={styles.desContianer}>
                  <TextInput
                    style={styles.desTextContianer}
                    value={Object.description}
                    placeholder="Description..."
                    multiline={true}
                    editable={false}
                  />
                </View>

                {/* ====================  Attachments ===================== */}
                {Object?.attachments && (
                  <>
                    <Text style={styles.textstyle}>{'Attachments'}</Text>
                    <View style={styles.desContianer}>
                      <FlatList
                        horizontal={true}
                        data={Object?.attachments}
                        keyExtractor={item => item?.id}
                        renderItem={({item}) => (
                          <View style={styles.FlatListView}>
                            <TouchableOpacity
                              style={{flexDirection: 'row'}}
                              onPress={() => {
                                setVisibleZoomImageModal(true),
                                  setImageShow(item);
                              }}>
                              <Image
                                style={styles.imageStyle}
                                source={{uri: item}}
                              />
                            </TouchableOpacity>
                          </View>
                        )}
                      />
                    </View>
                  </>
                )}

                {/* ====================  Comments ===================== */}

                {Object?.comments && (
                  <View>
                    <Text style={styles.textstyle}>{'Desription'}</Text>
                    <View style={styles.desContianer}>
                      <TextInput
                        style={styles.desTextContianer}
                        value={Object.comments[0]}
                        placeholder="Description..."
                        multiline={true}
                        editable={false}
                      />
                    </View>
                  </View>
                )}
              </View>
              <View style={styles.bottoncontianer}>
                <AppButton
                  title="CLOSE"
                  width={wp(30)}
                  backgroundColor={colors.GRAY}
                  padding={hp(0.8)}
                  borderRadius={50}
                  onPress={() => setcomplainDropDown(false)}
                />
              </View>
            </View>
            {/* ================== MOdal ================= */}
          </View>
          {/* <View> */}
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
                    url: ImageShow,
                    props: {},
                  },
                ]}
              />
            </View>
          </Modal>
          {/* </View> */}
        </React.Fragment>
      )}
    </View>
  );
};
export default ComplaintDropDown;
