import React from 'react';
import { View, StyleSheet, Text, Image, useWindowDimensions } from 'react-native';

export default WelcomeDialogInner3 = ({width}:{width: number})=> {
    //const { width } = useWindowDimensions();
    return (
        <View style={[styles.container, { width }]}>
            {/* <Image source={item.image} style={[styles.image, { width, resizeMode: 'contain' }]} /> */}

            <View style={{ flex: 0.3 }}>
                <Text style={styles.title}>HI HI Hi Hi</Text>
                <Text style={styles.description}>There</Text>
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
        textAlign: 'center',
        justifyContent: 'center'
    },
    description: {
        fontWeight: '300',
        color: '#62656b',
        textAlign: 'center',
        paddingHorizontal: 64
    },
    innerComponent: {
        backgroundColor: `#7fff00`,
        flex: 1,
        alignItems: 'center',
        width: '100%'
        
    }
});
