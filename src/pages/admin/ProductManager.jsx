import { Box, Button, IconButton, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import AddProduct from "../../components/Admin/Product/AddProduct";
import { useQuery } from "@tanstack/react-query";
import config from "../../constants/config";
import axios from "axios";
const ProductManager = () => {
  const [displayAddProduct, setDisplayAddProduct] = useState(false);
  // const [data: productData] = useQuery({
  //   queryKey: ["products"],
  //   queryFn: () => axios.get(`${config.BASEURL}`),
  // });
  // console.log(productData);
  const columns = [
    {
      field: "productName",
      headerName: "Tên sản phẩm",
      minWidth: "300",
      hideable: false,
    },
    {
      field: "category",
      headerName: "Danh mục",
      minWidth: "150",
    },
    {
      field: "branch",
      headerName: "Hãng sản xuất",
      minWidth: "200",
    },
    {
      field: "price",
      headerName: "Giá bán",
      minWidth: "150",
    },
    {
      field: "status",
      headerName: "Tình trạng",
      minWidth: "100",
    },
    {
      field: "description",
      headerName: "Mô tả sản phẩm",
      minWidth: "350",
    },
    {
      field: "action",
      headerName: "Tác vụ",
      minWidth: "150",
      sortable: false,
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <Box>
            <IconButton
              size="medium"
              sx={{ m: 1 }}
              onClick={() => {
                setDisplayAddProduct(true);
              }}
            >
              <ModeEditIcon />
            </IconButton>
            <IconButton size="medium" sx={{ m: 1 }}>
              <DeleteIcon />
            </IconButton>
          </Box>
        );
      },
    },
  ];
  const rows = [
    {
      id: 1,
      productName: "Laptop MSI M112 16GB",
      description: "Lâplsndojasndonasudnasuduasbduibasiudbasuibduisa",
      category: "Laptop",
      branch: "MSI",
      price: "20000000",
      status: "Còn hàng",
    },
    {
      id: 2,
      productName: "Iphone 14 Promax 256G",
      description: "Lâplsndojasndonasudnasuduasbduibasiudbasuibduisa",
      category: "Điện thoại",
      branch: "Apple",
      price: "30000000",
      status: "Còn hàng",
    },
  ];
  return (
    <div>
      <Box>
        <Typography sx={style.pageTitle} variant="h5">
          Quản lý sản phẩm
        </Typography>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Box>
            <Button
              variant="contained"
              onClick={() => {
                setDisplayAddProduct(true);
              }}
            >
              <AddBoxOutlinedIcon fontSize="small" />
              <Box ml={1}>Thêm sản phẩm</Box>
            </Button>
          </Box>
          <DataGrid
            sx={{ boxShadow: 2, mt: 2 }}
            columns={columns}
            rows={rows}
            slots={{
              toolbar: GridToolbar,
            }}
          ></DataGrid>
        </Box>
      </Box>
      {displayAddProduct && (
        <AddProduct setDisplayAddProduct={setDisplayAddProduct} />
      )}
    </div>
  );
};
/** @type {import("@mui/material").SxProps} */
const style = {
  pageTitle: {
    mb: 2,
  },
};
export default ProductManager;
