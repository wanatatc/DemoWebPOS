import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";
import * as swal from '../_common/components/SweetAlert';
import * as CONST from "../../../Constant";
import { encodeURLWithParams } from '../_common/functions/commonFunctions'
var flatten = require("flat");
const apiUrl = `${CONST.API_URL}/Product`;
const singleQueryName = "productById";
const allQueryName = "Products";
const paginatedQueryName = "ProductPaginate";

//get all
export const getAll = () => {
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
  let payload = { ...paginate, ...searchValues };
  let url = encodeURLWithParams(apiUrl, payload);
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
      enabled: searchValues.execute,
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

const create = (payload) => {
  let createFormData = new FormData();
  
  createFormData.append("productGroupId", payload.productGroupId);
  createFormData.append("productName", payload.productName);
  createFormData.append("price", payload.price);
  createFormData.append("expiryDate", payload.expiryDate);
  createFormData.append("thumbnail", payload.thumbnail);

  return axios
    .post(apiUrl, createFormData)
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
}

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
      onSuccessCallBack(data);
    },
    onError: (error) => {
      swal.swalError("Error", error.message).then((res) => {
        if (res.isConfirmed) {
          onErrorCallBack(error);
        }
      });
    },
  });
}

//update
const update = (payload) => {
  let updateFormData = new FormData();
  
  updateFormData.append("productGroupId", payload.productGroupId);
  updateFormData.append("productName", payload.productName);
  updateFormData.append("price", payload.price);
  updateFormData.append("expiryDate", payload.expiryDate);
  updateFormData.append("thumbnail", payload.thumbnail);

  return axios
    .post(`${apiUrl}/${payload.productId}`, updateFormData)
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
  onSuccessCallBack = () => {},
  onErrorCallBack = () => {}
) => {
  const queryClient = useQueryClient();

  return useMutation((payload) => update(payload), {
    onSuccess: (data) => {
      queryClient.refetchQueries([paginatedQueryName]);
      onSuccessCallBack(data);
    },
    onError: (error) => {
      swal.swalError("Error", error.message).then((res) => {
        if (res.isConfirmed) {
          onErrorCallBack(error);
        }
      });
    },
  });
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
  onSuccessCallBack = () => {},
  onErrorCallBack = () => {}
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


//delete
const deleteById = (id) => {
  return axios
    .post(`${apiUrl}/${id}/delete`)
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
  onSuccessCallBack = () => {},
  onErrorCallBack = () => {}
) => {
  const queryClient = useQueryClient();

  return useMutation((payload) => deleteById(payload), {
    onSuccess: (data) => {
      queryClient.refetchQueries([paginatedQueryName]);
      onSuccessCallBack(data);
    },
    onError: (error) => {
      swal.swalError("Error", error.message).then((res) => {
        if (res.isConfirmed) {
          onErrorCallBack(error);
        }
      });
    },
  });
};