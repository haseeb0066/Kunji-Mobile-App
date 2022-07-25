import React, {useEffect, useState} from 'react';
import {View, Text, ImageBackground, FlatList} from 'react-native';
import styles from './styles';
import images from '../../../assets/images/images';
import Header from '../../../components/common/Header/Header';
import {backArrow} from '../../../assets/images/svg/SvgImages';
import colors from '../../../assets/colors/colors';
import Listitem from '../../../components/common/ListItem/ListItem';
import AppButton from '../../../components/common/AppButton';
import apiClient from '../../../Api/client';
import {END_POINTS} from '../../../server/URL';
import {useFocusEffect} from '@react-navigation/native';
import moment from 'moment';

const Poll = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [poolData, setPoolData] = useState([]);

  const getPollList = async () => {
    setLoading(true);
    const poolListResult = await apiClient.get(END_POINTS.getPoolList);
    console.log(poolListResult.data);
    if (poolListResult.ok) {
      setLoading(false);
      setPoolData(poolListResult.data);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      getPollList();
    }, []),
  );
  // useEffect(() => {
  //   getPollList();
  // }, []);
  return (
    <ImageBackground source={images.splash} style={{flex: 1}}>
      <View style={styles.headercontianer}>
        <Header
          onLeftIconPress={() => {
            navigation.goBack();
          }}
          leftSvgIcon={backArrow(colors.WHITE)}
          title={'Polls'}
          textColor={'white'}
        />
      </View>
      <View style={styles.buttonstyles}>
        <AppButton
          title={'Create New Poll'}
          width="85%"
          onPress={() => navigation.navigate('User poll')}
        />
      </View>
      <View style={styles.flatlistView}>
        <FlatList
          data={poolData}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <Listitem
              imageUri={item.user?.profile_picture}
              title={item.question}
              subTitle={`by ${
                item.user.first_name + ' ' + item.user.last_name
              }`}
              time={moment(item.updated_at).format('hh:mm')}
              onPress={() => navigation.navigate('Vote poll', {poolData: item})}
            />
          )}
        />
      </View>
    </ImageBackground>
  );
};

export default Poll;
