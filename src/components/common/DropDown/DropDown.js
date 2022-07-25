import React, {useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {StyleSheet, Platform} from 'react-native';
import {hp, wp} from '../../../utils/CommonMethods';

const DropdownPickerComponent = ({
  style,
  open,
  data,
  items,
  setOpen,
  setValue,
  setItem,
  mode,
}) => {
  return (
    <DropDownPicker
      style={[styles.dropdown, {style}]}
      open={open}
      value={data}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItem}
      listMode={mode}
    />
  );
};
export default DropdownPickerComponent;
const styles = StyleSheet.create({
  dropdown: {
    backgroundColor: 'white',
    width: '100%',
    borderWidth: 1,
    borderColor: '#2F5351',
    borderRadius: 15,
    ...Platform.select({
      ios: {
        padding: hp(1.7),
      },
      android: {
        height: hp(6.5),
      },
    }),
  },
});
