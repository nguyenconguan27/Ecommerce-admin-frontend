import { Box, Button, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import AddProduct from "../../components/Admin/Product/AddProduct";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import config from "../../constants/config";
import axios from "axios";
import { toast } from "react-toastify";
const ProductManager = () => {
  const [displayAddProduct, setDisplayAddProduct] = useState(false);
  const [productDetail, setProductDetail] = useState(null);
  const { data: productData } = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      axios.get(`${config.BASEURL}/product/get_all`, {
        params: { page_size: 100 },
      }),
  });
  const deleteProductMutation = useMutation({
    mutationFn: (id) =>
      axios.delete(config.BASEURL + `/product/delete?id=${id}`),
    onSuccess: () => {
      toast.success("Xoá sản phẩm thành công", {
        autoClose: 1000,
      });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
  const queryClient = useQueryClient();
  const columns = [
    {
      field: "title",
      headerName: "Tên sản phẩm",
      minWidth: "300",
      hideable: false,
    },
    {
      field: "categoryName",
      headerName: "Danh mục",
      minWidth: "150",
      valueGetter: (_, row) => row.category.name,
    },
    {
      field: "sold",
      headerName: "Đã bán",
      minWidth: "150",
    },
    {
      field: "prePrice",
      headerName: "Giá cũ",
      minWidth: "150",
    },
    {
      field: "expense",
      headerName: "Chi phí",
      minWidth: "150",
    },
    {
      field: "price",
      headerName: "Giá hiện tại",
      minWidth: "150",
    },
    // {
    //   field: "des",
    //   headerName: "Mô tả sản phẩm",
    //   minWidth: "350",
    // },
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
                console.log(params.row);
                setProductDetail(params.row);
              }}
            >
              <ModeEditIcon />
            </IconButton>
            <IconButton
              size="medium"
              sx={{ m: 1 }}
              onClick={() => {
                deleteProductMutation.mutate(params.row.id);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        );
      },
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
                setProductDetail(null);
              }}
            >
              <AddBoxOutlinedIcon fontSize="small" />
              <Box ml={1}>Thêm sản phẩm</Box>
            </Button>
          </Box>
          <DataGrid
            sx={{ boxShadow: 2, mt: 2 }}
            columns={columns}
            rows={productData?.data.data.productList || []}
            slots={{
              toolbar: GridToolbar,
            }}
            initialState={{
              pagination: { paginationModel: { pageSize: 10 } },
            }}
          ></DataGrid>
        </Box>
      </Box>
      {displayAddProduct && (
        <AddProduct
          setDisplayAddProduct={setDisplayAddProduct}
          product={productDetail}
        />
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
