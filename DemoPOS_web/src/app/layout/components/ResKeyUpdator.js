import React from 'react'
import { useWindowSize } from "react-use";
import * as layoutRedux from "../_redux/layoutRedux";
import { useSelector, useDispatch } from "react-redux";


function ResKeyUpdator() {
    const { width } = useWindowSize();  
    const layoutReducer = useSelector(({ layout }) => layout);
    const dispatch = useDispatch();

    React.useEffect(() => {
        let currentResKey = layoutReducer.responsiveKey
        switch (true) {
          case width < 600:
            if (currentResKey !== 'xs') {
              dispatch(layoutRedux.actions.updateResponsiveKey('xs'))
            }
            break;
          case width < 960:
            if (currentResKey !== 'sm') {
              dispatch(layoutRedux.actions.updateResponsiveKey('sm'))
            }
            break;
          case width < 1280:
            if (currentResKey !== 'md') {
              dispatch(layoutRedux.actions.updateResponsiveKey('md'))
            }
            break;
          case width < 1980:
            if (currentResKey !== 'lg') {
              dispatch(layoutRedux.actions.updateResponsiveKey('lg'))
            }
            break;
          default:
            if (currentResKey !== 'xl') {
              dispatch(layoutRedux.actions.updateResponsiveKey('xl'))
            }
            break;
        }
      }, [width]);

  return (
    <React.Fragment></React.Fragment>
  )
}

export default ResKeyUpdator