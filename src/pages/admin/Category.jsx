import { Box, Button, IconButton, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import AddCategory from '../../components/Admin/Category/AddCategory';
function Category() {
  const columns = [
    {
      field: 'categoryName',
      headerName: 'Tên danh mục',
      minWidth: '150',
      hideable: false

    },
    {
      field: 'categoryCode',
      headerName: "Mã danh mục",
      minWidth: '150'
    },
    {
      field: 'categoryDescription',
      headerName: "Mô tả danh mục",
      minWidth: '500'
    },
    {
      field: 'categoryItemTotal',
      headerName: "Số sản phẩm",
      minWidth: '300'
    },
    {
      field: 'action',
      headerName: 'Tác vụ',
      minWidth: '150',
      sortable: false,
      headerAlign: 'center',
      renderCell: (params) => {
        return <Box >
          <IconButton size="medium" sx={{ m: 1 }} onClick={() => { handleOpenDisplayAddCategory(params.row.id)}} >
            <ModeEditIcon />
          </IconButton>
          <IconButton size="medium" sx={{ m: 1 }}
            onClick={()=>handleDeleteCategory(params.row.id)}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      }
    }

  ]
  const categoryRows = [2, 2].map((category) => {
    return {
      id: category.id,
      categoryName: category.name,
      categoryCode: category.code,
      categoryDescription: category.description,
      categoryItemTotal: category.items.length // lỗi
    };
  });
  const [displayAddCategory, setDisplayAddCategory] = useState(false)
  const handleOpenDisplayAddCategory = (id) => {
    setDisplayAddCategory(true);
  };
  const handleDeleteCategory =(id)=>{
  }
  return (
    <div>
      <Box>
        <Typography sx={style.pageTitle} variant='h5'>Quản lý danh mục</Typography>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Box>
            <Button variant='contained' onClick={() => { handleOpenDisplayAddCategory(-1) }}>
              <AddBoxOutlinedIcon fontSize='small' />
              <Box ml={1}>Thêm danh mục</Box>
            </Button>
          </Box>
          <DataGrid
            sx={{ boxShadow: 2, mt: 2 }}
            columns={columns}
            rows={categoryRows}
            slots={{
              toolbar: GridToolbar,
            }}
          ></DataGrid>
        </Box>
      </Box>
      {displayAddCategory && <AddCategory setDisplayAddCategory={setDisplayAddCategory} />}
    </div>
  )
}
/** @type {import("@mui/material").SxProps} */
const style = {
  pageTitle: {
    mb: 2
  }
}
export default Category