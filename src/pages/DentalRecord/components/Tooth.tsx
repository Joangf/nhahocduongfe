import { twMerge } from "tailwind-merge";

import normalTeeth from "@/assets/images/1-5.svg";
import problemTeeth from "@/assets/images/6-8.svg";

interface Props {
  position: number;
  isHighlight?: boolean;
  type?: number;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  colour?: any;
}
const Tooth = ({
  position,
  isHighlight = false,
  type = -1,
  onClick,
  colour,
}: Props) => {
  return (
    <button className="flex flex-col items-center" onClick={onClick}>
      <div
        className={twMerge(
          colour ? colour[1]?.includes("green") && "bg-green-500" : "",
          colour ? colour[1]?.includes("red") && "bg-red-500" : "",
          colour ? colour[1]?.includes("yellow") && "bg-yellow-500" : "",
        )}
      >
        <img src={type < 0 ? normalTeeth : problemTeeth} />
      </div>
      <span>{position}</span>
    </button>
  );
};
export default Tooth;
