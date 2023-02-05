import styles from "./searchField.module.scss";

const SearchField = ({ onChange, search = "", title }) => {
   const handleChange = (e) => {
      onChange({ type: "search", value: e.target.value });
   };

   return (
      <>
         <h2 className={styles.title}>{title}</h2>
         <input
            className={styles.searchInput}
            type="text"
            onChange={handleChange}
            value={search}
            placeholder="Search..."
         />
      </>
   );
};

export default SearchField;
