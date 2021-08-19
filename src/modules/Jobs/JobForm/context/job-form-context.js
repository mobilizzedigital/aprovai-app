import React from 'react';

const JobFormContext = React.createContext();

const jobFormReducer = (state, action) => {
  switch (action.type) {
    case 'set_clients':
      return { ...state, clients: action.value };
    case 'update_form':
      return { ...state, form: { ...state.form, ...action.value } };
    case 'set_items':
      return {
        ...state,
        items: [...state.items, action.value],
      };
    case 'remove_item':
      // @TODO: Remover o item inteiro quando não houver mais arquivos
      return {
        ...state,
        items: state.items.map((item, itemIndex) => {
          if (itemIndex === action.value.itemIndex) {
            return {
              ...item,
              files: item.files.filter(
                (_, fileIndex) => fileIndex !== action.value.fileIndex
              ),
            };
          }
          return item;
        }),
      };
    case 'set_validation_error':
      return {
        ...state,
        formErrors: {
          ...state.formErrors,
          ...action.value,
        },
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const JobFormContextProvider = ({ clients, children }) => {
  const [state, dispatch] = React.useReducer(jobFormReducer, {
    clients: [],
    items: [],
    form: { name: '', client: null },
    formErrors: { name: false, client: false, files: false },
  });

  React.useEffect(() => {
    const mapClientToSelect = ({ id, nome, enderecoLogo }) => ({
      value: id,
      label: nome,
      logo: enderecoLogo,
    });

    if (clients)
      dispatch({
        type: 'set_clients',
        value: clients.map(mapClientToSelect),
      });
  }, [clients]);

  const value = [state, dispatch];

  return (
    <JobFormContext.Provider value={value}>{children}</JobFormContext.Provider>
  );
};

const useJobFormContext = () => {
  const context = React.useContext(JobFormContext);
  if (!context) {
    throw new Error(
      `useJobFormContext must be used within a JobFormContextProvider`
    );
  }
  return context;
};

export { useJobFormContext, JobFormContextProvider };
