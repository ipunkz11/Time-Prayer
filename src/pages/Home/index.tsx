import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { RootStackParamList } from '../../route'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import axios from 'axios'
import Loading from '../../components/Loading'

interface JadwalSholat {
  ashar: string;
  date: string;
  dhuha: string;
  dzuhur: string;
  imsak: string;
  isya: string;
  maghrib: string;
  subuh: string;
  tanggal: string;
  terbit: string;
}

interface DataSholat {
  daerah: string;
  id: number;
  jadwal: JadwalSholat;
  lokasi: string;
}

const Home: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [data, setData] = useState<DataSholat>();
  const [city, setCity] = useState<DataSholat[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hours, setHours] = useState<string>('');

  // useEffect(() => {
  //   getAllCity()
  // }, [])

  useEffect(() => {
    getAllCity()

    const interval = setInterval(() => {
      setHours(new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const valueId = (id: number) => {
    setLoading(true);
    try {
      axios.get(`https://api.myquran.com/v1/sholat/jadwal/${id}/2023/11/03`)
        .then(res => {
          setLoading(false);
          setData(res.data.data)
        })
    } catch (error) {
      console.log(error)
    }
  }

  const getAllCity = () => {
    setLoading(true);
    try {
      axios.get('https://api.myquran.com/v1/sholat/kota/semua')
        .then(res => {
          setCity(res.data)
          setLoading(false);
        })
    } catch (error) {
      console.log("Error", error)
    }
  }

  const dayNames = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  function getTodayDate() {
    const today = new Date();
    const day = today.getDay();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    return `${dayNames[day]}, ${month}/${day}/${year}`;
  }

  return (
    <>
      <View style={{ height: '45%' }}>
        <ImageBackground source={require('../../assets/mosque.jpg')} style={{ height: '100%', paddingTop: 50 }}>
          <View style={{ justifyContent: 'center', alignItems: 'center', marginHorizontal: 20, marginBottom: 10 }}>
            {data?.lokasi ?
              <>
                <Text style={styles.textFont}>{data?.lokasi}</Text>
                <Text style={{ fontSize: 50, color: '#0802A3' }}>{hours}</Text>
              </> :
              <>
                <Text style={{ fontSize: 50 }}>{hours}</Text>
                <Text style={{ fontSize: 12 }}>{getTodayDate()}</Text>
              </>
            }
          </View>

          <View
            style={{ marginHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.textFont}>Isya</Text>
              <Text style={styles.textTime}>{data?.jadwal?.isya ? data?.jadwal?.isya : '--:--'}</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.textFont}>Subuh</Text>
              <Text style={styles.textTime}>{data?.jadwal?.subuh ? data?.jadwal?.subuh : '--:--'}</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.textFont}>Dhuha</Text>
              <Text style={styles.textTime}>{data?.jadwal?.dhuha ? data?.jadwal?.dhuha : '--:--'}</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.textFont}>Dzuhur</Text>
              <Text style={styles.textTime}>{data?.jadwal?.dzuhur ? data?.jadwal?.dzuhur : '--:--'}</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.textFont}>Ashar</Text>
              <Text style={styles.textTime}>{data?.jadwal?.ashar ? data?.jadwal?.ashar : '--:--'}</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.textFont}>Maghrib</Text>
              <Text style={styles.textTime}>{data?.jadwal?.maghrib ? data?.jadwal?.maghrib : '--:--'}</Text>
            </View>
          </View>
        </ImageBackground>

        <View style={{ borderWidth: 0.2, borderRadius: 8, borderColor: '#ECEE81', backgroundColor: 'rgba(0, 0, 0, 0.1)', borderStyle: 'dotted', justifyContent: 'center', alignItems: 'center', marginHorizontal: 20, paddingVertical: 20, marginTop: -80 }}>
          {data?.lokasi ?
            <>
              <Text style={{ fontSize: 16, color: '#0802A3' }}>{getTodayDate()}</Text>
              {/* <Text style={{ fontSize: 12, color: '#0802A3' }}>{hours}</Text> */}
            </> :
            <Text style={{ fontSize: 16 }}>Selamat Datang</Text>
          }
        </View>
      </View>

      <View style={{ height: '60%' }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {city.length > 0 && city.map((v, i) => {
            return (
              <TouchableOpacity onPress={() => valueId(v.id)}>
                <View key={i} style={styles.wrapScroll}>
                  {/* <Text>{v?.id}</Text> */}
                  <Text>{v?.lokasi}</Text>
                </View>
              </TouchableOpacity>
            )
          })}
        </ScrollView>
      </View>

      {loading && <Loading />}
    </>
  )
}

export default Home

const styles = StyleSheet.create({
  wrapJadwal: {
    borderWidth: 0.5,
    borderColor: 'aqua',
    padding: 10,
    borderRadius: 8,
    height: 100,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'pink'
  },
  wrapScroll: {
    padding: 10,
    marginHorizontal: 20,
    borderBottomColor: '#8DDFCB',
    borderBottomWidth: 2,
    borderRadius: 8,
    marginBottom: 10,
  },
  textFont: {
    color: 'black',
    fontSize: 16
  },
  textTime:{
    color: '#0802A3',
    fontSize: 16
  }
})