export const getGradientColors = (provider: string) => {
  switch (provider) {
    case "Verve":
      return ["#4c669f", "#3b5998", "#192f6a"];
    case "Mastercard":
      return ["#15803D", "#0C4A6E"];
    case "Visa":
      return ["#F87171", "#DC2626"];
    default:
      return ["#4c669f", "#3b5998", "#192f6a"];
  }
};
