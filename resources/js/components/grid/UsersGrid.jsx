import DBGrid from "./DBGrid.jsx";

export default function UsersGrid(props) {
    return (
        <>
            {DBGrid({
                table_name: "Users",
                crud: {
                    read: "/api/users",
                    delete: "/api/users",
                },
                columns: [
                    { field: "firstname", headerName: "First Name" },
                    { field: "lastname", headerName: "Last Name" },
                    { field: "phone", headerName: "Phone Number", width: 150 },
                    { field: "city", headerName: "City", width: 170 },
                    { field: "account_id", headerName: "Account Id" },
                ],
            })}
        </>
    );
}
