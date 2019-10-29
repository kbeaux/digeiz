import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  root: {
    width: "100%",
    overflowX: "auto"
  },
  table: {
    minWidth: 650
  }
});

function createData(id, distance, time, speed, stops) {
  return { id, distance, time, speed, stops };
}

function Tab({data}) {
  const classes = useStyles();

  const rows = [];
  console.log(data)
  data.forEach(e => {
    rows.push(createData(e.label, e.distance, e.travelTime, e.speed, e.data.length))
  });

  return (
    <Paper className={classes.root}>
      <Table className={classes.table} size="small" aria-label="table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell align="right">Distance</TableCell>
            <TableCell align="right">Time</TableCell>
            <TableCell align="right">Speed</TableCell>
            <TableCell align="right">Stops</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.distance}</TableCell>
              <TableCell align="right">{row.time}</TableCell>
              <TableCell align="right">{row.speed}</TableCell>
              <TableCell align="right">{row.stops}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default Tab;
