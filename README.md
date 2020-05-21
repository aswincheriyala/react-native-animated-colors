# react-native-animated-colors
 

<img src="https://firebasestorage.googleapis.com/v0/b/aswinc-90380.appspot.com/o/images%2Fezgif.com-resize.gif?alt=media" width="300" height="300" />

## Installation

```bash
	npm install --save react-native-animated-colors
```

##Usage

```javascript
	import AnimatedColorView from 'react-native-animated-colors';
```

## Properties

 name                        | description                            | type     | default
:--------------------------- |:-------------------------------------- | --------:|:------------
 colors                      | List of background colors              |  Array   |  [ ]
 activeIndex                 | Ripple opacity                         |  Number  |  0
 duration                    | Ripple size restriction                |  Number  |  500
 loop                        | Ripple container border radius         |  Boolean |  false

**colors**
>   Array of colors which need to be Animated.
eg: ['green', 'blue', 'red']

**activeIndex **
>  Pass the active index(of colors array) of color need to be displayed.
eg: **if activeIndex is 0, set activeIndex value as 1.** Then the background color will change from **green => blue**

**duration  **
>  Duration of the animation.

**loop  **
>  If true, will start looping the background color with the provided colors.


## Example

```javascript

	import React, {useState} from 'react';
	import {View, Text, StyleSheet, Button} from 'react-native';

	import AnimatedColorView from 'react-native-animated-colors';

	const Container = () => {
	  const [activeIndex, setindex] = useState(0);
	  return (
		<View style={styles.container}>

		  <AnimatedColorView
			activeIndex={activeIndex}
			colors={['green', 'blue', 'red']}
			duration={1000}
			loop={false}
			style={styles.item}>
			<Text style={styles.text}>ASWIN C</Text>
		  </AnimatedColorView>

		  <View style={styles.btn}>
			<Button title="green" onPress={() => setindex(0)} />
			<Button title="blue" onPress={() => setindex(1)} />
			<Button title="red" onPress={() => setindex(2)} />
		  </View>
		</View>
	  );
	};

	const styles = StyleSheet.create({
	  container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
	  item: {
		height: 200,
		width: 200,
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 50,
		borderRadius: 10,
	  },
	  text: {
		color: '#fff',
		fontSize: 20,
	  },
	  btn: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-evenly',
	  },
	});

export default Container;


```


## Copyright and License

ISC License

Copyright 2020-2021 Aswin C. All rights reserved.