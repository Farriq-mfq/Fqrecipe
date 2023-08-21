import React from "react";

interface IFloatingButton {
  Icon: React.ForwardRefExoticComponent<
    React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & {
      title?: string;
      titleId?: string;
    } & React.RefAttributes<SVGSVGElement>
  >;

  onPress: () => void;
}
const FloatingButton: React.FC<IFloatingButton> = ({ Icon, onPress }) => {
  return (
    <button
      onClick={onPress}
      type="button"
      className="btn btn-warning btn-circle fixed z-[999] bottom-5 right-5"
    >
      <Icon className="w-7 h-7 text-gray-800" />
    </button>
  );
};
export default FloatingButton;
