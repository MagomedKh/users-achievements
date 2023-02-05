import styles from "./table.module.scss";

const Table = ({ onSort, selectedSort, columns, data }) => {
   const handleSort = (item) => {
      selectedSort.path === item
         ? onSort({
              ...selectedSort,
              order: selectedSort.order === "asc" ? "desc" : "asc",
           })
         : onSort({ path: item, order: "asc" });
   };

   const changeSortArrow = (selectedSort, currentPath) => {
      if (selectedSort.path !== currentPath) return;
      return selectedSort.order === "asc" ? (
         <i className="bi bi-caret-down-fill"></i>
      ) : (
         <i className="bi bi-caret-up-fill"></i>
      );
   };

   const renderContent = (item, column) => {
      const component = columns[column].component;
      return component(item);
   };

   return (
      <div className={styles.wrapper}>
         <table className={styles.table} id="table">
            <thead className={styles.tableHeader}>
               <tr className={styles.tr}>
                  {Object.keys(columns).map((column) => (
                     <th key={column} className={styles.th}>
                        <span
                           className={styles.thSpan}
                           onClick={() => handleSort(columns[column].path)}
                        >
                           {columns[column].name}
                           {columns[column].path &&
                              changeSortArrow(
                                 selectedSort,
                                 columns[column].path
                              )}
                        </span>
                     </th>
                  ))}
               </tr>
            </thead>
            <tbody className={styles.tableBody}>
               {data.map((item) => (
                  <tr className={styles.tr} key={item._id}>
                     {Object.keys(columns).map((column) => (
                        <td className={styles.td} key={column}>
                           {renderContent(item, column)}
                        </td>
                     ))}
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
};

export default Table;
