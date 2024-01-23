import React, { useState } from 'react';
import { View, Animated, Text } from 'react-native';
import Slider from '@react-native-community/slider';
import { useSelector } from 'react-redux';


// 传入参数记得带上{}
const ImageSlider = ({ diagnosisID, tag, model }) => {

  // const diagnosis = useSelector((state) => state.diagnosis.diagnosis);
  console.log("ImageSlider diagnosisID: ", diagnosisID)
  console.log("ImageSlider tag: ", tag)
  console.log("ImageSlider model: ", model)

  // 打印diag的内容的方式
  const diagnosis = useSelector((state) => state.diag.diag);
  const keys = Object.keys(diagnosis);
  console.log("ImageSlider: " + diagnosis.diagnosisID);
  console.log("ImageSlider: " + Object.keys(diagnosis))
  // keys.forEach((key) => {
  //   console.log(`${key}: ${diagnosis[key]}`);
  // });

  // 在这里设置哪个图片
  const images = diagnosis.diagnosisImage[0].image


  // const images = [
  //     require('../assets/20210119001723/T1GC_png_slice/slice_0.png'),
  //     require('../assets/20210119001723/T1GC_png_slice/slice_1.png'),
  //     require('../assets/20210119001723/T1GC_png_slice/slice_2.png'),
  //     require('../assets/20210119001723/T1GC_png_slice/slice_3.png'),
  //     require('../assets/20210119001723/T1GC_png_slice/slice_4.png'),
  //     require('../assets/20210119001723/T1GC_png_slice/slice_5.png'),
  //     require('../assets/20210119001723/T1GC_png_slice/slice_6.png'),
  //     require('../assets/20210119001723/T1GC_png_slice/slice_7.png'),
  //     require('../assets/20210119001723/T1GC_png_slice/slice_8.png'),
  //   ];
  
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
          source={{ uri: `data:image/png;base64, ${images[calculateImageIndex()]}` }}
        />
      </View>
      <Slider
        style={{ marginHorizontal: 50, marginTop: 20, marginBottom: 50 }}
        minimumValue={0}
        maximumValue={1}
        value={sliderValue}
        onValueChange={handleSliderChange}
      />

 
    </View>
  );
};

export default ImageSlider;