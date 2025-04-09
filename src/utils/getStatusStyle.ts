export const getStatusStyle = (status: string): string => {
  switch (status) {
    case "Delivered":
      return "bg-[#EBF9F1] text-[#1F9254] py-2 text-xs px-3 dark:bg-green-800/20 dark:text-green-400";
    case "Process":
      return "bg-yellow-100 text-yellow-600 py-2 text-xs px-3 dark:bg-yellow-800/20 dark:text-yellow-400";
    case "Cancelled":
      return "bg-red-100 text-red-600 py-2 px-3 text-xs dark:bg-red-800/20 dark:text-red-400";
    default:
      return "";
  }
};
