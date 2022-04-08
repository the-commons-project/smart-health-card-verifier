import React from 'react';
import { View, StyleSheet, Text, Image, useWindowDimensions } from 'react-native';
const width = 300;

export default WelcomeDialogInner2 = ({ width }:{width: number})=> {
    //const { width } = useWindowDimensions();
    
    return (
        <View style={[styles.container, { width }]}>
            {/* <Image source={item.image} style={[styles.image, { width, resizeMode: 'contain' }]} /> */}
            <View>
                <Text style={styles.title}>How it works</Text>
                <Text style={styles.description}>Scanning a SMART Health Card will show the type of record and revelant informations</Text>
                <Text style={styles.title}>Test Record</Text>
                <Text style={styles.description}>The SMART Health Card could be verified. It may have been corrupted or tampered with.</Text>
            </View>
        </View>
    
        
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#FFFFFF"
    },
    image: {
        flex: 0.7,
        justifyContent: 'center'
    }, 
    title: {
        fontWeight: '800',
        fontSize: 28,
        marginBottom: 10,
        color: '#493d8a',
        textAlign: 'center'
    },
    description: {
        fontWeight: '300',
        color: '#62656b',
        textAlign: 'center',
        paddingHorizontal: 0
    },
    innerComponent: {
        backgroundColor: "#FFFFFF",
        flex: 1,
        alignItems: 'center',
        width: '100%',
    }
});
