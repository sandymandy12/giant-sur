import { Button, Modal, makeStyles } from "@material-ui/core";
import { useState } from "react";

import SearchBar from "../Input";
import useSearch from "../../../../../../hooks/useSearch";
import { useKeyPress } from "../../../../../../hooks/useKeyPress";

const InputStyles =
  "bg-white rounded-md shadow-md focus:outline-none focus:shadow-outline-primary text-gray-700 py-2 px-4 block w-full appearance-none leading-normal";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    top: "30%",
    left: "40%",
    justifyContent: "center",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const MyModal = () => {
  const { answer } = useSearch();
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleOpen}>
        <img
          alt="menubar icon"
          className="w-4"
          src="/images/magnifier-icon.png"
        />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={classes.paper}>
          <SearchBar />
          <p id="modal-answer">{answer}</p>
        </div>
      </Modal>
    </>
  );
};

export default MyModal;
