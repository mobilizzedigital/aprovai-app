import React from 'react';

const styles = {
  navButton: {
    height: 30,
    width: 30,
    borderRadius: '100%',
    border: 'none',
    fontSize: 20,
  },
  leftButton: {
    left: -45,
    top: 'calc(50% - 30px)',
  },
  rightButton: {
    right: -45,
    top: 'calc(50% - 30px)',
  },
  table: {
    borderSpacing: 10,
    borderCollapse: 'separate',
  },
};

const JobDashboardImageHandler = ({ setFileIndex, fileIndex, files }) => {
  return (
    <div className="position-relative">
      <div>
        <img className="w-100" src={files[fileIndex].endereco} alt="" />
        {files.length > 1 ? (
          <>
            <button
              onClick={() =>
                setFileIndex(fileIndex === 0 ? files.length - 1 : fileIndex - 1)
              }
              type="button"
              className="position-absolute shadow text-primary bg-light"
              style={{ ...styles.navButton, ...styles.leftButton }}
            >
              {'<'}
            </button>
            <button
              onClick={() =>
                setFileIndex(fileIndex >= files.length - 1 ? 0 : fileIndex + 1)
              }
              type="button"
              className="position-absolute shadow text-primary bg-light disabled"
              style={{ ...styles.navButton, ...styles.rightButton }}
            >
              {'>'}
            </button>
          </>
        ) : (
          <></>
        )}
      </div>
      <table
        className="mb-3 mt-3 d-flex justify-content-center"
        style={styles.table}
      >
        <tr>
          {files.map((_, index) => (
            <td
              onClick={() => setFileIndex(index)}
              style={{
                cursor: 'pointer',
                width: 20,
                height: 5,
                backgroundColor: index === fileIndex ? '#6E4BE8' : '#C4C4C4',
              }}
            />
          ))}
        </tr>
      </table>
    </div>
  );
};

export default JobDashboardImageHandler;
