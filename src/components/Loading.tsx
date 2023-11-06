import React from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'

type Props = {}

const Loading = (props: Props) => {
  return (
    <View style={{position: 'absolute', height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.8)', top: 40 }}>
      <ActivityIndicator size="large" color="aqua" />
    </View>
  )
}

export default Loading

const styles = StyleSheet.create({})