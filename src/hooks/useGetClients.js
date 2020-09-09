import { useState, useEffect } from 'react';

import { ClientsAPI } from '../api';

function useGetClients(perPage = 10, page = 0, name = '') {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await ClientsAPI.getClients(
          perPage,
          name !== '' ? 0 : page,
          name
        );
        setLoading(false);
        setClients(data.empresas);
        setTotal(data.totalRegistros);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchData();
  }, [perPage, page, name]);

  return { clients, total, loading };
}

export default useGetClients;
