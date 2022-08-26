/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-imports */

import React from "react";
import { Grid, Typography, Tooltip } from "@material-ui/core";
import TimeAgo from "react-timeago";
import thaiStrings from "react-timeago/lib/language-strings/th";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";
import PropTypes from "prop-types";

require("dayjs/locale/th");
var dayjs = require("dayjs");
dayjs.locale("th");

function ColumnDateTime(props) {
  const formatter = buildFormatter(thaiStrings);
  return (
    <Grid
      style={{ padding: 0, margin: 0 }}
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
    >
      {props.value && (
        <React.Fragment>
          {props.agoTooltip && (
            <Tooltip
              title={
                <React.Fragment>
                  <TimeAgo date={props.value} formatter={formatter} />
                </React.Fragment>
              }
              arrow
            >
              <Typography>
                {dayjs(props.value).local().format(props.format)}
              </Typography>
            </Tooltip>
          )}
          {!props.agoTooltip && (
            <Typography>
              {dayjs(props.value).local().format(props.format)}
            </Typography>
          )}
        </React.Fragment>
      )}
      {!props.value && <Typography>{props.nullValueText}</Typography>}
    </Grid>
  );
}

ColumnDateTime.propTypes = {
  value: PropTypes.string,
  format: PropTypes.string,
  nullValueText: PropTypes.string,
  agoTooltip: PropTypes.bool,
};

ColumnDateTime.defaultProps = {
  value: null,
  format: "DD/MM/YYYY HH:mm:ss",
  nullValueText: "",
  agoTooltip: true,
};

export default ColumnDateTime;
