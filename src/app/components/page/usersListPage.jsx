import React, { useEffect, useRef, useState } from "react";
import _ from "lodash";
import styles from "./usersListPage.module.scss";
import GroupList from "../common/groupList/groupList";
import SearchField from "../ui/searchField/searchField";
import { useSelector } from "react-redux";

import { getUsersList } from "../../store/users";
import { getStatusesList } from "../../store/statuses";
import { getOrdersList } from "../../store/orders";
import { useSearchParams } from "react-router-dom";
import Table from "../common/table";
import urlQuery from "../../utils/urlQueryParcer";

const UsersListPage = () => {
   const users = useSelector(getUsersList());
   const filtersList = {
      status: useSelector(getStatusesList()),
      order: useSelector(getOrdersList()),
   };
   const [filters, setFilters] = useState({});
   const [sortBy, setSortBy] = useState({ path: "", order: "" });
   const [URLSearchParams, setURLSearchParams] = useSearchParams();
   const setFiltersBlockActiveText = useRef();

   const filteredUsers = filterUsers(users);
   const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], sortBy.order);

   function handleSort(item) {
      setSortBy(item);
      URLSearchParams.set("sortBy", item.path + " " + item.order);
      setURLSearchParams(URLSearchParams);
   }

   function handleFilterSelect({ type, value }) {
      let newFilters;

      if (filters[type] !== value && value !== "") {
         newFilters = { ...filters, [type]: value };
      } else {
         const newState = { ...filters };
         delete newState[type];
         URLSearchParams.delete(type);
         newFilters = { ...newState };
      }

      setFilters(newFilters);
      const filtersCopy = JSON.parse(JSON.stringify(newFilters));

      for (let filt in filtersCopy) {
         if (filtersCopy[filt]) {
            if (filt === "order") {
               filtersCopy[filt] =
                  filtersCopy[filt][0] + " " + filtersCopy[filt][1];
            } else if (filt === "status") {
               filtersCopy[filt] = filtersList["status"].find(
                  (f) => f.text === filtersCopy[filt]
               ).onEnglish;
            }
            URLSearchParams.set(filt, filtersCopy[filt]);
         }
      }
      Object.keys(filtersCopy).length
         ? setURLSearchParams(URLSearchParams)
         : setURLSearchParams("");
   }

   useEffect(() => {
      const urlParams = urlQuery.parce(URLSearchParams.toString());
      if (urlParams) {
         Object.keys(urlParams).forEach((urlParamsName) => {
            for (let i = 0; i < Object.keys(urlParams).length; i++) {
               switch (urlParamsName) {
                  case "status":
                     setFilters((prev) => ({
                        ...prev,
                        [urlParamsName]: filtersList[urlParamsName].find(
                           (f) =>
                              f.onEnglish === urlParams[urlParamsName].join(" ")
                        ).text,
                     }));
                     break;

                  case "order":
                     setFilters((prev) => ({
                        ...prev,
                        [urlParamsName]: urlParams[urlParamsName].map(
                           (el) => +el
                        ),
                     }));
                     break;

                  case "sortBy":
                     setSortBy({
                        path: urlParams[urlParamsName][0],
                        order: urlParams[urlParamsName][1],
                     });
                     break;

                  case "search":
                     setFilters((prev) => ({
                        ...prev,
                        [urlParamsName]: urlParams[urlParamsName][0],
                     }));
                     break;
                  default:
                     break;
               }
            }
         });
      }
   }, []);

   function filterUsers(users) {
      let filteredUsers = users;
      const filtersNum = Object.values(filters).length;
      for (let i = 0; i < filtersNum; i++) {
         filter(filteredUsers, Object.keys(filters)[i]);
      }
      return filteredUsers;

      function filter(users, filterName) {
         filteredUsers = users.filter((user) => {
            switch (filterName) {
               case "order":
                  if (filters.order) {
                     return (
                        filters.order[0] <= Number(user.order) &&
                        Number(user.order) <= filters.order[1]
                     );
                  }
                  break;
               case "search":
                  if (filters.search) {
                     return user.login
                        .toLowerCase()
                        .includes(filters.search.toLowerCase());
                  }
                  break;
               case "status":
                  return user[filterName] === filters[filterName];
               default:
                  break;
            }
         });
      }
   }

   function resetAll() {
      setFilters({});
      setURLSearchParams("");
      setSortBy({ path: "", order: "" });
   }

   const columns = {
      place: {
         name: "Место",
         component: (user) => users.indexOf(user) + 1,
      },
      login: {
         path: "login",
         name: "Логин",
         component: (user) => user.login,
      },
      orders: {
         path: "order",
         name: "Подтвержденные заказы",
         component: (user) => user.order,
      },
      status: {
         path: "status",
         name: "Статус",
         component: (user) => user.status,
      },
   };

   return (
      <div className={styles.page}>
         <p
            onClick={() =>
               setFiltersBlockActiveText.current.classList.toggle(
                  styles.filtersBlockActive
               )
            }
            className={styles.filtersTitle}
         >
            Фильтры
         </p>
         <div ref={setFiltersBlockActiveText} className={styles.filtersBlock}>
            {Object.keys(filtersList).length &&
               Object.keys(filtersList).map((filterName) => (
                  <GroupList
                     key={filterName + "Filter"}
                     selectedFilters={Object.entries(filters)}
                     items={filtersList[filterName]}
                     onItemSelect={handleFilterSelect}
                     title={
                        columns[
                           Object.keys(columns).find(
                              (colName) => columns[colName].path === filterName
                           )
                        ].name
                     }
                  />
               ))}
            <button className={styles.resetFiltersBtn} onClick={resetAll}>
               Сбросить фильтры
            </button>
         </div>

         <div className={styles.usersBlock}>
            <SearchField
               onChange={handleFilterSelect}
               search={filters.search}
               title={"Поиск"}
            />
            {filteredUsers.length > 0 ? (
               <Table
                  data={sortedUsers}
                  onSort={handleSort}
                  columns={columns}
                  selectedSort={sortBy}
               />
            ) : (
               <p className={styles.usersNoneMessage}>
                  Пользователи не найдены
               </p>
            )}
         </div>
      </div>
   );
};

export default UsersListPage;
