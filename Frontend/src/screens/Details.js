import React from 'react';
import { Text, ScrollView } from 'react-native';
import ImageSlider from '../components/ImageSlider';

const Details = () => {
    return (
        <ScrollView>
            <Text>Details</Text>
            <ImageSlider/>
            <ImageSlider/>
        </ScrollView>
    );
    };

export default Details;