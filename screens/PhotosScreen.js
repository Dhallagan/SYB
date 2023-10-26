import React from 'react';
import { View, StyleSheet } from 'react-native';
import MasonryImageList from '../components/MasonryImageList';
import { CustomHeader } from '../components';

function idGenerator() {
  return Math.random().toString(36).substr(2, 9);
}

export const PhotosScreen = () => {
  const images = [
  {
      uri: "https://scontent-sea1-1.cdninstagram.com/v/t39.30808-6/363763185_18387007981004087_6337002945403486460_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDk2My5zZHIifQ&_nc_ht=scontent-sea1-1.cdninstagram.com&_nc_cat=111&_nc_ohc=Tjr8UKQ2hWcAX9mpBG5&edm=ABmJApAAAAAA&ccb=7-5&ig_cache_key=MzE2NzEyMjMxNjAyNzA1OTAwOQ%3D%3D.2-ccb7-5&oh=00_AfAgDO_OaNY79mUPTlCS-ifmx2jDddAetnqaARdF8hqx2g&oe=653DEE8E&_nc_sid=b41fef",
      id: idGenerator(),
      title: "www.luehangs.site",
      // dimensions: { width: 1080, height: 1920 },
  },
  {
    uri: "https://i.natgeofe.com/n/7d59bf92-a500-4eab-81cb-997a38ce7403/iceland_NationalGeographic_2168279_3x4.jpg",
    id: idGenerator(),
    title: "www.luehangs.site",
    // dimensions: { width: 1080, height: 1920 },
  },

  {
      uri: "https://scontent-sea1-1.cdninstagram.com/v/t39.30808-6/366888189_18387008014004087_4165744341833460178_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDk2Mi5zZHIifQ&_nc_ht=scontent-sea1-1.cdninstagram.com&_nc_cat=111&_nc_ohc=DAMQ8ahG9eAAX9cfWib&edm=ABmJApAAAAAA&ccb=7-5&ig_cache_key=MzE2NzEyMjMxNTgwODk4NjA3Nw%3D%3D.2-ccb7-5&oh=00_AfD95kUUbdF9QFsMK3FJe9oXbnJhw3AewK4gaVzTWjGd9A&oe=653DA11A&_nc_sid=b41fef",
      id: idGenerator(),
      title: "www.luehangs.site",
      // dimensions: { width: 1080, height: 1920 },
  },
  {
    uri: "https://scontent-sea1-1.cdninstagram.com/v/t39.30808-6/363966970_18387007963004087_4508552867128283675_n.jpg?stp=dst-jpg_e35_s720x720_sh0.08&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDk2MS5zZHIifQ&_nc_ht=scontent-sea1-1.cdninstagram.com&_nc_cat=111&_nc_ohc=fZgeLhaoC5MAX9nIjeS&edm=ABmJApAAAAAA&ccb=7-5&ig_cache_key=MzE2NzEyMjMxNjAyNzE1Mzg5MQ%3D%3D.2-ccb7-5&oh=00_AfCCuLEMAKXHwivTXo-TZuRqVeFiS1Wav1uqTdV_OOAdjA&oe=653E1D8F&_nc_sid=b41fef",
    id: idGenerator(),
    title: "www.luehangs.site"
  },
  {
    uri: "https://scontent-sea1-1.cdninstagram.com/v/t39.30808-6/366919005_18387008011004087_7583176892178040075_n.jpg?stp=dst-jpg_e15_s720x720&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi44MDN4NTM3LnNkciJ9&_nc_ht=scontent-sea1-1.cdninstagram.com&_nc_cat=111&_nc_ohc=_oO03_cJ0MwAX8WrkP3&edm=ABmJApAAAAAA&ccb=7-5&ig_cache_key=MzE2NzEyMjMxNTgxNzUwMzQ5OQ%3D%3D.2-ccb7-5&oh=00_AfBqeim216wJmZXaGsB_3tWSibyfIpM6GIvYSB-wylt8SA&oe=653C65E5&_nc_sid=b41fef",
    id: idGenerator(),
    title: "www.luehangs.site",
    // dimensions: { width: 1920, height: 1080 },
  },
  {
    uri: "https://scontent-sea1-1.cdninstagram.com/v/t39.30808-6/366838822_18387008020004087_3239111673862788308_n.jpg?stp=dst-jpg_e15_s720x720&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi44MDN4NTM3LnNkciJ9&_nc_ht=scontent-sea1-1.cdninstagram.com&_nc_cat=111&_nc_ohc=FMkEOgRJWLYAX9iu-3R&edm=ABmJApAAAAAA&ccb=7-5&ig_cache_key=MzE2NzEyMjMxNTgwMDQ4NzY3Nw%3D%3D.2-ccb7-5&oh=00_AfBqrEvTqUpsX3k3I0NzhtjiFqa6-feRMEhiOa-eHvp_zQ&oe=653D2576&_nc_sid=b41fef",
    id: idGenerator(),
    title: "www.luehangs.site",
    // dimensions: { width: 1920, height: 1080 },
  },
  {
    uri: "https://scontent-sea1-1.cdninstagram.com/v/t39.30808-6/366828211_18387008041004087_8985470695566905416_n.jpg?stp=dst-jpg_e35_s1080x1080_sh0.08&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMjA0eDgwNi5zZHIifQ&_nc_ht=scontent-sea1-1.cdninstagram.com&_nc_cat=111&_nc_ohc=ckH34uP6U6cAX99dDzx&edm=ABmJApAAAAAA&ccb=7-5&ig_cache_key=MzE2NzEyMjMxNjAyNzIxMjQzMA%3D%3D.2-ccb7-5&oh=00_AfCWCEVLn8ZMReheWiWhOKK1FYkEoh4DlzhHMRybYUbKDQ&oe=653C362A&_nc_sid=b41fef",
    id: idGenerator(),
    title: "www.luehangs.site",
    // dimensions: { width: 1920, height: 1080 },
  },
  {
    uri: "https://www.diabetes.co.uk/wp-content/uploads/2019/01/iceland.jpg",
    id: idGenerator(),
    title: "www.luehangs.site",
    // dimensions: { width: 1920, height: 1080 },
  },  
  {
    uri: "https://images.prismic.io/visiticeland/5a35d43d-b52e-46e9-aa16-027ebc17e160_Basalt%20formations%20in%20Hofs%C3%B3s%20town%20(3).jpg?ixlib=gatsbyFP&auto=compress%2Cformat&fit=max&rect=0%2C183%2C3543%2C1995&w=950&h=535",
    id: idGenerator(),
    title: "www.luehangs.site",
    // dimensions: { width: 1920, height: 1080 },
  },
  {
    uri: "https://rccl-h.assetsadobe.com/is/image/content/dam/royal/ports-and-destinations/destinations/iceland/stokksnes-iceland-lupine-flowers.jpg?$880x1428$",
    id: idGenerator(),
    title: "www.luehangs.site",
    // dimensions: { width: 1920, height: 1080 },
  },
  {
    uri: "https://www.travelandleisure.com/thmb/1ZNi1aFJlzZpGXf0vOqdmj_U5VE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/TAL-header-vik-reykjavik-iceland-summer-CRUISEICELAND0523-da5be9587e3a4cb1b5efa8ab0d8b6dc8.jpg",
    id: idGenerator(),
    title: "www.luehangs.site",
    // dimensions: { width: 1920, height: 1080 },
  },
  ];

  return (
    <View style={styles.container}>
      <CustomHeader
        title="Photos"
        rightIcon={null}
        onRightPress={() => {
          console.log('Right button pressed!');
        }}
      />
      <MasonryImageList images={images} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000"
},
});

export default PhotosScreen;