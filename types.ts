export interface CreateCardValues {
  cardName: string;
  provider: string;
}

export interface TabIconProps {
  icon?: any;
  color?: any;
  name?: string;
  focused?: any;
}

export interface ButtonProps {
  children: string;
  className?: string;
  buttonColor: string;
  onPress: () => void | Promise<void>;
  isLoading?: boolean;
  isDisabled?: boolean;
}

export interface AuthResponse {
  [x: string]: string;
  accessToken?: string | any;
  message?: string | any;
}

export interface SignUpRequest {
  name: string;
  email: string;
  password: string;
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface UserAvatarProps {
  onPress: () => void | VoidFunction;
}

export interface ErrorProp {
  error: {};
  message: string;
}

export interface TransactionHistoryProp {
  data: TransactionHistoryProp[];
  merchant?: string;
  status?: string;
  amount?: string;
  createdAt?: string;
}

export interface CreditCardComponentProps {
  onPress?: () => void;
  id?: any;
  provider: string;
  expiryDate: string;
  cardName: string;
  cardNumber: string;
  cvv: string;
}
