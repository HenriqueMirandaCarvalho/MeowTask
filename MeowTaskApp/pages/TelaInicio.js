import React from 'react';
import { StatusBar, StyleSheet, View, ImageBackground, Text } from 'react-native';

export default class TelaInicio extends React.Component {
    componentDidMount() {
        StatusBar.setHidden(true);
    }
    render() {
        const resizeMode = 'center';
        const styles = StyleSheet.create({
            container: {
              flex: 1,
              flexDirection: "column"
            },
            image: {
              flex: 1,
              resizeMode: "cover",
              justifyContent: "center"
            },
            text: {
              color: "grey",
              fontSize: 30,
              fontWeight: "bold"
            }
        });
        return (
            <View style={styles.container}>
                <ImageBackground source={{ uri: "./img/icone.png" }} style={styles.image}>
                    <Text>TESTE</Text>
                </ImageBackground>
            </View>
        );
    }
}