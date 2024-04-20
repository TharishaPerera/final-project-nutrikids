import { useTheme } from "next-themes";
import { HashLoader } from "react-spinners";

interface LoaderProps {
  size?: number;
  height?: "default" | "sm";
}

export const Loader: React.FC<LoaderProps> = ({
  size = 30,
  height = "default",
}) => {
  const { theme } = useTheme();
  const bgColor = theme === "light" ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)";
  console.log(bgColor)
  return (
    <>
      {height == "default" ? (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 999,
            backgroundColor: bgColor,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "40%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <div className="w-full flex justify-center py-10">
              <HashLoader
                color={theme === "light" ? "#000" : "#fff"}
                size={size}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full flex justify-center py-10">
          <HashLoader color={theme == "light" ? "#000" : "#fff"} size={size} />
        </div>
      )}
    </>
  );
};
