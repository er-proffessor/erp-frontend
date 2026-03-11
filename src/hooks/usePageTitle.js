import { useEffect } from "react";

const usePageTitle = (title) => {
  useEffect(() => {
    document.title = `${title} | Publication ERP`;
  }, [title]);
};

export default usePageTitle;