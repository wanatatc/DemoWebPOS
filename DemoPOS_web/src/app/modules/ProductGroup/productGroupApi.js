import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";
import * as swal from "../_common/components/SweetAlert";
import * as CONST from "../../../Constant";
import { encodeURLWithParams } from "../_common/functions/commonFunctions";
var flatten = require("flat");
const apiUrl = `${CONST.API_URL}/ProductGroup`;

const allQueryName = "ProductGroups";
const byIdQueryName = "ProductGroup";
const paginatedQueryName = "ProductGroupsPaginated";
const productQueryName = "ProductGroupsProduct";

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
  onSuccessCallBack = () => {},
  onErrorCallBack = () => {}
) => {
  return useQuery([allQueryName], () => getAll(), {
    onSuccess: (data) => {
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
  searchEnable,
  onSuccessCallBack = () => {},
  onErrorCallBack = () => {}
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
      enabled: searchEnable,
    }
  );
};

const create = (payload) => {
  return axios
    .post(apiUrl, payload)
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
  onSuccessCallBack = () => {},
  onErrorCallBack = () => {}
) => {
  const queryClient = useQueryClient();

  return useMutation((payload) => create(payload), {
    onSuccess: (data) => {
      //queryClient.refetchQueries([paginatedQueryName]);
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

const update = (id, payload) => {
  return axios
    .post(apiUrl + `/${id}`, payload)
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
  id,
  onSuccessCallBack = () => {},
  onErrorCallBack = () => {}
) => {
  const queryClient = useQueryClient();

  return useMutation((payload) => update(id, payload), {
    onSuccess: (data) => {
      queryClient.refetchQueries([paginatedQueryName]);
      queryClient.refetchQueries([byIdQueryName, id]);
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

const getById = (id) => {
  return axios
    .get(apiUrl + `/${id}`)
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

export const useGet = (
  id,
  onSuccessCallBack = () => {},
  onErrorCallBack = () => {}
) => {
  return useQuery([byIdQueryName, id], () => getById(id), {
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
const getProducts = (id, paginate, searchValues) => {
  let payload = { ...paginate, ...searchValues };
  let url = encodeURLWithParams(`${apiUrl}/${id}/Products`, payload);
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

export const useGetProducts = (
  id,
  paginate,
  searchValues,
  onSuccessCallBack = () => {},
  onErrorCallBack = () => {}
) => {
  return useQuery(
    [productQueryName, id, paginate, searchValues],
    () => getProducts(id, paginate, searchValues),
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

const deleteById = (id) => {
  return axios
    .post(apiUrl + `/${id}/Delete`)
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

export const useDelete = (
  onSuccessCallBack = () => {},
  onErrorCallBack = () => {}
) => {
  let queryClient = useQueryClient();

  return useMutation((id) => deleteById(id), {
    onSuccess: (data) => {
      queryClient.refetchQueries([allQueryName]);
      queryClient.refetchQueries([byIdQueryName, data.id]);
      queryClient.refetchQueries([paginatedQueryName]);
      queryClient.refetchQueries([productQueryName, data.id]);
      onSuccessCallBack();
    },
    onError: (error) => {
      swal.swalError("Error", error.message).then((response) => {
        if (response.isConfirmed) {
          onErrorCallBack();
        }
      });
    },
  });
};
