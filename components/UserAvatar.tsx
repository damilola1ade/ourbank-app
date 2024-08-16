import { useAppSelector } from "@/hooks/RTKHooks";
import { UserAvatarProps } from "@/types";
import { TouchableOpacity } from "react-native";
import { Avatar } from "react-native-paper";

export const UserAvatar = ({ onPress }: UserAvatarProps) => {
  const { user } = useAppSelector((store) => store.auth);

  return (
    <TouchableOpacity onPress={onPress}>
      <Avatar.Text size={40} label={user?.name} className="bg-white" />
    </TouchableOpacity>
  );
};
