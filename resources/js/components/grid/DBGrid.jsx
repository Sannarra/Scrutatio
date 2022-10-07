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

export default function PostsGrid(props) {
    const [pageSize, setPageSize] = useState(5);
    const [rows, setRows] = useState([]);

    useEffect(() => {
        fetch(props.crud.read)
            .then((res) => res.json())
            .then((data) => setRows(data));
    }, []);

    function CustomFooter() {
        return (
            <GridFooterContainer>
                {props.crud.create ? (
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: "var(--accent)",
                            color: "black",
                            borderRadius: 50,
                        }}
                        href={props.crud.create}
                    >
                        Create
                        <AddIcon />
                    </Button>
                ) : (
                    <div>Create not available</div>
                )}
                <GridFooter />
            </GridFooterContainer>
        );
    }

    const crud_columns = () => {
        let columns = [];

        if (props.crud.delete)
            columns.push({
                field: "delete",
                headerName: "Delete",
                renderCell: (row) => {
                    return (
                        <IconButton
                            aria-label="save"
                            onClick={(event) => {
                                fetch(`${props.crud.delete}/${row.id}`, {
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
            });
        if (props.crud.update)
            columns.push({
                field: "edit",
                headerName: "Edit",
                renderCell: (row) => {
                    return (
                        <IconButton
                            aria-label="save"
                            href={`${props.crud.update}/${row.id}`}
                        >
                            <EditIcon />
                        </IconButton>
                    );
                },
                sortable: false,
                width: 0,
            });
        columns.push({ field: "id", headerName: "ID", width: 50 });
        return columns;
    };

    const columns = crud_columns()
        .concat(props.columns)
        .concat([
            { field: "created_at", headerName: "Creation Date", width: 180 },
            {
                field: "updated_at",
                headerName: "Modification Date",
                width: 180,
            },
        ]);

    return (
        <div>
            <h3>{props.table_name}</h3>
            <div style={{ height: "450px" }}>
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
