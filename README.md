# react-native-animated-colors
 
 This library is to Animate Background Color of a View with native feel.
 
*Note: Background color cannot be animated with **useNativeDriver : true***
*So, this will provide you the **backgroundColor transition super smoothly**.*


<img  src="https://firebasestorage.googleapis.com/v0/b/aswinc-90380.appspot.com/o/images%2Fezgif.com-resize.gif?alt=media"  width="300"  height="300" />


## Installation

```bash
npm i react-native-animated-colors
```

## Usage

```javascript
import AnimatedColorView from 'react-native-animated-colors';
```


## Properties

 name                        | description                            | type     | default
:--------------------------- |:-------------------------------------- | --------:|:------------
 colors                      | List of background colors              |  Array   |  [ ]
 activeIndex                 | Active index of color to be displayed  |  Number  |  0
 duration                    | Duration of animation on transition    |  Number  |  500
 loop                        | Loop the background colors             |  Boolean |  false
 startDelay                  | Loop start delay                       |  Number  |  0
 animatedStyle               | Animating view style                   |  Object  |  {}
 style                       | Container view style                   |  Object  |  {}

**colors**
>   Array of colors which need to be Animated.

>eg: ['green', 'blue', 'red']

**activeIndex**
>  Pass the active index(of colors array) of color need to be displayed.

>eg: **if activeIndex is 0, set activeIndex value as 1.** Then the background color will change from **green => blue**

**duration**
>  Duration of the animation.

**loop**
>  If true, will start looping the background color with the provided colors.

**startDelay**
>  If set, will start looping after the delay.

<br />

## Example

<img  src="https://firebasestorage.googleapis.com/v0/b/aswinc-90380.appspot.com/o/images%2Fanim.gif?alt=media"  width="300"  height="400" />

```javascript
import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import AnimatedColorView from 'react-native-animated-colors';

const TestAnimation = () => {
  const [activeIndex, setindex] = useState(0);
  const [loop, setLoop] = useState(false);
  return (
    <View style={styles.container}>
      <AnimatedColorView
        activeIndex={activeIndex}
        colors={['green', 'blue', 'red']}
        loop={loop}
        style={styles.containerStyle}
        animatedStyle={styles.animatedStyle}
        duration={500}
        // Supports all View Props
        onTouchStart={() => console.log('pressed')}
      >
        <Text style={styles.text}>ASWIN C</Text>
      </AnimatedColorView>

      {!loop && <View style={styles.btn}>
        <Button title="green" onPress={() => setindex(0)} />
        <Button title="blue" onPress={() => setindex(1)} />
        <Button title="red" onPress={() => setindex(2)} />
      </View>}
      <Button title={`loop (${loop})`} onPress={() => setLoop(val => !val)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerStyle: {
    height: 200,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: 'pink',
    marginBottom: 50,
  },
  animatedStyle: {
    borderWidth: 5,
    borderColor: 'grey',
    borderRadius: 100
  },
  text: {
    fontSize: 20,
  },
  btn: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 20
  },
});

export default TestAnimation;
```

<br />

## Skelton Loader Example

<img  src="https://firebasestorage.googleapis.com/v0/b/aswinc-90380.appspot.com/o/images%2Floadanim.gif?alt=media"  width="300"  height="400" />

```javascript
import React from 'react';
import { View, StyleSheet } from 'react-native';
import AnimatedColorView from 'react-native-animated-colors';

export default function SkeltonLoader() {
  return (
    <View style={styles.container}>
      {[1, 2, 3, 4, 5].map((x, i) => (
        <AnimatedColorView
          key={x.toString()}
          style={styles.row}
          colors={['lightgrey', 'transparent']}
          loop={true}
          startDelay={i * 100}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  row: {
    height: 60,
    marginBottom: 10,
  },
});
```

<br />

## Copyright and License

ISC License

Copyright Aswin C. All rights reserved.
