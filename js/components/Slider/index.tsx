import React from 'react';
import VerticalSlider from 'rn-vertical-slider'; // TODO: custom slider component

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
      minimumTrackTintColor={'rgb(21, 126, 251)'}
      maximumTrackTintColor={'rgb(217, 217, 217)'}
    />
  );
};

export default Slider;
