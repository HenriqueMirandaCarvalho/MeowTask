import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
const CustomButton = (props) => {
    const {title = 'Enter', style = {}, textStyle = {}, onPress } = props;
    return (
        <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
            <Text style={[styles.text, textStyle]}>{props.title}</Text>
        </TouchableOpacity>
    );
};
const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        backgroundColor: '#f05555',
        color: '#ffffff',
        padding: 10,
        marginTop: 16,
        marginLeft: 35,
        marginRight: 35,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffffff',
        marginLeft: 5,
        marginRight: 5,
    },
});
export default CustomButton;