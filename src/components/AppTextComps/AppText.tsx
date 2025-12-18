/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Text } from 'react-native';
import { AppColors } from '../../utils/index';
import {
    responsiveFontSize,
    responsiveHeight,
    responsiveWidth,
} from '../../utils/index';

type textProps = {
    title?: any;
    textSize?: any;
    textColor?: any;
    textFontWeight?: boolean;
    textAlignment?: any;
    textwidth?: any;
    lineHeight?: any;
    numberOfLines?: any;
    borderBottomColor?: any;
    borderBottomWidth?: any;
    paddingBottom?: any;
    onPress?: () => void;
    textTransform?: any;
    children?: React.ReactNode;
    textDecorationLine?: any;
    paddingHorizontal?: any;
};

const AppText = ({
    title,
    textSize,
    textColor,
    textFontWeight,
    textAlignment,
    textwidth,
    lineHeight,
    numberOfLines,
    borderBottomColor,
    borderBottomWidth,
    paddingBottom,
    textTransform,
    children,
    textDecorationLine,
    paddingHorizontal,
    onPress,
}: textProps) => {
    return (
        <Text
            onPress={onPress}
            numberOfLines={numberOfLines}
            style={{
                width: textwidth ? responsiveWidth(textwidth) : null,
                fontSize: textSize
                    ? responsiveFontSize(textSize)
                    : responsiveFontSize(1.4),
                fontWeight: textFontWeight ? textFontWeight : 'regular',
                color: textColor ? textColor : AppColors.BLACK,
                textAlign: textAlignment ? textAlignment : null,
                alignSelf: textAlignment ? textAlignment : null,
                lineHeight: lineHeight ? responsiveHeight(lineHeight) : null,
                borderBottomWidth: borderBottomWidth ? borderBottomWidth : null,
                borderBottomColor: borderBottomColor ? borderBottomColor : null,
                textTransform: textTransform ? textTransform : null,
                paddingBottom: paddingBottom ? responsiveHeight(paddingBottom) : null,
                textDecorationLine: textDecorationLine,
                paddingHorizontal: responsiveWidth(paddingHorizontal),
            }}>
            {title}
            {children}
        </Text>
    );
};

export default AppText;
