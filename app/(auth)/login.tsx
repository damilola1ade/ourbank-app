import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { View, Text, ScrollView, Image } from "react-native";

import { images } from "@/constants";
import { Href, Link, router } from "expo-router";
import { HelperText, TextInput, useTheme } from "react-native-paper";

import { useAppDispatch } from "@/hooks/RTKHooks";
import { setUser } from "@/slice/authSlice";
import { useLoginMutation } from "@/store/auth";
import { AppSafeAreaView, AppButton } from "@/components";
import { ErrorProp, SignInRequest } from "@/types";

const Login = () => {
  const theme = useTheme();

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInRequest>({
    mode: "onChange",
  });

  const [login, { isLoading }] = useLoginMutation();

  const [error, setError] = useState<ErrorProp>();

  const dispatch = useAppDispatch();

  const [passwordVisible, setPasswordVisible] = useState(false);

  const onSubmit = async (data: SignInRequest) => {
    try {
      const response = await login({
        email: data.email,
        password: data.password,
      }).unwrap();
      dispatch(
        setUser({ user: response.user, accessToken: response.accessToken })
      );
      router.replace("/home" as Href<"/home">);
    } catch (error) {
      const typedError = error as Error;
      setError(typedError as any);
    }
  };

  return (
    <AppSafeAreaView>
      <ScrollView>
        <View className="w-full min-h-[85vh] px-4 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="mt-8 w-[115px] h-[35px]"
          />

          <Text className="text-xl text-white text-semibold mt-10 font-psemibold">
            Log in
          </Text>

          {error && (
            <View className="w-full mt-5 p-5 justify-center items-center border-2 border-red-500 rounded-2xl">
              <Text className="text-md text-red-600 text-semibold font-psemibold">
                {error?.message}
              </Text>
            </View>
          )}

          <Controller
            control={control}
            name="email"
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <TextInput
                  mode="flat"
                  autoComplete="email"
                  autoCapitalize="none"
                  returnKeyType="next"
                  label={<Text className="text-white">Email</Text>}
                  className="mt-6 bg-black-100 text-white min-h-[50px] rounded-2xl"
                  selectionColor="white"
                  contentStyle={{ color: "white" }}
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  error={errors.email && true}
                />
                <HelperText type="error" className="text-red-600">
                  {errors.email?.message}
                </HelperText>
              </>
            )}
          />

          <Controller
            control={control}
            name="password"
            rules={{
              required: "Password is required",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <TextInput
                  mode="flat"
                  label={<Text className="text-white">Password</Text>}
                  className="mt-2 bg-black-100 text-white min-h-[50px] rounded-2xl"
                  selectionColor="white"
                  contentStyle={{ color: "white" }}
                  secureTextEntry={!passwordVisible}
                  right={
                    <TextInput.Icon
                      color="white"
                      icon={passwordVisible ? "eye-off" : "eye"}
                      onPress={() => setPasswordVisible(!passwordVisible)}
                    />
                  }
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  error={errors.password && true}
                />
                <HelperText type="error" className="text-red-600">
                  {errors.password?.message}
                </HelperText>
              </>
            )}
          />

          <View className="mt-8">
            <AppButton
              color="bg-secondary"
              onPress={handleSubmit(onSubmit)}
              isLoading={isLoading}
              isDisabled={isLoading}
            >
              Login
            </AppButton>
          </View>

          <View className="justify-center pt-5 flex-row gap-1 text-lg ">
            <Text className="text-gray-100 font-pregular">
              Don't have an account?{" "}
            </Text>
            <Link href="/signup" className="font-psemibold text-secondary">
              Sign up
            </Link>
          </View>
        </View>
      </ScrollView>
    </AppSafeAreaView>
  );
};

export default Login;
