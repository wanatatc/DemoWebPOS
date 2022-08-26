import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";
import * as CONST from "../../../Constant";
import * as swal from "../_common/components/SweetAlert";
var flatten = require("flat");
const apiUrl = `${CONST.API_URL}/titles`;
const singleQueryName = "titleById";
const allQueryName = "titleList";
const paginatedQueryName = "titlePaginated";

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

// get paginated
const getPaginated = (paginate, searchValues) => {
  // console.log(JSON.stringify(searchValues));
  let payloadToPost = { ...paginate, ...searchValues };
  return axios
    .post(`${apiUrl}/filter`, payloadToPost)
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

//create
const create = (payload) => {
  return axios
    .post(`${apiUrl}/create`, payload)
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
    .post(`${apiUrl}/update`, payload)
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
    .post(`${apiUrl}/delete?id=${id}`)
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

//reorder
const reOrder = (payload) => {
  return axios
    .post(`${apiUrl}/reOrder`, payload)
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

export const useReOrder = (
  payload,
  onSuccessCallBack = () => {},
  onErrorCallBack = () => {}
) => {
  const queryClient = useQueryClient();

  return useMutation((payload) => reOrder(payload), {
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
