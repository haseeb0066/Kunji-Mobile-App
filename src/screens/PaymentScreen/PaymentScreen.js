import React from 'react';
import {View, Text, Image, ImageBackground} from 'react-native';
import images from '../../assets/images/images';

import styles from './styles';

import PaymentCard from '../../components/common/PaymentCard/PaymentCard';

const PaymentScreen = () => {
  return (
    <ImageBackground
      resizeMode={'stretch'}
      source={images.home_Scr_Backgrd_Img}
      style={styles.container}>
      {/* <View style={styles.headerView}>
                <Header
                    leftIconPath={images.left_header_icon1}
                    rightIconSize={hp(3)}
                    tintColor={colors.DEEP_PURPLE}
                    onPress={() => {
                        Submit();
                    }}
                />
            </View>
            <View style={styles.paymentCardView}>
                <ImageBackground
                    style={styles.payment_bg_img_style}
                    resizeMode={'stretch'}
                    source={images.payment_gatway_bg_img}>
                    <View style={{ flex: 1}}>
                        <View style={{ flex: 0.16 }}></View>

                        <View style={styles.textView1}>
                            <Text style={styles.textStyle1}>{"International Credit"}</Text>
                        </View>
                        <View style={styles.textView2}>
                            <Text style={styles.textStyle2}>{"3827 **** **** ****"}</Text>
                        </View>

                        <View style={styles.textView3}>
                            <View style={styles.detailContainer}>
                                <View style={styles.View1}>
                                    <Text style={styles.text1}>{'Card Holder name'}</Text>
                                    <Text style={styles.text2}>{'*************'}</Text>
                                </View>
                                <View style={styles.view2}>
                                    <Text style={styles.text3}>{'Expiry date'}</Text>
                                    <Text style={styles.text4}>{'02/30'}</Text>
                                </View>
                                <View style={styles.view3}>
                                    <Image style={{ resizeMode: 'contain' }} source={images.payment_card_logo} />
                                </View>
                            </View>
                        </View>

                        <View style={{ flex: 0.1}}></View>
                    </View>
                </ImageBackground>
            </View>
            <View style={styles.inputArea}>
                <View style={{paddingTop:hp(5)}}>
                        {/* <Text style={{fontSize:16}}>{"Full Name"}</Text>
                        <AppInput/> */}

      {/* </View> */}
      {/* // </View>  */}
      <View>
        <PaymentCard />
      </View>
    </ImageBackground>
  );
};

export default PaymentScreen;
