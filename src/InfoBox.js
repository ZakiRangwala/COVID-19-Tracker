import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
function InfoBox({ title, cases, total }) {
  return (
    <Card classNme="infoBox">
      <CardContent>
        {/* Title */}
        <Typography className="infoBox__title" color="textSecondary">
          {title}
        </Typography>
        {/* Number of cases */}
        <h2 className="infoBox__cases">{cases}</h2>
        {/* Total amount */}
        <Typography className="infoBox__total" color="textSecondary">
          {total} Total Cases
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
