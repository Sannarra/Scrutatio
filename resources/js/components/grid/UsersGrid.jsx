import DBGrid from "./DBGrid.jsx";

export default function UsersGrid(props) {
    return (
        <>
            {DBGrid({
                table_name: "Users",
                crud: {
                    api: "/api/users",
                    web: {
                        read: (row) => `/profile/${row.account_id}`,
                        update: (row) => `/edit-profile/${row.account_id}`,
                    },
                },
                columns: [
                    {
                        field: "firstname",
                        headerName: "First Name",
                        editable: true,
                    },
                    {
                        field: "lastname",
                        headerName: "Last Name",
                        editable: true,
                    },
                    {
                        field: "phone",
                        headerName: "Phone Number",
                        editable: true,
                        width: 150,
                    },
                    {
                        field: "city",
                        headerName: "City",
                        editable: true,
                        width: 170,
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
