/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import PropTypes from 'prop-types'
import { Route } from "react-router-dom";
import { Content } from "./Content";
import { Helmet } from "react-helmet";
import * as CONST from "../../Constant";
import * as layoutRedux from '../layout/_redux/layoutRedux'
import {useDispatch} from 'react-redux'

export function ContentRoute({ children, component, render, ...props }) {
  const dispatch = useDispatch()
  React.useEffect(() => {
    dispatch(layoutRedux.actions.updateTitle(props.title))
  }, [props.title])
  return (
    <Route {...props}>
      {(routeProps) => {
        if (typeof children === "function") {
          return <Content>{children(routeProps)}</Content>;
        }

        if (!routeProps.match) {
          return null;
        }

        if (children) {
          return <Content>{children}</Content>;
        }

        if (component) {
          return (
            <Content>
              <Helmet>
                <title> {props.title} - {CONST.APP_INFO.name}</title>
              </Helmet>
              {React.createElement(component, routeProps)}
            </Content>
          );
        }

        if (render) {
          return <Content>{render(routeProps)}</Content>;
        }

        return null;
      }}
    </Route>
  );
}

ContentRoute.propTypes = {
  title: PropTypes.string,
};

// Same approach for defaultProps too
ContentRoute.defaultProps = {
  title: '',
};
