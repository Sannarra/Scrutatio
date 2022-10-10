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
                    { field: "name", headerName: "Name", width: 250 },
                    {
                        field: "creation_date",
                        headerName: "Creation Date",
                        width: 150,
                    },
                    {
                        field: "size",
                        headerName: "Company Workforce",
                        width: 150,
                    },
                    {
                        field: "headquarter",
                        headerName: "Heaquarter location",
                        width: 170,
                    },
                    { field: "website", headerName: "Website", width: 250 },
                    { field: "account_id", headerName: "Account Id" },
                ],
            })}
        </>
    );
}
