import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";
import * as CONST from "../../../Constant";
import * as swal from "../_common/components/SweetAlert";
import { encodeURLWithParams } from '../_common/functions/commonFunctions'
var flatten = require("flat");
const apiUrl = `${CONST.API_URL}/employee`;
const singleQueryName = "employeeById";
const allQueryName = "employeeList";
const paginatedQueryName = "employeePaginated";

//get all
const getAll = () => {
  return axios
    .get(apiUrl)
    .then((res) => {
      if (res.data.isSuccess) {
        return res.data.data;
      } else {
        throw Error(res.data.message);
      }
    })
    .catch((err) => {
      throw err;
    });
};

export const useGetAll = (
  onSuccessCallBack = () => { },
  onErrorCallBack = () => { }
) => {
  return useQuery([allQueryName], () => getAll(), {
    onSuccess: () => {
      onSuccessCallBack();
    },
    onError: (err) => {
      swal.swalError("Error", err.message).then((res) => {
        if (res.isConfirmed) {
          onErrorCallBack();
        }
      });
    },
    //ปิด Fetching บางเส้น
    refetchOnWindowFocus: false,
    //refetchInterval: false,
    //refetchIntervalInBackground: false,
    //refetchOnMount: false,
    //refetchOnReconnect: false,
  });
};

// get paginated
const getPaginated = (paginate, searchValues) => {
  // console.log(JSON.stringify(searchValues));
  let payload = { ...paginate, ...searchValues };
  let url = encodeURLWithParams(`${apiUrl}`, payload)
  return axios
    .get(url)
    .then((res) => {
      if (res.data.isSuccess) {
        let flatData = [];
        res.data.data.forEach((element) => {
          flatData.push(flatten(element));
        });
        let dataToReturn = {
          data: flatData,
          totalAmountRecords: res.data.totalAmountRecords,
        };
        return dataToReturn;
      } else {
        throw new Error(res.data.message);
      }
    })
    .catch((err) => {
      throw err;
    });
};

export const useGetPaginated = (
  paginate,
  searchValues,
  onSuccessCallBack = () => { },
  onErrorCallBack = () => { }
) => {
  return useQuery(
    [paginatedQueryName, paginate, searchValues],
    () => getPaginated(paginate, searchValues),
    {
      onSuccess: () => {
        onSuccessCallBack();
      },
      onError: (err) => {
        swal.swalError("Error", err.message).then((res) => {
          if (res.isConfirmed) {
            onErrorCallBack();
          }
        });
      },
    }
  );
};

//get by id
const getById = (id) => {
  return axios
    .get(`${apiUrl}/${id}`)
    .then((res) => {
      if (res.data.isSuccess) {
        return res.data.data;
      } else {
        throw Error(res.data.message);
      }
    })
    .catch((err) => {
      throw err;
    });
};

export const useGetById = (
  id,
  onSuccessCallBack = () => { },
  onErrorCallBack = () => { }
) => {
  return useQuery([singleQueryName, id], () => getById(id), {
    enabled: Boolean(id),
    onSuccess: () => {
      onSuccessCallBack();
    },
    onError: (err) => {
      swal.swalError("Error", err.message).then((res) => {
        if (res.isConfirmed) {
          onErrorCallBack();
        }
      });
    },
  });
};

//create
const create = (payload) => {
  return axios
    .post(`${apiUrl}`, payload)
    .then((res) => {
      if (res.data.isSuccess) {
        return res.data.data;
      } else {
        throw Error(res.data.message);
      }
    })
    .catch((err) => {
      throw err;
    });
};

export const useCreate = (
  payload,
  onSuccessCallBack = () => { },
  onErrorCallBack = () => { }
) => {
  const queryClient = useQueryClient();

  return useMutation((payload) => create(payload), {
    onSuccess: (data) => {
      queryClient.refetchQueries([paginatedQueryName]);
      queryClient.refetchQueries([allQueryName]);
      onSuccessCallBack();
    },
    onError: (error) => {
      swal.swalError("Error", error.message).then((res) => {
        if (res.isConfirmed) {
          onErrorCallBack();
        }
      });
    },
  });
};

//update
const update = (payload) => {
  return axios
    .post(`${apiUrl}/${payload.id}`, payload)
    .then((res) => {
      if (res.data.isSuccess) {
        return res.data.data;
      } else {
        throw Error(res.data.message);
      }
    })
    .catch((err) => {
      throw err;
    });
};

export const useUpdate = (
  payload,
  onSuccessCallBack = () => { },
  onErrorCallBack = () => { }
) => {
  const queryClient = useQueryClient();

  return useMutation((payload) => update(payload), {
    onSuccess: (data) => {
      queryClient.refetchQueries([paginatedQueryName]);
      onSuccessCallBack();
    },
    onError: (error) => {
      swal.swalError("Error", error.message).then((res) => {
        if (res.isConfirmed) {
          onErrorCallBack();
        }
      });
    },
  });
};

//delete
const deleteById = (id) => {
  return axios
    .post(`${apiUrl}/${id}/resigned`)
    .then((res) => {
      if (res.data.isSuccess) {
        return res.data.data;
      } else {
        throw Error(res.data.message);
      }
    })
    .catch((err) => {
      throw err;
    });
};

export const useDeleteById = (
  payload,
  onSuccessCallBack = () => { },
  onErrorCallBack = () => { }
) => {
  const queryClient = useQueryClient();

  return useMutation((payload) => deleteById(payload), {
    onSuccess: (data) => {
      queryClient.refetchQueries([paginatedQueryName]);
      onSuccessCallBack();
    },
    onError: (error) => {
      swal.swalError("Error", error.message).then((res) => {
        if (res.isConfirmed) {
          onErrorCallBack();
        }
      });
    },
  });
};

// //reorder
// const reOrder = (payload) => {
//   return axios
//     .post(`${apiUrl}/reOrder`, payload)
//     .then((res) => {
//       if (res.data.isSuccess) {
//         return res.data.data;
//       } else {
//         throw Error(res.data.message);
//       }
//     })
//     .catch((err) => {
//       throw err;
//     });
// };

// export const useReOrder = (
//   payload,
//   onSuccessCallBack = () => {},
//   onErrorCallBack = () => {}
// ) => {
//   const queryClient = useQueryClient();

//   return useMutation((payload) => reOrder(payload), {
//     onSuccess: (data) => {
//       queryClient.refetchQueries([paginatedQueryName]);
//       onSuccessCallBack();
//     },
//     onError: (error) => {
//       swal.swalError("Error", error.message).then((res) => {
//         if (res.isConfirmed) {
//           onErrorCallBack();
//         }
//       });
//     },
//   });
// };
