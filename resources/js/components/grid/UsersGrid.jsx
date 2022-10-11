import DBGrid from "./DBGrid.jsx";

export default function UsersGrid(props) {
    return (
        <>
            {DBGrid({
                table_name: "Users",
                crud: {
                    create: "/register",
                    read: "/api/users",
                    update: "/edit-user",
                    delete: "/api/users",
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
