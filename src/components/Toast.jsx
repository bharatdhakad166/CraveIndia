const Toast = ({ toast }) => {
  if (!toast) return null;

  const colors = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
  };

  return (
    <div className="fixed top-5 right-5 z-50">
      <div
        className={`${colors[toast.type]} text-white px-4 py-2 rounded-lg shadow-lg `}
      >
        {toast.message}
      </div>
    </div>
  );
};

export default Toast; 