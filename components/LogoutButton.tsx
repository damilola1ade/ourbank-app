import { Button } from "react-native-paper";
import { useLogOutMutation } from "../store/auth";
import { useAppDispatch } from "@/hooks/RTKHooks";
import { logout } from "@/slice/authSlice";
import { router } from "expo-router";

export const LogoutButton: React.FC = () => {
  const [logOut, { isLoading }] = useLogOutMutation();

  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      await logOut(null).unwrap();
      dispatch(logout());
      router.replace("/login");
    } catch (error) {}
  };

  return (
    <Button
      onPress={handleLogout}
      loading={isLoading}
      disabled={isLoading}
      mode="text"
      labelStyle={{ color: "red" }}
      icon="power"
      contentStyle={{ flexDirection: "row-reverse" }}
    >
      Logout
    </Button>
  );
};
