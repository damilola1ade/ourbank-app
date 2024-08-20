import { View, Text, Pressable } from "react-native";
import { Image } from "react-native";
import { images } from "@/constants";
import { LinearGradient } from "expo-linear-gradient";
import { CreditCardComponentProps } from "@/types";
import { getGradientColors } from "@/hooks/useCardGradientColors";

export const CreditCardComponent: React.FC<CreditCardComponentProps> = ({
  onPress,
  cardName,
  cardNumber,
  expiryDate,
  provider,
}) => {
  const gradientColors = getGradientColors(provider);

  return (
    <View className="items-center justify-center">
      <LinearGradient
        colors={gradientColors}
        className="min-h-[190px] max-h-[190px] w-[350px] relative rounded-2xl cursor-pointer"
      >
        <Pressable onPress={onPress}>
          <View className="p-6">
            <View className="flex-row justify-between items-center">
              <Image
                source={images.logo}
                className="w-20 h-6 opacity-80"
                resizeMode="contain"
              />
              {provider === "Verve" && (
                <Image
                  source={images.verve}
                  className="w-20 h-6"
                  resizeMode="contain"
                />
              )}
              {provider === "Mastercard" && (
                <Image
                  source={images.mastercard}
                  className="w-20 h-10"
                  resizeMode="contain"
                />
              )}
              {provider === "Visa" && (
                <Image
                  source={images.visa}
                  className="w-16 h-6"
                  resizeMode="contain"
                />
              )}
            </View>
            <Text className="text-white font-pbold text-xl mt-8">
              {cardNumber}
            </Text>
            <Text className="text-white text-[16px] mt-4 pr-4 text-right">
              {expiryDate}
            </Text>
            <Text className="text-white font-pregular text-[16px]">
              {cardName}
            </Text>
          </View>
        </Pressable>
      </LinearGradient>
    </View>
  );
};
