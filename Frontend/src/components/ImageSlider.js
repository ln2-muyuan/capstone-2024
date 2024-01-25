import React, { useEffect, useState } from 'react';
import { View, Animated, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
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


  // 打印所有tag
  diagnosis.diagnosisImage.forEach((item) => {
    console.log(item.tag);
  });


  // 在这里设置哪个图片
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (model === 'Preview') {

      setImages(diagnosis.diagnosisImage.find((item) => item.tag === tag).image);
      
    } 
    else if (model === 'ResNetTotalMask') {

      setImages(diagnosis.diagnosisImageResNetTotalMask.find((item) => item.tag === tag).image);
      
    }
  

  }, []);


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

  const handleLeftButtonPress = () => {
    if (sliderValue > 0.1) {
      setSliderValue(sliderValue - 0.1);
    }
    if (sliderValue < 0.1) {
      setSliderValue(0);
    }
  };

  const handleRightButtonPress = () => {
    if (sliderValue < 0.9) {
      setSliderValue(sliderValue + 0.1);
    }
    if (sliderValue > 0.9) {
      setSliderValue(1);
    }
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


      <View style={styles.sliderContainer}>
      
      <TouchableOpacity onPress={handleLeftButtonPress}>
        <View style={styles.buttonContainer}>
          <Image source={require('../assets/left-arrow.png')} style={styles.buttonImage} />
        </View>
      </TouchableOpacity>
    

      <Slider
        style={{ marginTop: 5, flex: 1 }}
        minimumValue={0}
        maximumValue={1}
        value={sliderValue}
        onValueChange={handleSliderChange}
      />

      <TouchableOpacity onPress={handleRightButtonPress}>
        <View style={styles.buttonContainer}>
          <Image source={require('../assets/right-arrow.png')} style={styles.buttonImage} />
        </View>
      </TouchableOpacity>

      </View>
 
    </View>
  );
};

const styles = StyleSheet.create({

  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 30,
    marginHorizontal: 20,
  },
  buttonImage: {
    width: 28,
    height: 28,
  },
  buttonContainer: {
    alignItems: 'center',
  },
});



export default ImageSlider;