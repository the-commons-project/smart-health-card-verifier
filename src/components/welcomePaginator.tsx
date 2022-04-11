import React from 'react';
import { View, StyleSheet, Animated, useWindowDimensions } from 'react-native';

  

export default ({ data, scrollX, width }:{data:any[], scrollX:any, width:number}) => {
    
    return (
        <View style={{ flexDirection: 'row', height: 20 }}> 
        {data.map((_item: any, i: number) => {
            const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

            const dotWidth = scrollX.interpolate({
                inputRange,
                outputRange: [10, 20, 10],
                extrapolate: 'clamp'
            });

            const opacity = scrollX.interpolate({
                inputRange,
                outputRange: [0.3, 1, 0.3],
                extrapolate: 'clamp'
            })

            return <Animated.View style={[styles.dot, {width: dotWidth, opacity }]} key={i.toString()} />;
        })}
        </View>
    );
};

const styles = StyleSheet.create({
    dot: {
        height: 10,
        borderRadius: 5,
        backgroundColor: '#493d8a',
        marginHorizontal: 8,
    },
});