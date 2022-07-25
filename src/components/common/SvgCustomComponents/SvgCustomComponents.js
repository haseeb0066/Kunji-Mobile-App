import React from 'react';
import {SvgXml} from 'react-native-svg';
export default function SvgComponent({svgMarkup}) {
  const SvgImage = () => <SvgXml xml={svgMarkup} />;

  return <SvgImage />;
}
