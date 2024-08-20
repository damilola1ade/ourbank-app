import { View, Text, ScrollView } from "react-native";
import React from "react";
import { Button } from "react-native-paper";

import Ionicons from "@expo/vector-icons/Ionicons";
import { Href, router } from "expo-router";
import { TransactionHistoryProp } from "@/types";

const formatDate = (dateString: string | number | Date) => {
  const date = new Date(dateString);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options as {});
};

export const RecentTransactions = ({ data }: TransactionHistoryProp) => {
  const transactions = Array.isArray(data) ? data : [];

  // Sort transactions by createdAt in descending order
  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  // Limit the sorted transactions to only 2, show all transactions in Transaction history page

  const LimitTo2Transactions = sortedTransactions.slice(0, 2);

  // Filter transactions to show only the first 2 for each createdAt date
  const filteredTransactions = LimitTo2Transactions.reduce<
    Record<string, TransactionHistoryProp[]>
  >((acc, item) => {
    const date = item.createdAt;
    if (!acc[date]) {
      acc[date] = [];
    }
    if (acc[date].length < 2) {
      acc[date].push(item);
    }
    return acc;
  }, {});

  return (
    <>
      <View className="flex-row justify-between items-center">
        <Text className="text-white text-lg font-pregular">
          Recent transactions
        </Text>
        <Button
        onPress={() =>router.push('/transaction-history')}
          // onPress={() =>
          //   router.push("/transaction-history" as Href<"/transaction-history">)
          // }
          mode="outlined"
          labelStyle={{ color: "white" }}
          className="border-white"
        >
          See all
        </Button>
      </View>

      <ScrollView className="h-[50vh] px-3">
        {Object.entries(filteredTransactions || {}).map(
          ([date, items], idx) => (
            <View className="mt-8" key={idx}>
              <Text className="text-white font-psemibold text-lg">
                {formatDate(date)}
              </Text>

              {items.map((item, index) => (
                <View
                  key={index}
                  className="flex-row justify-between items-center mt-4"
                >
                  <View className="flex-row items-center pl-2 gap-1">
                    <Ionicons
                      name="sync-circle-outline"
                      size={24}
                      color="white"
                    />
                    <View className="gap-2">
                      <Text className="text-white font-pregular text-lg">
                        {item.merchant}
                      </Text>
                      <Text
                        className={`${
                          item.status === "Successful"
                            ? "text-green-500"
                            : "text-red-500"
                        } font-pregular text-lg`}
                      >
                        {item.status}
                      </Text>
                    </View>
                  </View>

                  <View className="flex-row items-center pl-4 gap-2">
                    <Text className="text-white font-pregular text-lg">
                      ${item.amount}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          )
        )}
      </ScrollView>
    </>
  );
};
