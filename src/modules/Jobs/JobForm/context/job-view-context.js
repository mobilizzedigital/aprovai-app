import React from 'react';

const JobViewContext = React.createContext();

const jobViewReducer = (state, action) => {
  switch (action.type) {
    case 'set_review_items':
      return { ...state, isPreviewPage: true };

    case 'open_upload_modal':
      const isEditMode = action?.payload?.hasOwnProperty('index');
      return {
        ...state,
        uploadModal: {
          mode: isEditMode ? 'edit' : 'new',
          index: action?.payload?.index || 0,
          isOpen: true,
        },
      };

    case 'close_upload_modal':
      return {
        ...state,
        uploadModal: { mode: 'new', index: 0, isOpen: false },
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const JobViewContextProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(jobViewReducer, {
    isUploadModalActive: false,
    uploadModal: {
      mode: 'new',
      index: 0,
      isOpen: false,
    },
    isPreviewPage: false,
  });

  const value = [state, dispatch];

  return (
    <JobViewContext.Provider value={value}>{children}</JobViewContext.Provider>
  );
};

const useJobViewContext = () => {
  const context = React.useContext(JobViewContext);
  if (!context) {
    throw new Error(
      `useJobFormContext must be used within a JobFormContextProvider`
    );
  }
  return context;
};

export { useJobViewContext, JobViewContextProvider };
