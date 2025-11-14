import { Animated, Pressable, Text, useWindowDimensions, View } from "react-native";
import SettingSvg from '../assets/svg/setting-svgrepo-com.svg';
import QrCode from '../assets/svg/qr-code-svgrepo-com.svg';
import { useRef, useState } from "react";
import Posts from "./components/posts";
import PagerView from 'react-native-pager-view';
import Tagged from "./components/tagged";

export default function Index() {
  const tabs = ["Posts", "Clips", "Tagged"];

  const [activeTab, setActiveTab] = useState(0);

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const underlineAnim = useRef(new Animated.Value(0)).current;
  const scrollX = useRef(new Animated.Value(0)).current;
  const { width } = useWindowDimensions();
  const tabWidth = width / tabs.length;
  const pagerRef = useRef<PagerView>(null);

  const getTextColor = (index: number) => {
    const inputRange = [index - 1, index, index + 1];
    return scrollX.interpolate({
      inputRange,
      outputRange: ['#000000', '#06b6d4', '#000000'],
      extrapolate: 'clamp'
    })
  }

  const handleTabPress = (index: number) => {
    pagerRef.current?.setPage(index);
    setActiveTab(index);

    Animated.spring(underlineAnim, {
      toValue: index * tabWidth,
      useNativeDriver: true,
      friction: 6,
      tension: 50,
    }).start();

    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 0, duration: 150, useNativeDriver: true }),
      Animated.timing(fadeAnim, { toValue: 1, duration: 150, useNativeDriver: true })
    ]).start();
  }

  const onPageScroll = (e: any) => {
    const { position, offset } = e.nativeEvent;
    const newX = (position + offset) * tabWidth;
    underlineAnim.setValue(newX);
    scrollX.setValue(position + offset);
  }

  const handlePageSelected = (e: any) => {
    const index = e.nativeEvent.position;
    setActiveTab(index);
  }
  return (
    <>
      <View className="flex flex-row justify-between mt-24 items-center">
        <Text className="font-bold text-xl ml-5">Jay Alexander</Text>

        <View className="mr-10 flex flex-row">
          <View className="mr-2">
            <SettingSvg width={24} height={24} />
          </View>
          <View className="ml-4">
            <QrCode width={28} height={28} />
          </View>
        </View>
      </View>

      <View className="flex flex-row justify-around mt-6 border-b-slate-900 border-b-hairline">
        {
          tabs.map((tab, index) => (
            <Pressable key={tab} onPress={() => handleTabPress(index)} className={`pl-12 pr-12 pb-3`}>
              <Animated.Text style={{ color: getTextColor(index) }} className={`text-base font-semibold ${activeTab === index ? "text-cyan-500" : "text-black"}`}>{tab}</Animated.Text>
            </Pressable>
          ))
        }
        <Animated.View style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: tabWidth,
          height: 4,
          backgroundColor: "#06b6d4",
          transform: [{ translateX: underlineAnim }]
        }} />
      </View>


      <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
        <PagerView ref={pagerRef} style={{ flex: 1 }} initialPage={0} onPageSelected={handlePageSelected} onPageScroll={onPageScroll}>
          <View key={'1'}>
            <Posts />
          </View>
          <View key={'2'} className="flex items-center justify-center mt-5">
            <Text className="text-lg">Clips Section</Text>
          </View>
          <View key={'3'} className="flex items-center justify-center mt-5">
            {/* <Text className="text-lg">Tagged Section</Text> */}
            <Tagged />
          </View>
        </PagerView>
      </Animated.View>
    </>
  );
}
