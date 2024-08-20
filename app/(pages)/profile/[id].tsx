import { router, useLocalSearchParams } from "expo-router";

import { AppButton, AppSafeAreaView, UserAvatar } from "@/components";

import RNPickerSelect from "react-native-picker-select";

import { FAB, Text, TextInput } from "react-native-paper";
import { ScrollView, View } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/hooks/RTKHooks";
import { useEffect } from "react";
import { useEditProfileMutation } from "@/store/auth";
import { updateUser } from "@/slice/authSlice";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function EditProfile() {
  const { id } = useLocalSearchParams();

  const { user } = useAppSelector((store) => store.auth);

  const dispatch = useAppDispatch();

  const { name } = user;

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
    },
  });

  const [editProfile, { isLoading }] = useEditProfileMutation();

  const onSubmit = async (data) => {
    try {
      const response = await editProfile({
        id: id,
        ...data,
      }).unwrap();
      dispatch(updateUser({ user: response.updatedUser }));

      if (response) {
        router.back();
      }
    } catch (error) {
      const typedError = error as Error;
      //   setError(typedError as any);
      console.log(typedError);
    }
  };

  useEffect(() => {
    let defaults = {
      name: name,
    };
    reset(defaults);
  }, [name, reset]);

  return (
    <AppSafeAreaView>
      <ScrollView className="mt-4 px-1">
        <View className="items-center">
          <View className="relative">
            <UserAvatar size={125} onPress={() => {}} />
            <FAB
              icon="camera"
              className="bg-white absolute bottom-0 right-0 rounded-full"
              size="small"
            />
          </View>
        </View>

        <View className="mt-8 px-6 space-y-6">
          <View>
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <TextInput
                    mode="flat"
                    autoCapitalize="none"
                    returnKeyType="next"
                    label={<Text className="text-white">Full name</Text>}
                    className=" bg-black-100 text-white min-h-[50px] rounded-2xl"
                    selectionColor="white"
                    contentStyle={{ color: "white" }}
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                  />
                </>
              )}
            />
          </View>

          <View>
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <RNPickerSelect
                    onValueChange={(value) => console.log(value)}
                    items={[
                      { label: "Football", value: "football" },
                      { label: "Baseball", value: "baseball" },
                      { label: "Hockey", value: "hockey" },
                    ]}
                    placeholder={{ label: "Choose gender" }}
                    style={{
                      viewContainer: {
                        backgroundColor: "#1e1e2d",
                        borderRadius: 16,
                        padding: 20,
                      },
                      placeholder: { color: "white" },
                    }}
                    Icon={<Ionicons name='arrow-back' color='white' />}
                  />
                </>
              )}
            />
          </View>

          <View>
            <AppButton
              color="bg-blue-800"
              onPress={handleSubmit(onSubmit)}
              isLoading={isLoading}
              isDisabled={isLoading}
            >
              Save changes
            </AppButton>
          </View>
        </View>
      </ScrollView>
    </AppSafeAreaView>
  );
}
