import React, {useState, useEffect} from 'react';
import {View, ImageBackground, FlatList, Text} from 'react-native';
import styles from './styles';
import Header from '../../components/common/Header/Header';
import {backArrow} from '../../assets/images/svg/SvgImages';
import colors from '../../assets/colors/colors';
import images from '../../assets/images/images';
import PanicHistoryCard from '../../components/common/PanicHistoryCard/PanicHistoryCard';
import CustomActivityIndicator from '../../components/common/CustomActivityIndicator';
import {END_POINTS} from '../../server/URL';
import apiClient from '../../Api/client';
import Toast from 'react-native-toast-message';

const ViewPanicAlertsHistory = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [alertsData, setAlertsData] = useState([]);

  // get alerts api integrate
  const getPanicAlerts = async () => {
    setLoading(true);
    const response = await apiClient.get(END_POINTS.listPanicAlerts);
    console.log('response ====  viewalets', response);
    if (response.ok) {
      setLoading(false);
      setAlertsData(response?.data);
    } else {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: response.data.message,
      });
    }
  };

  const getItemValue = item => {
    if (item.lat !== 'undefined' && item.long !== 'undefined') {
      return `Lat: ${item.lat} Lng: ${item.long}`;
    } else if (item.other_field !== 'null') {
      return item.other_field;
    } else return item.map_id;
  };

  useEffect(() => {
    getPanicAlerts();
  }, []);

  return (
    <ImageBackground source={images.splash} style={{flex: 1}}>
      <View style={styles.headercontianer}>
        <Header
          onLeftIconPress={() => {
            navigation.goBack();
          }}
          leftSvgIcon={backArrow(colors.WHITE)}
          title={'View History'}
          textColor={'white'}
        />
      </View>
      <Text style={styles.textstyle}>Alerts type</Text>
      <View style={{flex: 1}}>
        {loading ? (
          <CustomActivityIndicator loading={loading} />
        ) : (
          <React.Fragment>
            <FlatList
              data={alertsData}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => (
                <PanicHistoryCard
                  name={item.alarm_type}
                  address={getItemValue(item)}
                  dateandtime={item.created_at}
                />
              )}
            />
          </React.Fragment>
        )}
      </View>
    </ImageBackground>
  );
};

export default ViewPanicAlertsHistory;
