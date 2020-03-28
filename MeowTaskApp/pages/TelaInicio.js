import React from 'react';
import { StatusBar, StyleSheet, View, ImageBackground, Button, Text } from 'react-native';

export default class TelaInicio extends React.Component {
    componentDidMount() {
        StatusBar.setHidden(true);
    }
    render() {
        const styles = StyleSheet.create({
            container: {
              flex: 1,
              flexDirection: "column"
            },
            image: {
              flex: 1,
              resizeMode: "cover",
              alignItems: "center"
            },
            buttonContainer: {
                paddingVertical: 320
            }
        });
        return (
            <View style={styles.container}>
                <ImageBackground source={require('./img/icone.png')} style={styles.image}>
                    <Button title="test" style={{ color: "#0f3341" }}/>
                </ImageBackground>
            </View>
        );
    }
}