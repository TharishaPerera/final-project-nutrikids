import { useTheme } from "next-themes";
import { HashLoader } from "react-spinners";

interface LoaderProps {
  size?: number;
}

export const Loader: React.FC<LoaderProps> = ({ size = 30 }) => {
  const { theme } = useTheme();
  return (
    <div className="w-full flex justify-center py-10">
      <HashLoader color={theme == 'light' ? '#000' : '#fff'} size={size} />
    </div>
  );
};
