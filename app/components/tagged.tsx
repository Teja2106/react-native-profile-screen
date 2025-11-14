import { Image, View, ScrollView } from "react-native";

export default function Tagged() {
    const images = [
        require('../../assets/images/tag1.jpg'),
        require('../../assets/images/tag2.jpg'),
        require('../../assets/images/tag3.jpg'),
    ]
    return (
        <>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 155 }}>
                <View className="flex flex-row flex-wrap justify-between p-2">
                    {
                        images.map((img, index) => (
                            <View key={index} className="w-[48%] aspect-square rounded-lg mb-4 overflow-hidden">
                                <Image source={img} className="w-full h-full rounded-lg" />
                            </View>
                        ))
                    }
                </View>
            </ScrollView>
        </>
    )
}