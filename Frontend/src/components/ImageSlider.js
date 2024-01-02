import React, { useState } from 'react';
import { View, Animated } from 'react-native';
import Slider from '@react-native-community/slider';

  const ImageSlider = () => {

    const images = [
        require('../assets/20210119001723/T1GC_png_slice/slice_0.png'),
        require('../assets/20210119001723/T1GC_png_slice/slice_1.png'),
        require('../assets/20210119001723/T1GC_png_slice/slice_2.png'),
        require('../assets/20210119001723/T1GC_png_slice/slice_3.png'),
        require('../assets/20210119001723/T1GC_png_slice/slice_4.png'),
        require('../assets/20210119001723/T1GC_png_slice/slice_5.png'),
        require('../assets/20210119001723/T1GC_png_slice/slice_6.png'),
        require('../assets/20210119001723/T1GC_png_slice/slice_7.png'),
        require('../assets/20210119001723/T1GC_png_slice/slice_8.png'),
      ];
    
    const [sliderValue, setSliderValue] = useState(0);
    const handleSliderChange = (value) => {
      setSliderValue(value);
    };
  
    const calculateImageIndex = () => {
      const index = Math.floor(sliderValue * (images.length - 1));
      return index;
    };
  
    return (
      <View>
        <View style={{ alignItems: 'center' }}>
          <Animated.Image
            style={{
              width: 350,
              height: 350,
              borderRadius: 10,
              marginTop: 20,
            }}
            source={images[calculateImageIndex()]}
          />
        </View>
        <Slider
          style={{ marginHorizontal: 50, marginTop: 20}}
          minimumValue={0}
          maximumValue={1}
          value={sliderValue}
          onValueChange={handleSliderChange}
        />
      </View>
    );
  };
  
  export default ImageSlider;