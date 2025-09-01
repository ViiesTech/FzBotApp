/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { View } from 'react-native'
import { AppColors } from '../utils'
import AppText from './AppTextComps/AppText'
import LineBreak from './LineBreak';

const AuthHeader = ({ heading, subHeading, rightIcon }: { heading: string, subHeading: string, rightIcon?: any }) => {
    return (
        <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <AppText
                    title={heading}
                    textColor={AppColors.BLACK}
                    textSize={2.5}
                    textFontWeight
                />
                {rightIcon}
            </View>
            <LineBreak space={0.5} />
            <AppText
                title={subHeading}
                textColor={AppColors.DARKGRAY}
                textSize={1.6}
            />
        </View>
    );
};

export default AuthHeader;