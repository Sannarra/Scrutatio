import {
    DataGrid,
    GridToolbarContainer,
    GridToolbar,
    GridRowModes,
    GridActionsCellItem,
} from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import ConfirmDialog from "../Confirm.jsx";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

function EditToolbar(props) {
    /// Create a new record in the grid when clicking explicit "Add Record" button
    const handleAdd = () => {
        const id = -1;
        let valid = true;
        props.setRows((oldRows) => {
            if (oldRows.find((row) => row.id === -1)) {
                valid = false;
                return [...oldRows];
            }
            return [{ id, isNew: true, ...props.props.default }, ...oldRows];
        });
        if (!valid) return;
        props.setRowModesModel((oldModel) => ({
            [id]: { mode: GridRowModes.Edit },
            ...oldModel,
        }));
    };

    return (
        <GridToolbarContainer>
            <GridToolbar />
            <Button
                color="primary"
                startIcon={<AddIcon />}
                onClick={handleAdd}
                target="_blank"
                rel="noopener noreferrer"
            >
                Add record
            </Button>
        </GridToolbarContainer>
    );
}

EditToolbar.propTypes = {
    setRowModesModel: PropTypes.func.isRequired,
    setRows: PropTypes.func.isRequired,
};

/// Generic database grid with crud operations
export default function DBGrid(props) {
    const [pageSize, setPageSize] = useState(5);
    const [rows, setRows] = useState([]);
    const [rowModesModel, setRowModesModel] = useState({});
    /// If delete confirmation dialog is opened
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [toDeleteID, setToDeleteID] = useState(undefined);
    const [error, setError] = useState("");

    const handleRowEditStart = (params, event) => {
        event.defaultMuiPrevented = true;
    };

    const handleRowEditStop = (params, event) => {
        event.defaultMuiPrevented = true;
    };

    const handleEditClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.Edit },
        });
    };

    const handleSaveClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View },
        });
    };

    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    /// CREATE/UPDATE
    const processRowUpdate = (newRow) => {
        let route = props.crud.api;
        if (!newRow.isNew) route = route + "/" + newRow.id;
        const method = newRow.isNew ? "POST" : "PUT";
        setError("");
        fetch(route, {
            method: method,
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
            },
            body: JSON.stringify(newRow),
        })
            .then((res) =>
                res.json().then((data) => ({ status: res.status, body: data }))
            )
            .then((res) => {
                if (res.status == 400) {
                    /// Failure
                    /// If post fail, it keeps the row on the table as unsaved
                    if (method == "POST")
                        setRows(
                            rows.map((row) =>
                                row.id === newRow.id ? newRow : row
                            )
                        );
                    /// If update fail, it reverts the update
                    else setRows(rows.map((row) => row));

                    setError(res.body.error);
                    /// Set failed new row in edit mode
                    if (method == "POST")
                        setRowModesModel({
                            ...rowModesModel,
                            [newRow.id]: { mode: GridRowModes.Edit },
                        });
                } else {
                    ///Success
                    if (method == "POST")
                        setRows(
                            rows.map((row) => (row.id === -1 ? res.body : row))
                        );
                    else
                        setRows(
                            rows.map((row) =>
                                row.id === res.body.id ? res.body : row
                            )
                        );
                }
            });
        return newRow;
    };

    /// READ
    useEffect(() => {
        fetch(props.crud.api)
            .then((res) => res.json())
            .then((data) => {
                setRows(data);
            });
    }, []);

    /// DELETE
    const handleDeleteClick = (id) => {
        setError("");
        fetch(`${props.crud.api}/${id}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
            },
        }).then((res) => {
            setRows(rows.filter((row) => row.id != id));
        });
    };

    /// Common columns including
    /// Inteface actions: view, edit, create
    /// Inline row actions: edit delete | save cancel (depending on edit mode)
    /// Common infos: id, created_at, updated_at
    const crud_columns = () => {
        let columns = [];

        /// If it has interface actions (in props.crud.web)
        if (
            props.crud.web &&
            (props.crud.web.create ||
                props.crud.web.update ||
                props.crud.web.read)
        ) {
            columns.push({
                field: "webActions",
                type: "actions",
                headerName: "Interface Actions",
                width: 130,
                cellClassName: "actions",
                getActions: ({ row }) => {
                    if (row.id == -1) return [];
                    let actions = [];

                    /// Interface View
                    if (props.crud.web.read)
                        actions.push(
                            <GridActionsCellItem
                                icon={<VisibilityIcon />}
                                label="View"
                                title="View"
                                className="textPrimary"
                                href={props.crud.web.read(row)}
                                target="_blank"
                                rel="noopener noreferrer"
                                color="inherit"
                            />
                        );
                    /// Inteface Edit
                    if (props.crud.web.update)
                        actions.push(
                            <GridActionsCellItem
                                icon={<EditIcon />}
                                label="Edit"
                                title="Edit"
                                className="textPrimary"
                                href={props.crud.web.update(row)}
                                target="_blank"
                                rel="noopener noreferrer"
                                color="inherit"
                            />
                        );
                    ///Interface Create
                    if (props.crud.web.create)
                        actions.push(
                            <GridActionsCellItem
                                icon={<AddCircleOutlineIcon />}
                                label="Create"
                                title="Create"
                                className="textPrimary"
                                href={props.crud.web.create(row)}
                                target="_blank"
                                rel="noopener noreferrer"
                                color="inherit"
                            />
                        );
                    return actions;
                },
            });
        }
        /// Inline row actions
        columns.push({
            field: "actions",
            type: "actions",
            headerName: "Fast Actions",
            width: 100,
            cellClassName: "actions",
            getActions: ({ id }) => {
                const isInEditMode =
                    rowModesModel[id]?.mode === GridRowModes.Edit;

                /// If row is being edited
                if (isInEditMode) {
                    return [
                        /// Save changes
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            title="Save"
                            onClick={handleSaveClick(id)}
                        />,
                        /// cancel changes
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            title="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }

                /// If row is not being edited
                return [
                    /// Edit
                    <GridActionsCellItem
                        icon={<BorderColorIcon />}
                        label="Edit"
                        title="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    /// Delete
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        title="Delete"
                        onClick={() => {
                            setToDeleteID(id);
                            setDeleteOpen(true);
                        }}
                        color="inherit"
                    />,
                ];
            },
        });
        columns.push({
            field: "id",
            headerName: "ID",
            width: 50,
            editable: true,
            type: "number",
        });
        return columns;
    };

    const columns = crud_columns()
        .concat(props.columns)
        .concat([
            {
                field: "created_at",
                headerName: "Creation Date",
                width: 180,
                editable: true,
                type: "dateTime",
            },
            {
                field: "updated_at",
                headerName: "Modification Date",
                width: 180,
                editable: true,
                type: "dateTime",
            },
        ]);

    return (
        <div>
            <h3>{props.table_name}</h3>
            <p style={{ color: "red" }}>{error}</p>
            <div style={{ height: "450px" }}>
                <div style={{ display: "flex", height: "100%" }}>
                    <DataGrid
                        style={{ flex: "1" }}
                        sx={{
                            border: "solid 1px",
                            borderColor: "grey",
                            "& .MuiDataGrid-cell": {
                                border: "0px",
                            },
                            "& .MuiDataGrid-row": {
                                borderTop: "0px",
                                borderBottom: "solid 1px",
                                borderColor: "grey",
                            },
                            "& .actions": {
                                color: "text.secondary",
                            },
                            "& .textPrimary": {
                                color: "text.primary",
                            },
                        }}
                        editMode="row"
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        disableSelectionOnClick
                        experimentalFeatures={{ newEditingApi: true }}
                        pagination
                        pageSize={pageSize}
                        disableColumnMenu
                        onPageSizeChange={(newPageSize) =>
                            setPageSize(newPageSize)
                        }
                        rowsPerPageOptions={[5, 10, 25, 50, 100]}
                        rowModesModel={rowModesModel}
                        onRowModesModelChange={(newModel) =>
                            setRowModesModel(newModel)
                        }
                        onRowEditStart={handleRowEditStart}
                        onRowEditStop={handleRowEditStop}
                        processRowUpdate={processRowUpdate}
                        onProcessRowUpdateError={(error) =>
                            console.error(error)
                        }
                        components={{
                            Toolbar: EditToolbar,
                        }}
                        componentsProps={{
                            toolbar: { setRows, setRowModesModel, props },
                        }}
                    />
                    <ConfirmDialog
                        title="Delete record ?"
                        open={deleteOpen}
                        setOpen={setDeleteOpen}
                        onConfirm={() => handleDeleteClick(toDeleteID)}
                    >
                        Are you sure you want to delete this record?
                    </ConfirmDialog>
                    ,
                </div>
            </div>
        </div>
    );
}
