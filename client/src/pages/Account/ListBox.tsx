import { ChevronRightIcon } from "@heroicons/react/24/solid";
import React from "react";
import { Link, To } from "react-router-dom";
interface IListBox {
  title: string;
  Icon: React.ForwardRefExoticComponent<
    React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & {
      title?: string;
      titleId?: string;
    } & React.RefAttributes<SVGSVGElement>
  >;

  to: To;
}
const ListBox: React.FC<IListBox> = ({ Icon, title, to }) => {
  return (
    <Link
      to={to}
      className="bg-white border-2 rounded-box p-4 flex justify-between items-center"
    >
      <div className="flex space-x-3 items-center">
        <Icon className="w-7 h-7 text-gray-800" />
        <h3 className="uppercase lg:text-lg text-sm font-semibold">{title}</h3>
      </div>
      <ChevronRightIcon className="w-7 h-7 text-gray-800" />
    </Link>
  );
};

export default ListBox;
