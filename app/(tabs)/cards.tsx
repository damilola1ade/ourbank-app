import {
  View,
  Text,
  Image,
  FlatList,
} from "react-native";

import {
  AppSafeAreaView,
  AppButton,
  CreditCardComponent,
  Loader,
} from "@/components";
import { images } from "@/constants";
import { router } from "expo-router";
import { useGetAllCardsQuery } from "@/store/cards";
import React from "react";

const Cards = () => {
  const { data, isLoading, refetch } = useGetAllCardsQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  const cardsCount = data?.cards?.length || 0;

  if (isLoading) {
    return <Loader />;
  }

  return (
    <AppSafeAreaView>
      <View className="mt-5 px-4">
        <Text className="text-white text-3xl font-pbold">Cards</Text>
        <View className="mt-10">
          <FlatList
            data={data?.cards}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <CreditCardComponent
                onPress={() =>
                  router.push({
                    pathname: "/(pages)/card/[id]",
                    params: { id: item.id },
                  })
                }
                provider={item.provider}
                cardNumber={"**** **** **** ****"}
                cardName={item.cardName}
                expiryDate={""}
                cvv={""}
              />
            )}
            ItemSeparatorComponent={() => <View style={{ height: 25 }} />}
            ListEmptyComponent={() => (
              <View className="px-6 justify-center items-center">
                <Image
                  source={images.create}
                  resizeMode="contain"
                  className="mt-8 absolute -top-0 -left-24 w-[800px] h-[150px]"
                />

                <Text className="mt-64 text-xl text-white font-psemibold">
                  Create a virtual card
                </Text>

                <Text className="mt-6 text-gray-100 text-xl font-pmedium text-center tracking-tighter">
                  Instantly create a virtual card to make managing online
                  payments easy.
                </Text>

                <View className="mt-12 w-full">
                  <AppButton
                    color="bg-blue-800"
                    onPress={() => router.push("/create")}
                  >
                    Get a virtual card
                  </AppButton>
                </View>
              </View>
            )}
          />

          {cardsCount > 0 && cardsCount < 3 && (
            <View className="mt-12 px-4">
              <AppButton
                color="bg-blue-800"
                onPress={() => router.push("/create")}
                isLoading={isLoading}
                isDisabled={isLoading}
              >
                Create another card
              </AppButton>
            </View>
          )}
        </View>
      </View>
    </AppSafeAreaView>
  );
};

export default Cards;
