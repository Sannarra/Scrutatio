import {
    DataGrid,
    GridToolbar,
    GridFooterContainer,
    GridFooter,
} from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

function CustomFooter() {
    return (
        <GridFooterContainer>
            <Button
                variant="contained"
                sx={{
                    backgroundColor: "var(--accent)",
                    color: "black",
                    borderRadius: 50,
                }}
                href="/create-post"
            >
                Create
                <AddIcon />
            </Button>
            <GridFooter />
        </GridFooterContainer>
    );
}

export default function PostsGrid(props) {
    const [pageSize, setPageSize] = useState(5);
    const [rows, setRows] = useState([]);

    useEffect(() => {
        fetch("/api/posts")
            .then((res) => res.json())
            .then((data) => setRows(data));
    }, []);

    const columns = [
        {
            field: "delete",
            headerName: "Delete",
            renderCell: (row) => {
                return (
                    <IconButton
                        aria-label="save"
                        onClick={(event) => {
                            fetch("/api/posts/" + row.id, {
                                method: "DELETE",
                                headers: {
                                    "Content-type": "application/json",
                                },
                            }).then((res) => {
                                window.location.reload();
                            });
                        }}
                    >
                        <DeleteIcon />
                    </IconButton>
                );
            },
            sortable: false,
            width: 70,
        },
        {
            field: "edit",
            headerName: "Edit",
            renderCell: (row) => {
                return (
                    <IconButton aria-label="save" href={`/edit-post/${row.id}`}>
                        <EditIcon />
                    </IconButton>
                );
            },
            sortable: false,
            width: 0,
        },
        { field: "id", headerName: "ID", width: 50 },
        { field: "title", headerName: "Title", width: 300 },
        { field: "city", headerName: "City", width: 150 },
        { field: "short_brief", headerName: "Short Brief", hide: true },
        { field: "description", headerName: "Description", hide: true },
        { field: "salary", headerName: "Salary" },
        { field: "working_time", headerName: "Working Time", width: 120 },
        { field: "contract_type", headerName: "Contract Type", width: 120 },
        { field: "icon_src", headerName: "Icon url", hide: true },
        { field: "company_id", headerName: "Company ID" },
        { field: "created_at", headerName: "Creation Date", width: 180 },
        { field: "updated_at", headerName: "Modification Date", width: 180 },
    ];

    return (
        <div>
            <h3>Posts</h3>
            <div style={{ height: "400px" }}>
                <div style={{ display: "flex", height: "100%" }}>
                    <DataGrid
                        style={{ flex: "1" }}
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        disableSelectionOnClick
                        experimentalFeatures={{ newEditingApi: true }}
                        pagination
                        pageSize={pageSize}
                        disableColumnMenu
                        onPageSizeChange={(newPageSize) =>
                            setPageSize(newPageSize)
                        }
                        rowsPerPageOptions={[5, 10, 25, 50, 100]}
                        components={{
                            Toolbar: GridToolbar,
                            Footer: CustomFooter,
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
