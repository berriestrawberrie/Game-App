import { useEffect } from "react";

interface AlertProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

const Alert: React.FC<AlertProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // auto-hide after 3s
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`mx-auto sm:w-4/5
        px-4 py-2 rounded-md mb-4 border
        ${
          type === "success"
            ? "bg-green-100 text-green-800 border-green-300"
            : "bg-red-100 text-red-800 border-red-300"
        }
      `}
    >
      {message}
    </div>
  );
};

export default Alert;
