import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";
import images from "../../../assets/images/images";
import { hp } from "../../../utils/CommonMethods";

const s = StyleSheet.create({
//   switch: {
//     alignSelf: "center",
//     marginTop: 20,
//     marginBottom: 20,
//   },
  container: {
    justifyContent:'center'
},
  label: {
    color: "black",
    fontSize: 12,
  },
  input: {
    fontSize: 16,
    color: "black",
    // borderWidth:1, 
    // borderRadius:hp(8)
  }
});


export default class PaymentCard extends Component {
  state = { useLiteCreditCardInput: false };

  _onChange = (formData) => console.log(JSON.stringify(formData, null, " "));
  _onFocus = (field) => console.log("focusing", field);
  _setUseLiteCreditCardInput = (useLiteCreditCardInput) => this.setState({ useLiteCreditCardInput });

  render() {
    return (
      <View style={s.container}>
      
        {/* <Switch
          style={s.switch}
          onValueChange={this._setUseLiteCreditCardInput}
          value={this.state.useLiteCreditCardInput} /> */}
          
        { this.state.useLiteCreditCardInput ?
          (
          
            <LiteCreditCardInput
              autoFocus
              inputStyle={s.input}
              validColor={"black"}
              invalidColor={"red"}
              placeholderColor={"darkgray"}
              onFocus={this._onFocus}
              onChange={this._onChange} />
          ) : ( 
           
            <CreditCardInput
              autoFocus
              requiresName
              requiresCVC
              requiresPostalCode
              labelStyle={s.label}
              inputStyle={s.input}
              validColor={"black"}
              invalidColor={"red"}
              placeholderColor={"darkgray"}
              onFocus={this._onFocus}
              onChange={this._onChange} 
              imageFront ={images.payment_gatway_bg_img}
              />
          )
        } 
      </View>
    );
  }
}