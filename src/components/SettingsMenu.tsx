/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import AppText from './AppTextComps/AppText';
import { AppColors, responsiveHeight } from '../utils';

type Props = {
    title?: any;
    leftIcon?: any;
    rightIcon?: any;
    id?: any;
    profile?: any;
    cardOnPress?: any;
}

const SettingsMenu = ({ title, id, leftIcon, rightIcon, profile, cardOnPress }: Props) => {
    return (
        <TouchableOpacity style={{
            borderBottomWidth: id == 1 ? 0 : 1,
            borderBottomColor: AppColors.LIGHTGRAY,
            paddingVertical: id == 1 ? 0 : responsiveHeight(1.5),
            flexDirection: 'row',
            justifyContent: 'space-between',
        }} activeOpacity={profile ? 0 : 1} onPress={cardOnPress} >
            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                {leftIcon}
                <AppText
                    title={title}
                    textColor={id == 6 ? AppColors.DARK_RED : id == 1 ? 0 : AppColors.BLACK}
                    textSize={id == 1 ? 2 : 1.8}
                    textFontWeight={id == 1 ? true : false}
                />
            </View>
            {rightIcon}
        </TouchableOpacity>
    )
}

export default SettingsMenu