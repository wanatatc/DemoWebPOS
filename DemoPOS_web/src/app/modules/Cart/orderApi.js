import axios from "axios";
import { useQueryClient, useQuery, useMutation } from "react-query";
import * as Swal from "sweetalert2";
import * as Constant from "../../../Constant";
import { encodeURLWithParams } from "../_common/functions/commonFunctions";

/************** Constant URL ****************/

const baseUrl = Constant.API_URL;

const orderUrl = baseUrl + "/Orders";
const orderReportUrl = baseUrl + "/Orders​/Report";
const orderIdUrl = (id) => {
  return baseUrl + "/Orders​/" + id;
};
const orderDetailsUrl = (id) => {
  return baseUrl + "/Orders​/" + id + "​/OrderDetails";
};
const orderDeleteUrl = (id) => {
  return baseUrl + "/Orders​/" + id + "​/Delete";
};

/************** Axios **************/

//GET
//​/api​/Orders

const getOrders = (paginated, searchQuery) => {
  var payload = { paginated, searchQuery };
  var urlWithQueryString = encodeURLWithParams(orderUrl, payload);

  return axios
    .get(urlWithQueryString)
    .then((response) => {
      if (response.data.isSuccess) {
        let flatData = [];
        response.data.data.forEach((element) => {
          flatData.push(flatten(element));
        });
        let dataToReturn = {
          data: flatData,
          totalAmountRecords: response.data.totalAmountRecords,
        };
        return dataToReturn;
      } else {
        throw new Error(response.data.message);
      }
    })
    .catch((err) => {
      throw err;
    });
};

//POST
//​/api​/Orders

const postOrders = (payload) => {
  return axios
    .post(orderUrl, payload)
    .then((response) => {
      if (response.data.isSuccess) {
        return response.data.data;
      } else {
        throw Error(response.data.message);
      }
    })
    .catch((error) => {
      throw error;
    });
};

//GET
//​/api​/Orders​/Report

//GET
//​/api​/Orders​/{id}

const getOrderById = (id) => {
  return axios
    .get(orderIdUrl(id))
    .then((response) => {
      if (response.data.isSuccess) {
        return response.data.data;
      } else {
        throw Error(response.data.message);
      }
    })
    .catch((error) => {
      throw error;
    });
};

//GET
//​/api​/Orders​/{id}​/OrderDetails

//POST
//​/api​/Orders​/{id}​/Delete

const deleteOrderById = (id) => {
  return axios
    .post(orderDeleteUrl(id))
    .then((response) => {
      if (response.data.isSuccess) {
        return response.data.data;
      } else {
        throw Error(response.data.message);
      }
    })
    .catch((error) => {
      throw error;
    });
};

/************ React Query *************/

const getOrdersQueryName = "Orders";
const getOrderByIdQueryName = "Order";

export const useOrdersWithPagination = (
  paginated,
  searchQuery,
  onSuccessCallBack = () => {},
  onErrorCallBack = () => {}
) => {
  return useQuery(
    [getOrdersQueryName, paginated, searchQuery],
    () => getOrders(paginated, searchQuery),
    {
      onSuccess: onSuccessCallBack,
      onError: (error) => {
        Swal.swalError("Error", error.message).then((response) => {
          if (response.isConfirmed) {
            onErrorCallBack();
          }
        });
      },
      refetchOnWindowFocus: false,
    }
  );
};

export const useOrderCreate = (
  payload,
  onSuccessCallBack = () => {},
  onErrorCallBack = () => {}
) => {
  let queryClient = useQueryClient();

  return useMutation(() => postOrders(payload), {
    onSuccess: (data) => {
      queryClient.refetchQueries([getOrdersQueryName]);
      onSuccessCallBack();
    },
    onError: (error) => {
      Swal.swalError("Error", error.message).then((response) => {
        if (response.isConfirmed) {
          onErrorCallBack();
        }
      });
    },
  });
};

export const useOrderById = (
    id,
    onSuccessCallBack = () => {},
    onErrorCallBack = () => {}
) => {
    return useQuery(
        [getOrderByIdQueryName, id],
        () => getOrderById(id),
        {
            onSuccess: onSuccessCallBack,
            onError: (error) => {
              Swal.swalError("Error", error.message).then((response) => {
                if (response.isConfirmed) {
                  onErrorCallBack();
                }
              });
            },
            refetchOnWindowFocus: false,
        }
    );
}

export const useOrderDeleteById = (
    id,
    onSuccessCallBack = () => {},
    onErrorCallBack = () => {}
) => {
    
  let queryClient = useQueryClient();

  return useMutation(() => deleteOrderById(id), {
    onSuccess: (data) => {
      queryClient.refetchQueries([getOrdersQueryName]);
      queryClient.refetchQueries([getOrderByIdQueryName, id]);
      onSuccessCallBack();
    },
    onError: (error) => {
      Swal.swalError("Error", error.message).then((response) => {
        if (response.isConfirmed) {
          onErrorCallBack();
        }
      });
    },
  });
}