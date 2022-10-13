import DBGrid from "./DBGrid.jsx";

export default function AccountsGrid(props) {
    return (
        <>
            {DBGrid({
                table_name: "Accounts",
                crud: {
                    api: "/api/accounts",
                },
                columns: [
                    {
                        field: "email",
                        headerName: "Email",
                        width: 250,
                        editable: true,
                    },
                    {
                        field: "is_admin",
                        headerName: "Admin",
                        width: 250,
                        editable: true,
                        type: "boolean",
                    },
                ],
            })}
        </>
    );
}
