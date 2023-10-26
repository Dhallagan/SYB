import React, { useState, useEffect } from 'react';
import MasonryList from 'react-native-masonry-list';
import { Modal, View, Image, TouchableOpacity, Text } from 'react-native';
import ViewPager from '@react-native-community/viewpager';

export const MasonryImageList = ({ images }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [viewPagerKey, setViewPagerKey] = useState(Math.random().toString());



  const openImage = (id) => {
    setSelectedImageIndex(images.findIndex(image => image.id === id));
    setModalVisible(true);
    setViewPagerKey(Math.random().toString());  // Force re-render of ViewPager
};

  return (
    <>
      <MasonryList
        columns={2}
        images={images}
        backgroundColor={'#000'}
        onPressImage={(item) => openImage(item.id)}
      />

      {isModalVisible && (
        <Modal
          visible={isModalVisible}
          transparent={false}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <ViewPager
                style={{ flex: 1, backgroundColor:'#000' }}
                initialPage={selectedImageIndex}
                key={viewPagerKey}
            >
                {images.map((image, index) => (
                    <View key={image.id} style={{ flex: 1, justifyContent: 'center' }}>
                        <TouchableOpacity
                            style={{ flex: 1 }}
                            onPress={() => setModalVisible(false)}
                        >
                            <Image
                                source={{ uri: image.uri }}
                                style={{ flex: 1, resizeMode: 'contain' }}
                            />
                        </TouchableOpacity>
                    </View>
                ))}
            </ViewPager>

        </Modal>
      )}
    </>
  );
};

export default MasonryImageList;
