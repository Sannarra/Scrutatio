import DBGrid from "./DBGrid.jsx";

export default function AccountsGrid(props) {
    return (
        <>
            {DBGrid({
                table_name: "Accounts",
                crud: {
                    read: "/api/accounts",
                    delete: "/api/accounts",
                },
                columns: [
                    {
                        field: "email",
                        headerName: "Email",
                        width: 250,
                    },
                ],
            })}
        </>
    );
}
