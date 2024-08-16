import { useState } from "react";
import { Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Button, HelperText, TextInput } from "react-native-paper";
import { SelectList } from "react-native-dropdown-select-list";

import { useTheme } from "react-native-paper";
import { Controller, useForm } from "react-hook-form";
import { useCreateCardMutation } from "@/store/cards";
import { router } from "expo-router";
import { AppSafeAreaView } from "@/components";
import { CreateCardValues } from "@/types";

const providers = [
  { name: "Mastercard", value: "Mastercard" },
  { name: "Verve", value: "Verve" },
  { name: "Visa", value: "Visa" },
];

const CreateCard = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateCardValues>({
    mode: "onChange",
  });

  const theme = useTheme();

  const [createCard, { isLoading }] = useCreateCardMutation();

  const [error, setError] = useState({});

  const onSubmit = async (data: CreateCardValues) => {
    try {
      const response = await createCard({
        cardName: data.cardName,
        provider: data.provider,
      }).unwrap();

      if (response) {
        router.back();
      }
    } catch (error) {
      const typedError = error as Error;
      setError(typedError as any);
      console.log(typedError);
    }
  };

  return (
    <AppSafeAreaView>
      <View className="px-6">
        <Controller
          control={control}
          name="cardName"
          rules={{
            required: "Name is required",
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <TextInput
                mode="flat"
                autoComplete="email"
                autoCapitalize="none"
                returnKeyType="next"
                label={<Text className="text-white">Name on card</Text>}
                className="mt-6 bg-black-100 text-white min-h-[50px] rounded-2xl"
                selectionColor="white"
                contentStyle={{ color: "white" }}
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                error={errors.cardName && true}
              />
              <HelperText type="error" className="text-red-600">
                {errors.cardName?.message}
              </HelperText>
            </>
          )}
        />

        <Controller
          control={control}
          name="provider"
          rules={{
            required: "Provider is required",
          }}
          render={({ field: { onChange } }) => (
            <>
              <SelectList
                setSelected={(val: string) => {
                  onChange(val);
                }}
                data={providers}
                save="value"
                arrowicon={
                  <Ionicons
                    name="chevron-down-sharp"
                    size={18}
                    color="white"
                    style={{ marginTop: 5 }}
                  />
                }
                boxStyles={{
                  minHeight: 54,
                  marginTop: 24,
                  backgroundColor: "#1e1e2d",
                  borderColor: theme.colors.primary,
                  borderRadius: 16,
                }}
                inputStyles={{ marginTop: 4, color: "white", fontSize: 16 }}
                dropdownTextStyles={{ color: "white" }}
                search={false}
                placeholder="Select provider"
              />

              <HelperText type="error" style={{ color: "red" }}>
                {errors.provider?.message}
              </HelperText>
            </>
          )}
        />

        <View className="mt-80 mx-6 absolute w-full">
          <Button
            buttonColor="blue"
            labelStyle={{ color: "white", fontSize: 18, fontWeight: "bold" }}
            className="w-full p-2 rounded-xl"
            onPress={handleSubmit(onSubmit)}
            loading={isLoading}
            disabled={isLoading}
          >
            Create card
          </Button>
        </View>
      </View>
    </AppSafeAreaView>
  );
};

export default CreateCard;
