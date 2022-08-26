import React from 'react'
import Grid from '@material-ui/core/Grid'
import Checkout from '../components/Checkout'
import Delivery from '../components/Delivery'
function CheckoutPage() {
  return (
    <Grid container spacing={5} direction="row" justifyContent="flex-start" alignItems="flex-start">
      <Grid item xs={12} md={5} lg={5}>
        <Checkout></Checkout>
      </Grid>
      <Grid item xs={12} md={7} lg={7}>
        <Delivery></Delivery>
      </Grid>
    </Grid>
  )
}

export default CheckoutPage