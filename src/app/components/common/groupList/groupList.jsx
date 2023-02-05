import _ from "lodash";
import React from "react";
import styles from "./groupList.module.scss";

const GroupList = ({
   items,
   valueProp = "_id",
   contentProp = "text",
   onItemSelect,
   selectedFilters,
   title,
}) => {
   return (
      <div>
         <h3 className={styles.title}>{title}</h3>
         <ul className={styles.list}>
            {items?.map((item) => (
               <li
                  className={styles.listItem}
                  style={
                     selectedFilters.some((filt) =>
                        _.isEqual(item.value, filt[1])
                     )
                        ? { backgroundColor: "#0d6efd", color: "#fff" }
                        : {}
                  }
                  key={item[valueProp]}
                  onClick={() => onItemSelect(item)}
                  role="button"
               >
                  {item[contentProp]}
               </li>
            ))}
         </ul>
      </div>
   );
};

export default GroupList;
