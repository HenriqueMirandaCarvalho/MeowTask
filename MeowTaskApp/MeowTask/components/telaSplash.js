import React, { useState, useEffect } from "react";
import { View, NetInfo, Alert, Platform } from "react-native";
import { AppLoading } from 'expo';
import { useFonts } from 'expo-font';
import * as firebase from 'firebase';
import { NavigationActions, StackActions } from 'react-navigation';

const telaSplash = (props) => {
    if (!firebase.apps.length) {
        var firebaseConfig = {
            apiKey: "AIzaSyApt9TUJkguD9IDJ2LmU4ReiqF06hPLH4o",
            authDomain: "meowtask-ea038.firebaseapp.com",
            databaseURL: "https://meowtask-ea038.firebaseio.com",
            projectId: "meowtask-ea038",
            storageBucket: "meowtask-ea038.appspot.com",
            messagingSenderId: "256053222242",
            appId: "1:256053222242:web:92e7b03603d6674e2d2a3b",
            measurementId: "G-FJH8MESQTJ"
        };
        firebase.initializeApp(firebaseConfig);
    }
    if (Platform.OS === "android") {
        NetInfo.isConnected.fetch().then(isConnected => {
            if (isConnected) {
                firebase.auth().onAuthStateChanged((user) => {
                    if (user) {
                        const resetAction = StackActions.reset({
                            index: 0,
                            actions: [
                                NavigationActions.navigate({ routeName: 'Home' }),
                            ],
                        });
                        props.navigation.dispatch(resetAction);
                    }
                    else {
                        const resetAction = StackActions.reset({
                            index: 0,
                            actions: [
                                NavigationActions.navigate({ routeName: 'Inicio' }),
                            ],
                        });
                        props.navigation.dispatch(resetAction);
                    }
                });
            } else {
                Alert.alert("You are offline!");
            }
        });

        let [fontsLoaded] = useFonts({
            'Roboto-Light': require('./font/Roboto-Light.ttf'),
        });

        if (!fontsLoaded) {
            return <AppLoading />;
        } else {
            return <View></View>
        }
    }
}
export default telaSplash;