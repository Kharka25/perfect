import React from 'react';
import {ColorValue, TextProps, TextStyle, Text as Txt} from 'react-native';

import {Colors} from '@constants/colors';

interface Props {
  color?: ColorValue | string;
  fontFamily?: TextStyle['fontFamily'];
  fontSize?: TextStyle['fontSize'];
  fontWeight?: TextStyle['fontWeight'];
  numberOfLines?: TextProps['numberOfLines'];
  text: string | number | undefined;
}

const Text: React.FC<Props> = props => {
  const {
    color = Colors.BLACK,
    fontFamily,
    fontSize,
    fontWeight = '400',
    numberOfLines = 1,
    text,
  } = props;
  return (
    <Txt
      numberOfLines={numberOfLines}
      style={[{color, fontFamily, fontSize, fontWeight}]}>
      {text}
    </Txt>
  );
};

export default React.memo(Text);
