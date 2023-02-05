import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersLoadedStatus, loadOrdersList } from "../../../store/orders";
import {
   getStatusesLoadedStatus,
   loadStatusesList,
} from "../../../store/statuses";
import { getUsersLoadedStatus, loadUsersList } from "../../../store/users";

const AppLoader = ({ children }) => {
   const dispatch = useDispatch();

   const usersStatusLoaded = useSelector(getUsersLoadedStatus());
   const statusesLoadedStatus = useSelector(getStatusesLoadedStatus());
   const ordersLoadedStatus = useSelector(getOrdersLoadedStatus());

   useEffect(() => {
      dispatch(loadUsersList());
      dispatch(loadStatusesList());
      dispatch(loadOrdersList());
   }, []);

   return usersStatusLoaded && statusesLoadedStatus && ordersLoadedStatus ? (
      children
   ) : (
      <h1>Loading...</h1>
   );
};

export default AppLoader;
