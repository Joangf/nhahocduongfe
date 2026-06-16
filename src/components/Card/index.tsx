import { twMerge } from "tailwind-merge";

interface CardProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  className?: string;
}
const Card = ({ children, header, className }: CardProps) => {
  return (
    <div className="divide-y divide-gray-200  rounded-lg bg-white shadow">
      {header && (
        <h1 className="px-4 py-5 text-lg font-bold sm:px-6">{header}</h1>
      )}
      <div className={twMerge("px-4 py-5 sm:p-6", className)}>{children}</div>
    </div>
  );
};
export default Card;
