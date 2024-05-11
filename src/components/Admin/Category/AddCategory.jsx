import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  Input,
  Select,
  MenuItem,
  InputLabel,
  FormGroup,
  Grid,
  TextField,
  NativeSelect,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import AbcIcon from "@mui/icons-material/Abc";
import PercentOutlinedIcon from "@mui/icons-material/PercentOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
const AddCategory = ({ setDisplayAddCategory }) => {
  const [currentSetCategory, setCurrentSetCategory] = useState({
    id: "",
    name: "",
    description: "",
  });

  

  return (
    <Box sx={style.coverer}>
      <Box sx={style.addUserModal}>
        <Box style={{ display: "flex", justifyContent: "flex-end" }}>
          <IconButton >
            <CancelOutlinedIcon color="error" />
          </IconButton>
        </Box>
        <form>
          <Grid sx={style.form} container rowSpacing={2} columnSpacing={2}>
            <Grid item xs={12} sm={12} md={12} sx={style.inputContainer}>
              <FormControl fullWidth={true}>
                <FormLabel sx={style.formLabel}>
                  <CategoryOutlinedIcon sx={style.formLabel.formLabelIcon} />
                  <Box>Tên danh mục</Box>
                </FormLabel>
                <TextField
                  fullWidth={true}
                  variant="outlined"
                  value={currentSetCategory.name}
                />
                <FormHelperText></FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={12} sx={style.inputContainer}>
              <FormControl fullWidth={true}>
                <FormLabel sx={style.formLabel}>
                  <AbcIcon sx={style.formLabel.formLabelIcon} />
                  <Box>Mô tả danh mục</Box>
                </FormLabel>
                <TextField
                  fullWidth={true}
                  variant="outlined"
                  value={currentSetCategory.description}
                />
                <FormHelperText></FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
        </form>
        <Box style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button variant="contained" color="success" >
            Save
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
/** @type {import("@mui/material").SxProps} */
const style = {
  coverer: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    zIndex: 1111,
    background: "rgba(0, 0, 0, 0.5)",
  },
  addUserModal: {
    backgroundColor: "white",
    width: "50%",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    boxShadow: 5,
    padding: "10px",
    maxHeight: "70%",
    overflowY: "auto",
  },
  form: {
    padding: 4,
  },
  inputsContainer: {
    display: "flex",
    width: "100%",
    justifyContent: "space-evenly",
  },
  inputContainer: {
    display: "flex",
    alignItems: "end",
  },
  select: {
    // marginTop:"8px"
  },
  formLabel: {
    display: "flex",
    alignItems: "center",
    marginBottom: "8px",
    formLabelIcon: {
      marginRight: "5px",
      marginBottom: "5px",
    },
  },
};
export default AddCategory;
