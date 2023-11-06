import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { RootStackParamList } from '../../route'

type Props = {}

const Detail = (props: Props) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      <Text>Detail</Text>
    </TouchableOpacity>
  )
}

export default Detail

const styles = StyleSheet.create({})