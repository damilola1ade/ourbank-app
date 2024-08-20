import { View, Text, ScrollView, TextInput } from "react-native";
import React, { useState } from "react";
import { transactionHistory } from "@/constants/data";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AppSafeAreaView } from "@/components";

const TransactionHistory = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <AppSafeAreaView>
      <TextInput
        editable
        onChangeText={(text: string) => setSearchQuery(text)}
        value={searchQuery}
        className="-mt-8 mx-4 bg-gray-700 p-3 text-white rounded-2xl"
        placeholder="🔎    Search"
        placeholderTextColor="white"
      />

      <ScrollView className="px-4 mt-8">
        {transactionHistory.map((item, idx) => (
          <View key={idx}>
            <Text className="text-white font-psemibold text-lg">
              {item.createdAt}
            </Text>

            <View className="flex-row justify-between items-center mb-12">
              <View className="flex-row items-center pl-2 gap-1">
                <Ionicons name="sync-circle-outline" size={24} color="white" />
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
                  {item.amount}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </AppSafeAreaView>
  );
};

export default TransactionHistory;
