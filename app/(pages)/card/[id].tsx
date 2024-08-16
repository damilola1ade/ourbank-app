import {
  AppSafeAreaView,
  Button,
  CreditCardComponent,
  RecentTransactions,
  Loader,
  AnimatedCreditCard,
} from "@/components";
import { useFormatCardNumber } from "@/hooks/useFormatCardNumber";
import { useDeleteCardMutation, useGetSingleCardQuery } from "@/store/cards";
import { router, useLocalSearchParams } from "expo-router";
import { ScrollView, View } from "react-native";

export default function CardPage() {
  const { id } = useLocalSearchParams();

  const { data, isLoading: isCardLoading } = useGetSingleCardQuery(id);

  const transactions = data?.card?.transactionHistory;

  const [deleteCard, { isLoading }] = useDeleteCardMutation();

  const handlePress = async () => {
    try {
      const response = await deleteCard({
        cardId: id,
      }).unwrap();

      if (response) {
        router.push("/cards");
      }
    } catch (error) {}
  };

  if (isLoading) {
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

      <View className="mt-56 px-16">
        <Button buttonColor="red" onPress={handlePress}>
          Deactivate card
        </Button>
      </View>

      <View className="mt-12 px-6">
        <RecentTransactions data={transactions} />
      </View>
    </AppSafeAreaView>
  );
}
