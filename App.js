import {Button, StyleSheet, Text, View, Image} from 'react-native';
import React, {useState} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const App = () => {
  const [imagen, setImagen] = useState('https://via.placeholder.com/200');

  const selectImage = () => {
    const options = {
      title: 'select an image',
      storageOptions: {skipBackup: true, path: 'images'},
    };

    launchImageLibrary(options, response => {
      if (response.errorCode) {
        console.log(response.errorMessage);
      } else if (response.didCancel) {
        console.log('the user canceled');
      } else {
        const path = response.assets[0].uri;
        setImagen(path);
      }
    });
  };

  const takePicture = () => {
    const options = {
      title: 'take a picture',
      storageOptions: {skipBackup: true, path: 'images'},
      includeBase64: true,
    };

    launchCamera(options, response => {
      if (response.errorCode) {
        console.log(response.errorMessage);
      } else if (response.didCancel) {
        console.log('the user canceled');
      } else {
        const path = response.assets[0].uri;
        setImagen(path);
      }
    });
  };
  return (
    <View style={styles.container}>
      <Button title="select picture" onPress={selectImage} />
      <Button title="take picture" onPress={takePicture} />
      <Image
        style={styles.img}
        source={{
          uri: imagen,
        }}
      />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  img: {
    width: 200,
    height: 200,
  },
});
