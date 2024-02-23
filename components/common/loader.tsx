import { HashLoader } from "react-spinners";

interface LoaderProps {
  size?: number;
}

export const Loader: React.FC<LoaderProps> = ({ size = 30 }) => {
  return (
    <div className="w-full flex justify-center">
      <HashLoader color="#000" size={size} />
    </div>
  );
};
