/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import { AppColors, responsiveFontSize, responsiveHeight, responsiveWidth } from '../utils';

const CELL_COUNT = 4;

const FieldCode = ({ onCodeChange }: { onCodeChange?: (code: string) => void }) => {
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    const handleChange = (text: string) => {
        setValue(text);
        onCodeChange?.(text);
    };

    return (
        <View style={styles.container}>
            <CodeField
                ref={ref}
                {...props}
                value={value}
                onChangeText={handleChange}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({ index, symbol, isFocused }) => (
                    <View
                        key={index}
                        style={[
                            styles.cellRoot,
                            { backgroundColor: isFocused ? AppColors.WHITE : AppColors.LIGHTESTGRAY },
                            { borderWidth: isFocused ? 1 : 0 },
                            isFocused && styles.focusCell,
                        ]}
                        onLayout={getCellOnLayoutHandler(index)}>
                        <Text style={styles.cellText}>
                            {symbol || (isFocused ? <Cursor /> : null)}
                        </Text>
                    </View>
                )}
            />
        </View>
    );
};

export default FieldCode;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    codeFieldRoot: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: responsiveWidth(87),
    },
    cellRoot: {
        width: responsiveWidth(18),
        height: responsiveHeight(6),
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: AppColors.BLACK,
        borderRadius: 10,
    },
    cellText: {
        fontSize: responsiveFontSize(3),
        color: AppColors.BLACK,
        fontWeight: '500',
    },
    focusCell: {
        borderColor: AppColors.themeColor,
        borderRadius: 10,
        overflow: 'hidden'
    },
});
