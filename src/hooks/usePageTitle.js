import { useEffect } from 'react';

const usePageTitle = title => {
  useEffect(() => {
    document.title = `${title} - Aprova ai`;
  }, [title]);
};

export default usePageTitle;
