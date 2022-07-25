import React from 'react';

import Svg, {Path} from 'react-native-svg';
import {wp, hp} from '../../../utils/CommonMethods';

const TAB_HEIGHT = 90;
const tabBarHeight = hp(30);
const middleIconSize = 70;
const midRadius = 25;
const midBoundary = 70;

// const {width} = Dimensions.get('window');
const width = wp(99);

export default function TabShape() {
  return (
    // <Svg
    //   viewBox={`0 0 ${width} ${tabBarHeight}`}
    //   height={tabBarHeight}
    //   width={width}>
    //   <Path d={path} fill="green" />
    //   <Path d={linePath} fill="transparent" strokeWidth={1} stroke="#ccc" />
    // </Svg>
    <Svg
      style={{bottom: 10}}
      width={width}
      height={tabBarHeight}
      viewBox="0 0 416 128">
      <Path
        id="Subtraction_1-2"
        data-name="Subtraction 1"
        d="M360,128H38a38,38,0,1,1,0-76H154.541a45.008,45.008,0,0,0,88.918,0H360a38,38,0,1,1,0,76Z"
        transform="translate(9 -12)"
        fill="#2f5351"
      />
    </Svg>

    // <Svg
    //   version="1.1"
    //   id="bottom-bar"
    //   x="30px"
    //   y="0px"
    //   width={wp(90)}
    //   height="100"
    //   viewBox="0 0 1092 260"
    //   space="preserve">
    //   <Path
    //     fill={'#373A50'}
    //     stroke={'#373A50'}
    //     d={`M30,60h${state.pathX}.3c17.2,0,31,14.4,30,11.6c-0.2,2.7-0.3,5.5-0.3,8.2c0,71.2,58.1,129.6,129.4,130c72.1,0.3,130.6-58,130.6-130c0-2.7-0.1-5.4-0.2-8.1C${state.pathY}.7,74.5,${state.pathA}.5,60,${state.pathB}.7,60H1062c16.6,0,30,13.4,30,30v94c0,42-34,76-76,76H76c-42,0-76-34-76-76V90C0,73.4,13.4,60,30,60z`}
    //   />
    //   {/* <Circle fill={'#7EE6D2'} stroke={'#7EE6D2'} cx="546" cy="100" r="100" /> */}
    // </Svg>
  );
}
