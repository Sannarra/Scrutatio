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

function EditToolbar(props) {
    const [currentID, setCurrentId] = useState(-1);

    const handleClick = () => {
        const id = currentID;
        setCurrentId(currentID - 1);
        props.setRows((oldRows) => [
            { id, firstname: "", isNew: true },
            ...oldRows,
        ]);
        props.setRowModesModel((oldModel) => ({
            [id]: { mode: GridRowModes.Edit, fieldToFocus: "firstname" },
            ...oldModel,
        }));
    };

    return (
        <GridToolbarContainer>
            <GridToolbar />
            {props.props.crud.create !== false && (
                <Button
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={props.props.crud.create ? undefined : handleClick}
                    href={props.props.crud.create}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Add record
                </Button>
            )}
        </GridToolbarContainer>
    );
}

EditToolbar.propTypes = {
    setRowModesModel: PropTypes.func.isRequired,
    setRows: PropTypes.func.isRequired,
};

export default function PostsGrid(props) {
    const [pageSize, setPageSize] = useState(5);
    const [rows, setRows] = useState([]);
    const [rowModesModel, setRowModesModel] = useState({});

    useEffect(() => {
        fetch(props.crud.read)
            .then((res) => res.json())
            .then((data) => setRows(data));
    }, []);

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

    const handleDeleteClick = (id) => () => {
        fetch(`${props.crud.delete}/${id}`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
            },
        });
        setRows(rows.filter((row) => row.id !== id));
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

    const processRowUpdate = (newRow) => {
        const updatedRow = { ...newRow, isNew: false };
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };

    const crud_columns = () => {
        let columns = [
            {
                field: "actions",
                type: "actions",
                headerName: "Actions",
                width: 100,
                cellClassName: "actions",
                getActions: ({ id }) => {
                    const isInEditMode =
                        rowModesModel[id]?.mode === GridRowModes.Edit;

                    if (isInEditMode) {
                        return [
                            <GridActionsCellItem
                                icon={<SaveIcon />}
                                label="Save"
                                onClick={handleSaveClick(id)}
                            />,
                            <GridActionsCellItem
                                icon={<CancelIcon />}
                                label="Cancel"
                                className="textPrimary"
                                onClick={handleCancelClick(id)}
                                color="inherit"
                            />,
                        ];
                    }

                    return [
                        <GridActionsCellItem
                            icon={<EditIcon />}
                            label="Edit"
                            className="textPrimary"
                            onClick={
                                props.crud.update
                                    ? undefined
                                    : handleEditClick(id)
                            }
                            href={
                                props.crud.update &&
                                `${props.crud.update}/${id}`
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            color="inherit"
                        />,
                        <GridActionsCellItem
                            icon={<DeleteIcon />}
                            label="Delete"
                            onClick={handleDeleteClick(id)}
                            color="inherit"
                        />,
                    ];
                },
            },
        ];
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
                        rowModesModel={rowModesModel}
                        onRowModesModelChange={(newModel) =>
                            setRowModesModel(newModel)
                        }
                        onRowEditStart={handleRowEditStart}
                        onRowEditStop={handleRowEditStop}
                        processRowUpdate={processRowUpdate}
                        components={{
                            Toolbar: EditToolbar,
                        }}
                        componentsProps={{
                            toolbar: { setRows, setRowModesModel, props },
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
