import { View, Text, Image } from "react-native";

import {
  AppSafeAreaView,
  AppButton,
  CreditCardComponent,
  Loader,
} from "@/components";
import { images } from "@/constants";
import { router } from "expo-router";
import { CreditCardComponentProps } from "@/types";
import { useGetAllCardsQuery } from "@/store/cards";

const Cards = () => {
  const { data, isLoading, error } = useGetAllCardsQuery("");

  const maximumCardsCreated = data?.cards?.length === 3;

  if (isLoading) {
    return <Loader />;
  }

  return (
    <AppSafeAreaView>
      <View className="mt-5 px-4">
        <Text className="text-white text-3xl font-pbold">Cards</Text>

        {!data?.cards?.length ? (
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
              Instantly create a virtual card to make managing online payments
              easy.
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
        ) : (
          <View className="mt-10">
            {data?.cards?.map((item: CreditCardComponentProps) => (
              <CreditCardComponent
                onPress={() =>
                  router.push({
                    pathname: "/(pages)/card/[id]",
                    params: { id: item.id },
                  })
                }
                key={item.id}
                provider={item.provider}
                cardNumber={"**** **** **** ****"}
                cardName={item.cardName}
                expiryDate={""}
                cvv={""}
              />
            ))}

            {maximumCardsCreated ? null : (
              <View className="mt-4 px-4">
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
        )}

        {/* <FlatList
          data={data?.cards}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <CreditCardComponent item={item} />}
          ItemSeparatorComponent={() => <View style={{ height: 30 }} />}
          contentContainerStyle={{ paddingBottom: 20 }}
        /> */}
      </View>
    </AppSafeAreaView>
  );
};

export default Cards;
