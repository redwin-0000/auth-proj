import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

interface CustomCheckboxProps {
  label: string;
  checked: boolean;
  onChange: () => void;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ label, checked, onChange }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onChange}>
      <View style={[styles.checkbox, checked && styles.checked]} />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    backgroundColor: 'green',
    borderColor:'green',
    borderWidth: 2,

  },
  label: {
    color: 'white',
    marginLeft: 8,
  },
});

export default CustomCheckbox;
