import { images } from "@/constants";
import { CreditCardComponentProps } from "@/types";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Pressable,
  View,
  Image,
  StyleSheet,
  Text,
} from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const getGradientColors = (provider: string) => {
  switch (provider) {
    case "Verve":
      return ["#4c669f", "#3b5998", "#192f6a"];
    case "Mastercard":
      return ["#15803D", "#0C4A6E"];
    case "Visa":
      return ["#F87171", "#DC2626"];
    default:
      return ["#4c669f", "#3b5998", "#192f6a"];
  }
};

const RegularContent: React.FC<CreditCardComponentProps> = React.memo(
  ({ provider, cardNumber, cardName, expiryDate }) => {
    const gradientColors = getGradientColors(provider);

    return (
      <LinearGradient
        colors={gradientColors}
        className="min-h-[190px] max-h-[190px] w-[320px] relative rounded-2xl cursor-pointer mb-8"
      >
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
      </LinearGradient>
    );
  }
);

const FlippedContent: React.FC<CreditCardComponentProps> = React.memo(
  ({ provider, cvv }) => {
    const gradientColors = getGradientColors(provider);

    return (
      <LinearGradient
        colors={gradientColors}
        className="min-h-[190px] max-h-[190px] relative rounded-2xl cursor-pointer mb-8"
      >
        <View className="bg-[#161414] mt-3 p-4 w-full" />
        <View className="mt-6 items-center">
          <View className="bg-gray-300 w-72 p-1 rounded-2xl">
            <Text className="text-primary text-center">{cvv}</Text>
          </View>
        </View>

        <View className="mt-2 px-3 flex justify-end items-end">
          <Text className="w-[230px] text-left font-bold text-primary text-[7px] lg:text-[10px] tracking-tighter leading-tight">
            This virtual card is issued to you and valid for use in line with
            the agreement between the owner of this account and OurBank digital
            services. This card is valid for use at any online payment gateway
            and should only be used by the owner of this account in line OurBank
            terms and conditions.
          </Text>
        </View>
        <View className="p-6">
          <View className="flex-row justify-between items-center">
            <Image
              source={images.logo}
              className="w-20 h-6 opacity-80"
              resizeMode="contain"
            />
          </View>
        </View>
      </LinearGradient>
    );
  }
);

const FlipCard: React.FC<{
  isFlipped: Animated.SharedValue<boolean>;
  direction?: "x" | "y";
  duration?: number;
  RegularContent: React.ReactNode;
  FlippedContent: React.ReactNode;
}> = ({
  isFlipped,
  direction = "y",
  duration = 500,
  RegularContent,
  FlippedContent,
}) => {
  const isDirectionX = direction === "x";

  const regularCardAnimatedStyle = useAnimatedStyle(() => {
    const spinValue = interpolate(Number(isFlipped.value), [0, 1], [0, 180]);
    const rotateValue = withTiming(`${spinValue}deg`, { duration });

    return {
      transform: [
        isDirectionX ? { rotateX: rotateValue } : { rotateY: rotateValue },
      ],
    };
  });

  const flippedCardAnimatedStyle = useAnimatedStyle(() => {
    const spinValue = interpolate(Number(isFlipped.value), [0, 1], [180, 360]);
    const rotateValue = withTiming(`${spinValue}deg`, { duration });

    return {
      transform: [
        isDirectionX ? { rotateX: rotateValue } : { rotateY: rotateValue },
      ],
    };
  });

  return (
    <View>
      <Animated.View
        style={[flipCardStyles.regularCard, regularCardAnimatedStyle]}
      >
        {RegularContent}
      </Animated.View>
      <Animated.View
        style={[flipCardStyles.flippedCard, flippedCardAnimatedStyle]}
      >
        {FlippedContent}
      </Animated.View>
    </View>
  );
};

const flipCardStyles = StyleSheet.create({
  regularCard: {
    position: "relative",
    zIndex: 1,
  },
  flippedCard: {
    backfaceVisibility: "hidden",
    zIndex: 2,
  },
});

export const AnimatedCreditCard = ({
  id,
  cardName,
  cardNumber,
  expiryDate,
  provider,
  cvv,
}: CreditCardComponentProps) => {
  const isFlipped = useSharedValue(false);

  const handlePress = () => {
    isFlipped.value = !isFlipped.value;
  };

  return (
    <View className="flex-1 h-full">
      <Pressable onPress={handlePress}>
        <FlipCard
          isFlipped={isFlipped}
          FlippedContent={
            <FlippedContent
              id={id}
              cvv={cvv}
              provider={provider}
              expiryDate={""}
              cardName={""}
              cardNumber={""}
            />
          }
          RegularContent={
            <RegularContent
              provider={provider}
              cardName={cardName}
              cardNumber={cardNumber}
              expiryDate={expiryDate}
              cvv={""}
            />
          }
        />
      </Pressable>
    </View>
  );
};
