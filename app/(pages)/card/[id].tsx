import { useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { Alert, View } from "react-native";
import {
  AppSafeAreaView,
  AppButton,
  RecentTransactions,
  Loader,
  AnimatedCreditCard,
} from "@/components";

import { useFormatCardNumber } from "@/hooks/useFormatCardNumber";
import { useDeleteCardMutation, useGetSingleCardQuery } from "@/store/cards";

import { useBiometricToViewRoute } from "@/hooks/useBiometricToViewRoute";

export default function CardPage() {
  const { id } = useLocalSearchParams();

  const { isAuthenticated } = useBiometricToViewRoute();

  const { data, isLoading: isCardLoading } = useGetSingleCardQuery(id);

  const transactions = data?.card?.transactionHistory;

  const [deleteCard, { isLoading }] = useDeleteCardMutation();

  const handlePress = async () => {
    Alert.alert(
      'Confirm',
      'Are you sure you want to deactivate this card?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Deactivate',
          style: 'destructive',
          onPress: async () => {
            try {
              const response = await deleteCard({
                cardId: id,
              }).unwrap();
  
              if (response) {
                router.push("/cards");
              }
            } catch (error) {
              // Handle the error
            }
          },
        },
      ]
    );
  };

  useEffect(() => {
    if (isAuthenticated === null) return;

    if (!isAuthenticated) {
      Alert.alert(
        "Authentication failed",
        "You are not authorized to view this card.",
        [{ text: "OK", onPress: () => router.back() }]
      );
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return null; // Don't render anything until authentication is successful
  }

  if (isLoading || isCardLoading) {
    return <Loader />;
  }

  return (
    <AppSafeAreaView>
      <View className="items-center justify-center">
        <AnimatedCreditCard
          id={data?.card?.id}
          provider={data?.card?.provider}
          cardNumber={useFormatCardNumber(data?.card?.cardNumber)}
          cardName={data?.card?.cardName}
          expiryDate={data?.card?.expiryDate}
          cvv={data?.card?.cvv}
        />
      </View>

      <View className="mt-56 px-8">
        <AppButton
          color="bg-red-700"
          onPress={handlePress}
          isLoading={isLoading}
          isDisabled={isLoading}
        >
          Deactivate card
        </AppButton>
      </View>

      <View className="mt-12 px-6">
        <RecentTransactions data={transactions} />
      </View>
    </AppSafeAreaView>
  );
}
