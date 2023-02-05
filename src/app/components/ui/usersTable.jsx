import React from "react";
import Table from "../common/table";

const UserTable = ({ users, onSort, selectedSort }) => {
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

   return <Table {...{ onSort, selectedSort, columns, data: users }} />;
};

export default UserTable;
