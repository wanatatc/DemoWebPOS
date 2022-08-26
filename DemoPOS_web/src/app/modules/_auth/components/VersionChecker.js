/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import * as CONST from "../../../../Constant";
import * as swal from "../../_common/components/SweetAlert";

function VersionChecker(props) {


  const checkVersionLoop =
    1000 * 60 * CONST.VERSION_CHECKER.CHECK_VERSION_EVERY_MINUTE;


    const getData = () => {

      if (CONST.VERSION_CHECKER.ENABLE_VERSION_CHECKER) {
        fetch(`${window.location.origin}/config.json`, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
          .then(function (response) {
            return response.json();
          })
          .then(function (configData) {
            // get config
            if (configData.version !== CONST.APP_INFO.version) {
              if (CONST.VERSION_CHECKER.CONFIRM_BEFORE_REFRESH) {
                swal
                  .swalConfirm(
                    "Warning",
                    "your version is out-dated, refresh now?"
                  )
                  .then((res) => {
                    if (res.isConfirmed) {
                      emptyCache();
                    }
                  });
              } else {
                emptyCache();
              }
            }
          })
          .catch((err) => {
            alert("config file not found");
          });
      }
    };



  const emptyCache = () => {
    if ("caches" in window) {
      caches.keys().then((names) => {
        // Delete all the cache files
        names.forEach((name) => {
          caches.delete(name);
        });
      });
      // Makes sure the page reloads. Changes are only visible after you refresh.
      window.location.reload();
    }
  };


  React.useEffect(() => {
    getData();
    const interval = setInterval(() => {
      getData();
    }, checkVersionLoop);

    // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    return () => clearInterval(interval);
  }, []);
  return <React.Fragment>{props.children}</React.Fragment>;
}

export default VersionChecker;
