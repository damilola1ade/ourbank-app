import { useAppSelector } from "@/hooks/RTKHooks";
import { UserAvatarProps } from "@/types";
import { TouchableOpacity } from "react-native";
import { Avatar } from "react-native-paper";

export const UserAvatar = ({ onPress, size }: UserAvatarProps) => {
  const { user } = useAppSelector((store) => store.auth);

  return (
    <TouchableOpacity onPress={onPress}>
      <Avatar.Image size={size} source={require('../assets/images/avatar.jpg')} />
    </TouchableOpacity>
  );
};
