import { Image, ScrollView, View } from "react-native";

export default function Posts() {
    const images = [
        require('../../assets/images/image1.jpg'),
        require('../../assets/images/image2.jpg'),
        require('../../assets/images/image3.jpg'),
        require('../../assets/images/image4.jpg'),
        require('../../assets/images/image5.jpg'),
        require('../../assets/images/image6.jpg'),
        require('../../assets/images/image7.jpg'),
        require('../../assets/images/image8.jpg'),
        require('../../assets/images/image9.jpg'),
    ];

    return (
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
    )
}