import React from 'react'
import { Grid,  } from '@mui/material';
import TextView from '../Atoms/TextView/TextView';

type Props = {}

const MarketSegment = (props: Props) => {
  return (

    <Grid  bgcolor="background.secondary" container alignItems={"center"} p={1}>
     
      <Grid item md={1.5}>
        <TextView component={"p"} >BTC-PERP</TextView>
        <TextView component={"p"}>Bitcoin</TextView>
      </Grid>
      <Grid item md={1.5}>
        <TextView component={"p"}>61,077</TextView>

      </Grid>
      <Grid item xs={6} md={1.5}>
        <TextView component={"p"}>24h Change
        </TextView>
        <TextView component={"p"} color="error">-1.17% / -724</TextView>
      </Grid>
      <Grid item xs={6} md={1.2}>
        <TextView component={"p"}>Mark</TextView>
        <TextView component={"p"}>61,077</TextView>
      </Grid>
      <Grid item xs={6} md={1.2}>
        <TextView component={"p"}>Index</TextView>
        <TextView component={"p"}>61,084</TextView>
      </Grid>
      <Grid item xs={6} md={1.5}>
        <TextView component={"p"}>24h Volume</TextView>
        <TextView component={"p"}>223,332,541</TextView>
      </Grid>
      <Grid item xs={6} md={2}>
        <TextView component={"p"}>Pred. Funding Rate</TextView>
        <TextView component={"p"} color="warning">-0.0033% in 03:44:29</TextView>
      </Grid>
      <Grid item xs={6} md={1.5}>
        <TextView component={"p"}>Open Interest</TextView>
        <TextView component={"p"} >229.14487 BTC</TextView>
      </Grid>
    </Grid>

  )
}

export default MarketSegment