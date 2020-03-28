import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
const CustomButton = props => {
    return (
        <TouchableOpacity style={props.style || styles.button} onPress={props.customClick}>
            <Text style={styles.text}>{props.title}</Text>
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
        marginLeft: 20,
        marginRight: 20,
    },
});
export default CustomButton;