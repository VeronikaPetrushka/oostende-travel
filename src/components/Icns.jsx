import React from 'react';
import { Image, StyleSheet } from 'react-native';

const Icns = ({ type, active, light }) => {

  let imageSource;
  let iconStyle = [styles.icon];

  switch (type) {
    case '1':
      imageSource = require('../assets/panel/1.png');
      if (active) iconStyle.push(styles.active);
      break;
    case '2':
      imageSource = require('../assets/panel/2.png');
      if (active) iconStyle.push(styles.active);
      break;
    case '3':
      imageSource = require('../assets/panel/3.png');
      if (active) iconStyle.push(styles.active);
      break;
    case '4':
      imageSource = require('../assets/panel/4.png');
      if (active) iconStyle.push(styles.active);
      break;
    case 'fav':
      imageSource = require('../assets/icons/fav.png');
      break;
    case 'fav-not':
      imageSource = require('../assets/icons/fav-not.png');
      break;
    case 'fav-saved':
      imageSource = require('../assets/icons/fav-saved.png');
      if (light) iconStyle.push(styles.light);
      break;
    case 'back':
      imageSource = require('../assets/icons/back.png');
      if (light) iconStyle.push(styles.light);
      break;
    case 'pin':
      imageSource = require('../assets/icons/pin.png');
      break;
    case 'calendar':
      imageSource = require('../assets/icons/calendar.png');
      break;
    case 'plus':
      imageSource = require('../assets/icons/plus.png');
      break;
    case 'cross':
      imageSource = require('../assets/icons/cross.png');
      break;
    case 'minus':
      imageSource = require('../assets/icons/minus.png');
      break;
    case 'add':
      imageSource = require('../assets/icons/add.png');
      break;
    case 'time':
      imageSource = require('../assets/icons/time.png');
      break;
    case 'more':
      imageSource = require('../assets/icons/more.png');
      break;
    case 'less':
      imageSource = require('../assets/icons/less.png');
      break;
    case 'dots':
      imageSource = require('../assets/icons/dots.png');
      break;
    case 'success':
      imageSource = require('../assets/icons/success.png');
      break;
    case 'locked':
      imageSource = require('../assets/icons/locked.png');
      break;
    case 'policy':
      imageSource = require('../assets/icons/policy.png');
      break;
    case 'rate':
      imageSource = require('../assets/icons/rate.png');
      break;
  }

  return (
    <Image 
      source={imageSource} 
      style={iconStyle} 
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  active: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    tintColor: '#000',
  },
  light: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    tintColor: '#ffcc02',
  }
});

export default Icns;
