import React, {Component} from 'react';
import {View, Animated, StyleSheet} from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.animatedValue = [];
    const {colors} = props;
    colors &&
      colors.map((item, index) => {
        this.animatedValue.push(new Animated.Value(0));
      });
    this.animatedValue[0].setValue(1);
  }
  componentDidMount() {
    this.setLoop();
  }

  setLoop = () => {
    const {loop, duration, colors} = this.props;
    if (loop) {
      let i = 1;
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
    const {colors, children} = this.props;
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
              ]}
            />
          );
        })}
        {children}
      </View>
    );
  }
} 