import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  textOverflow: {
    display: "inline-block",
    textOverflow: "ellipsis",
    width: "100%",
    overflow: "hidden",
    whiteSpace: "nowrap",
    lineHeight: "0.7rem",
  },
}));

const ProductListItem = ({ productDetail, openHandler }) => {
  const classes = useStyles();

  return (
    <Card style={{ width: 200, height: 180, margin: 4 }}>
      <CardActionArea
        title={productDetail.productName}
        onClick={() => openHandler(productDetail.productId)}
      >
        <CardMedia
          className={classes.media}
          title="Paella dish"
          image={productDetail.thumbnail}
        />
        <CardContent>
          <span className={classes.textOverflow}>
            {productDetail.productName}
          </span>
          {productDetail.price}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProductListItem;
