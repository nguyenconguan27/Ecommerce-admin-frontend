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
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import NotesOutlinedIcon from "@mui/icons-material/NotesOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import DragDropImage from "../DragDropImage";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import config from "../../../constants/config";
import { toast } from "react-toastify";
import productApi from "../../../apis/productApis";

const AddProduct = ({ setDisplayAddProduct }) => {
  const [category, setCategory] = useState(0);
  const [sizeList, setSizeList] = useState([]);
  const [currentSize, setCurrentSize] = useState("");
  const [currentQuan, setCurrentQuan] = useState("");
  const [currentSetProduct, setCurrentSetProduct] = useState({});
  const [files, setFiles] = useState([]);
  const { data: categoryList } = useQuery({
    queryKey: ["categories"],
    queryFn: () => axios.get(config.BASEURL + "/categories"),
  });
  const uploadImages = useMutation({
    mutationFn: (data) =>
      axios.post(config.BASEURL + "/file/upload/product", {
        data: data,
        headers: {},
      }),
  });
  const uploadProduct = useMutation({
    mutationFn: (data) => productApi.addProduct(data),
    onSuccess: () => {
      toast.success("Thêm sản phẩm thành công", {
        autoClose: 1000,
      });
    },
  });

  const handleCloseAddProduct = () => {
    setDisplayAddProduct(false);
  };
  const handleChangeSizeList = (e) => {
    if (currentSize !== "" && currentQuan !== "") {
      const newSizeList = [
        ...sizeList,
        { size: currentSize, quantity: Number(currentQuan) },
      ];
      setSizeList(newSizeList);
      handleOnChangeProperties("sizeList", newSizeList);
    }
  };
  const onFilesChange = (images) => {
    setFiles(images);
    console.log(images);
  };
  const handleOnChangeProperties = (field, value) => {
    if (field === "categoryId") {
      setCategory(value);
    }
    console.log(value);
    setCurrentSetProduct((prev) => ({
      ...prev,
      [field]: value,
    }));
    console.log(currentSetProduct);
  };
  const handleChangeCurrentSize = (e) => {
    setCurrentSize(e.target.value);
  };
  const handleChangeCurrentQuan = (e) => {
    setCurrentQuan(e.target.value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    if (files) {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }
      try {
        const imageUrls = await axios.post(
          config.BASEURL + "/file/upload/product",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setCurrentSetProduct((prev) => ({
          ...prev,
          imageList: imageUrls.data.data,
        }));
        const newProduct = {
          ...currentSetProduct,
          imageList: imageUrls.data.data,
        };
        console.log(newProduct);
        const res = await axios.post(
          config.BASEURL + "/product/add",
          newProduct
        );
        toast.success("Thêm sản phẩm thành công", {
          autoClose: 1000,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div>
      <Box sx={style.coverer}>
        <Box sx={style.addUserModal}>
          <Box style={{ display: "flex", justifyContent: "flex-end" }}>
            <IconButton onClick={handleCloseAddProduct}>
              <CancelOutlinedIcon color="error" />
            </IconButton>
          </Box>
          <form onSubmit={onSubmit}>
            <Grid sx={style.form} container rowSpacing={2} columnSpacing={2}>
              {/* Ảnh sản phẩm  */}
              <Grid item xs={12} sm={12} md={12} sx={style.inputContainer}>
                <FormControl fullWidth={true}>
                  <FormLabel sx={style.formLabel}>
                    <ImageOutlinedIcon sx={style.formLabel.formLabelIcon} />
                    <Box>Ảnh sản phẩm</Box>
                  </FormLabel>
                  <DragDropImage onFilesChange={onFilesChange} />
                  <FormHelperText></FormHelperText>
                </FormControl>
              </Grid>
              {/* Tên sản phẩm  */}
              <Grid item xs={12} sm={12} md={12} sx={style.inputContainer}>
                <FormControl fullWidth={true}>
                  <FormLabel sx={style.formLabel}>
                    <Inventory2OutlinedIcon
                      sx={style.formLabel.formLabelIcon}
                    />
                    <Box>Tên sản phẩm</Box>
                  </FormLabel>
                  <TextField
                    fullWidth={true}
                    variant="outlined"
                    onChange={(e) => {
                      handleOnChangeProperties("title", e.target.value);
                    }}
                  />
                  <FormHelperText></FormHelperText>
                </FormControl>
              </Grid>
              {/* Gía bán sản phẩm  */}
              <Grid item xs={12} sm={6} md={3} sx={style.inputContainer}>
                <FormControl fullWidth={true}>
                  <FormLabel sx={style.formLabel}>
                    <PaidOutlinedIcon sx={style.formLabel.formLabelIcon} />
                    <Box>Giá bán (VND)</Box>
                  </FormLabel>
                  <TextField
                    fullWidth={true}
                    variant="outlined"
                    type="number"
                    onChange={(e) => {
                      handleOnChangeProperties("price", Number(e.target.value));
                    }}
                  />
                  <FormHelperText></FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={3} sx={style.inputContainer}>
                <FormControl fullWidth={true}>
                  <FormLabel sx={style.formLabel}>
                    <PaidOutlinedIcon sx={style.formLabel.formLabelIcon} />
                    <Box>Thêm giá gốc(VND)</Box>
                  </FormLabel>
                  <TextField
                    fullWidth={true}
                    variant="outlined"
                    onChange={(e) => {
                      handleOnChangeProperties(
                        "prePrice",
                        Number(e.target.value)
                      );
                    }}
                  />
                  <FormHelperText></FormHelperText>
                </FormControl>
              </Grid>
              {/* chi phí */}
              <Grid item xs={12} sm={6} md={3} sx={style.inputContainer}>
                <FormControl fullWidth={true}>
                  <FormLabel sx={style.formLabel}>
                    <PaidOutlinedIcon sx={style.formLabel.formLabelIcon} />
                    <Box>Chi phí sản xuất(VND)</Box>
                  </FormLabel>
                  <TextField
                    fullWidth={true}
                    type="number"
                    variant="outlined"
                    onChange={(e) => {
                      handleOnChangeProperties(
                        "expense",
                        Number(e.target.value)
                      );
                    }}
                  />
                  <FormHelperText></FormHelperText>
                </FormControl>
              </Grid>
              {/* Danh mục sản phẩm  */}
              <Grid item xs={12} sm={6} md={3} sx={style.inputContainer}>
                <FormControl fullWidth={true}>
                  <FormLabel sx={style.formLabel}>
                    <CategoryOutlinedIcon sx={style.formLabel.formLabelIcon} />
                    <Box>Danh mục</Box>
                  </FormLabel>
                  <Select
                    sx={style.select}
                    value={category}
                    onChange={(e) =>
                      handleOnChangeProperties("categoryId", e.target.value)
                    }
                    name="cateogryId"
                  >
                    {categoryList &&
                      categoryList.data.data.map((element, index) => (
                        <MenuItem value={element.id}>{element.name}</MenuItem>
                      ))}
                  </Select>
                  <FormHelperText></FormHelperText>
                </FormControl>
              </Grid>
              {/* thêm size số */}
              <div className="flex flex-col"></div>
              {sizeList &&
                Array(sizeList.length + 1)
                  .fill(0)
                  .map((element, index) => {
                    return (
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={3}
                        sx={style.inputContainer}
                      >
                        <FormControl fullWidth={true}>
                          {index === 0 && (
                            <FormLabel sx={style.formLabel}>
                              <PaidOutlinedIcon
                                sx={style.formLabel.formLabelIcon}
                              />
                              <Box>Thêm kích cỡ</Box>
                            </FormLabel>
                          )}

                          <div className="grid grid-cols-2 gap-2">
                            <div className="col-span-1">
                              <input
                                onChange={handleChangeCurrentSize}
                                className="max-w-[99%] border border-gray-400 rounded-sm px-2 py-4"
                                placeholder="Tên size"
                              ></input>
                            </div>
                            <div className="col-span-1 flex items-center">
                              <input
                                onChange={handleChangeCurrentQuan}
                                className="max-w-[99%] border border-gray-400 rounded-sm px-2 py-4"
                                type="number"
                                placeholder="Số lượng"
                              ></input>
                              {index === sizeList.length && (
                                <div
                                  className=""
                                  onClick={handleChangeSizeList}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M12 4.5v15m7.5-7.5h-15"
                                    />
                                  </svg>
                                </div>
                              )}
                            </div>
                          </div>
                          <FormHelperText></FormHelperText>
                        </FormControl>
                      </Grid>
                    );
                  })}

              <Grid item xs={12} sm={12} md={12} sx={style.inputContainer}>
                <FormControl fullWidth={true}>
                  <FormLabel sx={style.formLabel}>
                    <NotesOutlinedIcon sx={style.formLabel.formLabelIcon} />
                    <Box>Mô tả sản phẩm</Box>
                  </FormLabel>
                  <TextareaAutosize
                    style={{ border: "1px solid gray" }}
                    minRows={10}
                    maxRows={20}
                    onChange={(e) =>
                      handleOnChangeProperties("des", e.target.value)
                    }
                  />
                  <FormHelperText></FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
            <Box style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button variant="contained" color="success" type="submit">
                Save
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </div>
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
    width: "80%",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    boxShadow: 5,
    padding: "10px",
    maxHeight: "80%",
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
export default AddProduct;
