import React from "react";
import { Typography } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import { useWindowSize } from 'react-use';

function Home() {
  const { width, height } = useWindowSize();
  return (
    <div>
      <Typography>
        Home sweet Home <Icon>home</Icon>
      </Typography>
      <div>width: {width}</div>
      <div>height: {height}</div>
    </div>
  );
}

export default Home;
