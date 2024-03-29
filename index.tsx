import React, { Component } from 'react';
import { Animated, Easing, EasingFunction, StyleSheet, View, ViewStyle } from 'react-native';

export default class AnimatedColorView extends Component<AnimatedColorViewProps> {
  static defaultProps: Partial<AnimatedColorViewProps> = {
    duration: 500,
    colors: [],
    activeIndex: 0,
    loop: false,
    animatedStyle: {},
    style: {},
    startDelay: 0,
    easing: Easing.linear
  };

  animatedValues: Animated.Value[] = [];
  setInterval: any = null;
  constructor(props: any) {
    super(props);
    const { colors, activeIndex } = props;
    if (colors.length) {
      colors.map((_item: string) => {
        this.animatedValues.push(new Animated.Value(0));
      });
      this.animatedValues[activeIndex].setValue(1);
    }
  }

  componentDidMount() {
    this.clearLoop();
    this.setLoop();
  }

  componentWillUnmount() {
    this.clearLoop();
  }

  clearLoop = () => {
    if (this.setInterval) clearInterval(this.setInterval);
  };

  setLoop = async () => {
    const { loop, duration, colors, activeIndex, startDelay, easing } = this.props;
    this.clearLoop();
    if (loop) {
      if(startDelay > 0) await new Promise(resolve => setTimeout(resolve, startDelay));
      let i = activeIndex === colors.length - 1 ? 0 : activeIndex + 1;
      this.setInterval = setInterval(() => {
        this.animatedValues.map((item, index) => {
          if (i === index) {
            Animated.timing(item, {
              toValue: 1,
              duration,
              useNativeDriver: true,
              easing: easing
            }).start();
          } else {
            Animated.timing(item, {
              toValue: 0,
              duration,
              useNativeDriver: true,
              easing: easing
            }).start();
          }
        });
        i = i + 1;
        if (i === colors.length) {
          i = 0;
        }
      }, duration);
    }
  };

  setActive = async (index: number) => {
    const { duration, easing, startDelay } = this.props;
    if(startDelay > 0) await new Promise(resolve => setTimeout(resolve, startDelay));
    this.animatedValues.map((item, i) => {
      if (index !== i) {
        Animated.timing(this.animatedValues[i], {
          toValue: 0,
          duration,
          useNativeDriver: true,
          easing: easing
        }).start();
      } else {
        Animated.timing(this.animatedValues[index], {
          toValue: 1,
          duration,
          useNativeDriver: true,
          easing: easing
        }).start();
      }
    });
  };

  componentDidUpdate(props: any) {
    const { activeIndex, loop } = this.props;
    if (props.loop !== loop) {
      this.setLoop();
    }
    if (props.activeIndex !== activeIndex) {
      this.setActive(activeIndex);
    }
  }

  render() {
    const { colors, children, animatedStyle = {} } = this.props;
    const props = this.props;
    const finalAnimatedStyle = { ...animatedStyle };
    delete finalAnimatedStyle.opacity;
    delete finalAnimatedStyle.position;
    delete finalAnimatedStyle.height;
    delete finalAnimatedStyle.width;
    return (
      <View {...props}>
        {colors.map((item, index) => {
          const opacity = this.animatedValues[index];
          return (
            <Animated.View
              key={`animated-view-${index}`}
              style={[
                StyleSheet.absoluteFill,
                { backgroundColor: item, opacity },
                finalAnimatedStyle,
              ]}
            />
          );
        })}
        {children}
      </View>
    );
  }
}

interface AnimatedColorViewProps {
  duration: number;
  colors: string[];
  activeIndex: number;
  loop: boolean;
  animatedStyle: ViewStyle;
  style: ViewStyle;
  children: any;
  startDelay: number;
  easing: EasingFunction
}
