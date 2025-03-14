import React, { useEffect, useRef, useState } from 'react';
import { FlatList, StyleSheet, View, Image, Text } from 'react-native';
import Topnavigation from '../../utils/Topnavigation';

const HorizondalBanner = ({ images, delay }: any) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null); 

  useEffect(() => {
    const intervalId = setInterval(() => {
      const nextIndex = (currentIndex + 1) % images.length; 
      setCurrentIndex(nextIndex);
      
      if (flatListRef.current) {
        flatListRef.current.scrollToIndex({
          index: nextIndex,
          animated: true,
        });
      }
    }, delay);

    return () => clearInterval(intervalId); 
  }, [currentIndex, delay, images.length]);

  const renderItem = ({ item }: { item: any }) => {
    return (
      <Image
        source={item}
        style={{
          width: 350,
          height: 150, 
          resizeMode: 'cover', 
    
          
        }}
        onError={() => console.error('Error loading image')}
      />
    );
  };

  return (
    <View
      style={{
        width: 350, 
        height: 150, 
        marginVertical:10,
        backgroundColor: 'red', 
        overflow: 'hidden',
        alignSelf:'center',
        borderRadius:10
      }}
    >
      <FlatList
        ref={flatListRef} 
        data={images} 
        horizontal 
        pagingEnabled 
        scrollEnabled={false} 
        renderItem={renderItem} 
        keyExtractor={(item, index) => index.toString()} 
        showsHorizontalScrollIndicator={false} 
      />
    </View>
  );
};

const images = [
  require('../../assets/samplebanner/dab019.jpg'),
  require('../../assets/samplebanner/dab019.jpg'),
  require('../../assets/samplebanner/dab018.jpg'),
];

const RewardIncentives = () => {
  return (
    <View>
      <Topnavigation label="Reward & Incentives" />
      {/* <View>
        <Text>Reward & Incentives</Text>
      </View> */}
      <View>
        <HorizondalBanner images={images} delay={3000} />
      </View>
    </View>
  );
};

export default RewardIncentives;

const styles = StyleSheet.create({});
