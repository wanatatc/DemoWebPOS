import React from "react";
import { Tooltip, Switch } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import * as layoutRedux from "../_redux/layoutRedux";

function ToggleMenuSwitch() {
  const dispatch = useDispatch();
  const layoutReducer = useSelector(({ layout }) => layout);
  const handleChange = () => {
    dispatch(layoutRedux.actions.updateToggleMenu(!layoutReducer.toggleMenu));
  };

  return (
    <div style={{ marginRight: 10 }}>
      <Tooltip title="เปิด/ปิด เมนู">
        <Switch
          checked={layoutReducer.toggleMenu}
          onChange={handleChange}
          size="small"
          color="primary"
          name="checkedA"
        />
      </Tooltip>
    </div>
  );
}

export default ToggleMenuSwitch;
