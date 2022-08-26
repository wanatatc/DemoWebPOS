/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import PropTypes from 'prop-types'
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { Helmet } from "react-helmet";
import * as CONST from "../../Constant";
import * as layoutRedux from '../layout/_redux/layoutRedux'
import {useDispatch} from 'react-redux'

function PrivateRoute({ component: Component, permissions,title, ...rest }) {
  const authReducer = useSelector(({ auth }) => auth);
  const dispatch = useDispatch()
  React.useEffect(() => {
    dispatch(layoutRedux.actions.updateTitle(title))
  }, [title])
  return (
    <Route
      {...rest}
      render={(props) => {
        if (permissions.length > 0) {
          // check if route is restricted by role
          let intersection = permissions.filter((x) => authReducer.permissions.includes(x));
          if (intersection.length === 0) {
            // role not authorised so redirect to home page
            return <Redirect to={{ pathname: "/errorUnAuthorized" }} />;
          }
        }

        // authorised so return component
        return (
          <React.Fragment>
            <Helmet>
              <title>
                {title} - {CONST.APP_INFO.name}
              </title>
            </Helmet>
            <Component {...props} />
          </React.Fragment>
        );
      }}
    />
  );
}

PrivateRoute.propTypes = {
  title: PropTypes.string,
  permissions: PropTypes.array
};

// Same approach for defaultProps too
PrivateRoute.defaultProps = {
  title: '',
  permissions:[]
};


export default PrivateRoute;
