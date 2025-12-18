/* eslint-disable react-native/no-inline-styles */
import { View } from 'react-native'
import React from 'react'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import { responsiveHeight, responsiveWidth } from '../../utils'

const HomeLoader = () => {
  return (
    <SkeletonPlaceholder borderRadius={8}>
      <View
        style={{
          borderWidth: 1,
          borderColor: '#e0e0e0',
          paddingHorizontal: responsiveWidth(2),
          paddingVertical: responsiveHeight(1),
          borderRadius: 8,
          width: responsiveWidth(45),
          gap: responsiveHeight(1),
        }}
      >
        <View
          style={{
            width: responsiveWidth(40),
            height: responsiveHeight(10),
            borderRadius: 8,
          }}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View style={{ width: responsiveWidth(20), height: 15 }} />
          <View
            style={{
              width: responsiveWidth(12),
              height: 15,
              borderRadius: 4,
            }}
          />
        </View>

        {/* Price */}
        <View style={{ width: responsiveWidth(20), height: 15 }} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View style={{ width: responsiveWidth(25), height: 12 }} />
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <View style={{ width: 15, height: 15, borderRadius: 8 }} />
            <View style={{ width: 15, height: 15, borderRadius: 8 }} />
          </View>
        </View>
      </View>
    </SkeletonPlaceholder>
  )
}

const FetchProductLoader = () => {
  return (
    <SkeletonPlaceholder>
      <SkeletonPlaceholder.Item >
        <SkeletonPlaceholder.Item
          width={responsiveWidth(90)}
          height={responsiveHeight(20)}
          borderRadius={10}
          marginBottom={20}
        />
        <SkeletonPlaceholder.Item
          width={responsiveWidth(80)}
          height={20}
          borderRadius={6}
          marginBottom={10}
        />
        <SkeletonPlaceholder.Item
          width={responsiveWidth(90)}
          height={responsiveHeight(6)}
          borderRadius={10}
          marginBottom={20}
        />
        <SkeletonPlaceholder.Item
          width={responsiveWidth(80)}
          height={20}
          borderRadius={6}
          marginBottom={10}
        />
        <SkeletonPlaceholder.Item
          width={responsiveWidth(90)}
          height={responsiveHeight(6)}
          borderRadius={10}
          marginBottom={20}
        />
        <SkeletonPlaceholder.Item
          width={responsiveWidth(80)}
          height={20}
          borderRadius={6}
          marginBottom={10}
        />
        <SkeletonPlaceholder.Item
          width={responsiveWidth(90)}
          height={responsiveHeight(20)}
          borderRadius={10}
          marginBottom={20}
        />
        <SkeletonPlaceholder.Item
          width={responsiveWidth(80)}
          height={20}
          borderRadius={6}
          marginBottom={10}
        />
        <SkeletonPlaceholder.Item
          width={responsiveWidth(90)}
          height={responsiveHeight(6)}
          borderRadius={10}
          marginBottom={30}
        />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  )
}

const NotificationLoader = () => {
  return (
    <SkeletonPlaceholder borderRadius={8}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: responsiveHeight(3),
        }}
      >
        <View
          style={{
            width: responsiveHeight(5),
            height: responsiveHeight(5),
            borderRadius: responsiveHeight(2.5),
          }}
        />
        <View
          style={{
            flex: 1,
            marginLeft: responsiveWidth(3),
            marginTop: responsiveHeight(0.5),
            justifyContent: 'center',
          }}
        >
          <View
            style={{
              width: responsiveWidth(40),
              height: responsiveHeight(1.4),
              borderRadius: 4,
              marginBottom: responsiveHeight(0.8),
            }}
          />
          <View
            style={{
              width: responsiveWidth(55),
              height: responsiveHeight(1.2),
              borderRadius: 4,
            }}
          />

        </View>

        <View style={{ gap: responsiveHeight(0.5) }}>
          <View
            style={{
              width: responsiveWidth(10),
              height: responsiveHeight(1.2),
              borderRadius: 4,
              marginRight: responsiveWidth(2),
            }}
          />
          <View
            style={{
              width: responsiveWidth(13),
              height: responsiveHeight(3),
              borderRadius: 5,
            }}
          />
        </View>
      </View>
    </SkeletonPlaceholder>
  )

}
export { HomeLoader, FetchProductLoader,NotificationLoader }