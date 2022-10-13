import DBGrid from "./DBGrid.jsx";

export default function CompaniesGrid(props) {
    return (
        <>
            {DBGrid({
                table_name: "Companies",
                crud: {
                    api: "/api/companies",
                    web: {
                        create: (row) => `/register-company`,
                        read: (row) => `/profile/${row.account_id}`,
                        update: (row) => `/edit-profile/${row.account_id}`,
                    },
                },
                columns: [
                    {
                        field: "name",
                        headerName: "Name",
                        width: 250,
                        editable: true,
                    },
                    {
                        field: "creation_date",
                        headerName: "Creation Date",
                        width: 150,
                        editable: true,
                    },
                    {
                        field: "size",
                        headerName: "Company Workforce",
                        width: 150,
                        editable: true,
                    },
                    {
                        field: "headquarter",
                        headerName: "Heaquarter location",
                        width: 170,
                        editable: true,
                    },
                    {
                        field: "description",
                        headerName: "Description",
                        width: 170,
                        editable: true,
                        hide: true,
                    },
                    {
                        field: "website",
                        headerName: "Website",
                        width: 250,
                        editable: true,
                    },
                    {
                        field: "account_id",
                        headerName: "Account Id",
                        editable: true,
                    },
                ],
            })}
        </>
    );
}
