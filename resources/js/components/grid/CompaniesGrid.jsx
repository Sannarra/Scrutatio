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
                    { field: "name", headerName: "Name" },
                    { field: "creation_date", headerName: "Creation Date" },
                    { field: "size", headerName: "Company Workforce" },
                    { field: "headquarter", headerName: "Heaquarter location" },
                    { field: "website", headerName: "Website" },
                    { field: "account_id", headerName: "Account Id" },
                ],
            })}
        </>
    );
}
