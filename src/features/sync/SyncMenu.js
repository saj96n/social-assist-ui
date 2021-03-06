import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button } from "@material-ui/core";
import { Popover } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import { syncRequest } from "./syncSlice";
import { formatDistance } from "date-fns";
import SyncProgress from "./SyncProgress";
import trackEvent from "../../helpers/track";

const useStyles = makeStyles((theme) => ({
  popover: {
    width: theme.spacing(40),
    borderRadius: theme.shape.borderRadius,
  },
  container: {
    display: "flex",
    padding: theme.spacing(2),
    flexDirection: "column",
    alignItems: "center",
  },
  actions: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const SyncMenu = ({ anchorEl, onClose }) => {
  const classes = useStyles();

  const tier = useSelector((state) => state.auth?.me?.tier);
  const followers = useSelector((state) => state.followers);
  const sync = useSelector((state) => state.sync);

  const dispatch = useDispatch();

  useEffect(() => {
    // syncData();
  }, []);

  const onSync = () => {
    trackEvent("sync_menu", "clicked", "sync");
    dispatch(syncRequest());
  };

  return (
    <div>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={onClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        classes={{
          paper: classes.popover,
        }}
      >
        <div className={classes.container}>
          <Typography>
            Data updated:{" "}
            {followers.fetchedAt &&
              formatDistance(new Date(followers.fetchedAt), new Date())}{" "}
            ago
          </Typography>
          {/* <Typography>Status: {sync.statusMessage || sync.error}</Typography> */}
          <SyncProgress
            tier={tier.name}
            fetchedAt={followers.fetchedAt}
            sync={sync}
          />
          <div className={classes.actions}>
            <Button variant="contained" color="primary" onClick={onSync}>
              Sync
            </Button>
          </div>
        </div>
      </Popover>
    </div>
  );
};

export default SyncMenu;
