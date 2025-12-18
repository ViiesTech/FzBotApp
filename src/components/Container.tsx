import React, { ReactNode } from 'react'
import { Image, ScrollView, StyleSheet } from 'react-native'
import { AppColors } from '../utils/index'
import { responsiveHeight } from '../utils'
import { SafeAreaView } from 'react-native-safe-area-context'

type props = {
    children: ReactNode,
    scrollEnabled?: boolean,
    image?: boolean,
    showScrollBar?: boolean,
    paddingBottom?: number
}

const Container = ({ children, scrollEnabled, image, showScrollBar, paddingBottom }: props) => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: AppColors.WHITE }}>
            <ScrollView contentContainerStyle={{ paddingBottom: responsiveHeight(paddingBottom) }} showsVerticalScrollIndicator={showScrollBar} scrollEnabled={scrollEnabled} style={styles.container}>
                {image &&
                    <Image source={image} style={styles.imageStyle} />
                }
                {children}
            </ScrollView>
        </SafeAreaView>
    )
}

export default Container

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: AppColors.WHITE,
    },
    imageStyle: {
        height: responsiveHeight(40),
        alignSelf: 'center',
        resizeMode: 'contain',
        marginTop: responsiveHeight(3),
        width: responsiveHeight(40)
    }
})