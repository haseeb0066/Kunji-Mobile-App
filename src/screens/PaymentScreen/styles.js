import { StyleSheet } from "react-native"
import colors from "../../assets/colors/colors";
import { hp, wp } from "../../utils/CommonMethods";
import fonts from '../../assets/fonts/fonts';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent:'center',
        alignItems: "center"
    },
    headerView: {
        flex: 0.08,
        marginTop: hp(4),
        width: '90%',
        // borderWidth: 1
    },
    paymentCardView: {
        flex: 0.31,
        // borderWidth: 1,
        width: wp("90%"),
        justifyContent: 'center'
    },
    payment_bg_img_style: {
        width: wp("90%"),
        height: hp("30%"),

    },

    textView1: {
        flex: 0.16,
        paddingLeft: wp(9),
        // borderWidth: 1,
        width: wp('90%'),
        justifyContent: 'center'
    },
    textStyle1: {
        color: colors.WHITE
    },
    textStyle2: {
        color: colors.WHITE,
        fontSize: fonts.H5,
        fontWeight: "bold"

    },
    textView2: {
        flex: 0.26,
        // borderWidth: 1,
        paddingLeft: wp(9),
        // borderWidth: 1,
        width: wp('90%'),
        justifyContent: 'center'
    },
    textStyle3: {
        color: colors.WHITE
    },
    textView3: {
        flex: 0.26,
        // borderWidth: 1,
        paddingLeft: wp(9),
        // borderWidth: 1,
        width: wp('90%'),
        justifyContent: 'center'
    },
    detailContainer:
    {
        flex: 1,
        flexDirection: 'row'
    },
    View1: {
        flex: 0.4,
        justifyContent: 'center'
    },
    text1: {
        color: 'white',
        fontSize: 12,
        fontWeight: '600'
    },
    text2:
    {
        color: 'white',
        fontSize: 18
    },
    view2:
    {
        flex: 0.3,
        alignItems: 'center',
        justifyContent: 'center'
    }
    ,
    text3: {
        color: 'white'
    },
    text4: { 
        color: 'white', 
        fontSize: 15, 
        fontWeight: 'bold' 
    },
    view3: {
         flex: 0.3, 
         justifyContent: 'center', 
         alignItems: 'center' 
        },
        inputArea: {
            flex: 0.6,
            borderWidth: 1,
            width: wp("90%"),
            // alignItems: 'center',
           
        }
})

export default styles;