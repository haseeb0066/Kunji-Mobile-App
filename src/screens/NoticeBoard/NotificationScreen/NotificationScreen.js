import React, {useState, useEffect} from 'react';
import {View, ImageBackground, FlatList} from 'react-native';
import styles from './styles';
import Header from '../../../components/common/Header/Header';
import {backArrow} from '../../../assets/images/svg/SvgImages';
import colors from '../../../assets/colors/colors';
import images from '../../../assets/images/images';
import Listitem from '../../../components/common/ListItem/ListItem';
import {END_POINTS} from '../../../server/URL';
import apiClient from '../../../Api/client';
import Toast from 'react-native-toast-message';
import CustomActivityIndicator from '../../../components/common/CustomActivityIndicator';
import moment from 'moment';

const NotificationScreen = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [noticesData, setNoticesData] = useState([]);

  const getNoticesList = async () => {
    setLoading(true);
    const response = await apiClient.get(END_POINTS.noticesList);
    // console.log('notices list data ====>', response);
    if (response.ok) {
      setLoading(false);
      setNoticesData(response.data);
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
    getNoticesList();
  }, []);
  return (
    <ImageBackground source={images.splash} style={{flex: 1}}>
      <View style={styles.headercontianer}>
        <Header
          onLeftIconPress={() => {
            navigation.goBack();
          }}
          leftSvgIcon={backArrow(colors.WHITE)}
          title={'Notifications'}
          textColor={'white'}
        />
      </View>
      <View style={styles.flatlistView}>
        {loading ? (
          <CustomActivityIndicator loading={loading} />
        ) : (
          <React.Fragment>
            <FlatList
              data={noticesData}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => (
                <Listitem
                  imageUri={item.get_user_name_list?.profile_picture}
                  title={item.notices_title}
                  subTitle={item.notices_detail}
                  time={moment(item.created_at).format('hh:mm:ss')}
                />
              )}
            />
          </React.Fragment>
        )}
      </View>
    </ImageBackground>
  );
};

export default NotificationScreen;
