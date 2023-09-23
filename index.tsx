import React, { Component } from 'react';
import { Animated, StyleSheet, View, ViewStyle } from 'react-native';

export default class AnimatedColorView extends Component<AnimatedColorViewProps> {
  static defaultProps: Partial<AnimatedColorViewProps> = {
    duration: 500,
    colors: [],
    activeIndex: 0,
    loop: false,
    animatedStyle: {},
    style: {},
  };

  animatedValue: Animated.Value[] = [];
  setInterval: any = null;
  constructor(props: any) {
    super(props);
    const { colors, activeIndex } = props;
    if (colors.length) {
      colors.map((_item: string) => {
        this.animatedValue.push(new Animated.Value(0));
      });
      this.animatedValue[activeIndex].setValue(1);
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

  setLoop = () => {
    const { loop, duration, colors, activeIndex } = this.props;
    if (loop) {
      let i = activeIndex === colors.length - 1 ? 0 : activeIndex + 1;
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
      this.clearLoop();
    }
  };

  setActive = (index: number) => {
    const { duration } = this.props;
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

  componentDidUpdate(props: any) {
    const { activeIndex, loop } = this.props;
    if (props.activeIndex !== activeIndex) {
      this.setActive(activeIndex);
    }
    if (props.loop !== loop) {
      this.setLoop();
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
          const opacity = this.animatedValue[index];
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
}
