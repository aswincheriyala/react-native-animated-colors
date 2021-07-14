import React, {Component} from 'react';
import {View, Animated, StyleSheet} from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.animatedValue = [];
    const {colors,activeIndex} = props;
    colors &&
      colors.map((item, index) => {
        this.animatedValue.push(new Animated.Value(0));
      });
      colors && this.animatedValue[activeIndex].setValue(1); 
  }
  componentDidMount() {
    this.setLoop();
  }

  setLoop = () => {
    const {loop, duration, colors, activeIndex} = this.props;
    if (loop) {
      let i =  activeIndex+1;
      this.setInterval = setInterval(() => {
        this.animatedValue.map((item, index) => {
          if (i === index) {
            Animated.timing(item, {
              toValue: 1,
              duration,
              useNativeDriver: true,
            }).start();
          } else {
            Animated.timing(item, {
              toValue: 0,
              duration,
              useNativeDriver: true,
            }).start();
          }
        });
        i = i + 1;
        if (i === colors.length) {
          i = 0;
        }
      }, duration);
    } else {
      if (this.setInterval) {
        clearInterval(this.setInterval);
      }
    }
  };

  setActive = (index) => {
    const {duration} = this.props;
    this.animatedValue.map((item, i) => {
      if (index !== i) {
        Animated.timing(this.animatedValue[i], {
          toValue: 0,
          duration,
          useNativeDriver: true,
        }).start();
      } else {
        Animated.timing(this.animatedValue[index], {
          toValue: 1,
          duration,
          useNativeDriver: true,
        }).start();
      }
    });
  };
  componentDidUpdate(props) {
    const {activeIndex, loop} = this.props;
    if (props.activeIndex !== activeIndex) {
      this.setActive(activeIndex);
    }
    if (props.loop !== loop) {
      this.setLoop(loop);
    }
  }
  render() {
    const {colors, children, animatedStyle} = this.props;
    const props = this.props;
    return (
      <View {...props}>
        {colors.map((item, index) => {
          const opacity = this.animatedValue[index];
          return (
            <Animated.View
              style={[
                StyleSheet.absoluteFill,
                {backgroundColor: item, opacity},
                animatedStyle
              ]}
            />
          );
        })}
        {children}
      </View>
    );
  }
} 

App.defaultProps = {
  duration: 500,
  colors: [],
  activeIndex:0,
  loop: false,
};