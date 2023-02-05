import React from "react";
import { Route, Routes } from "react-router-dom";
import AppLoader from "./components/ui/hoc/appLoader";
import UsersListPage from "./components/page/usersListPage";

const App = () => {
   return (
      <>
         <AppLoader>
            <Routes>
               <Route index element={<UsersListPage />} />
            </Routes>
         </AppLoader>
      </>)
};

export default App;