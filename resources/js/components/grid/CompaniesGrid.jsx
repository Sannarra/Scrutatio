import DBGrid from "./DBGrid.jsx";

export default function CompaniesGrid(props) {
    return (
        <>
            {DBGrid({
                table_name: "Companies",
                crud: {
                    read: "/api/companies",
                    delete: "/api/companies",
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
