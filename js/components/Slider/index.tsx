import React from 'react';
import VerticalSlider from 'rn-vertical-slider'; // TODO: custom slider component

import {COLORS} from '../../consts/colors';

type SliderProps = {
  onChange: (value: number) => void;
};

const Slider = ({onChange}: SliderProps) => {
  return (
    <VerticalSlider
      value={1}
      min={0}
      max={1}
      onChange={onChange}
      width={50}
      height={250}
      step={0.05}
      borderRadius={5}
      minimumTrackTintColor={COLORS.accent}
      maximumTrackTintColor={COLORS.lighterBackground}
    />
  );
};

export default Slider;
