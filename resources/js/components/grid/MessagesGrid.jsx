import DBGrid from "./DBGrid.jsx";

export default function MessagesGrid(props) {
    return (
        <>
            {DBGrid({
                table_name: "Messages",
                crud: {
                    api: "/api/messages",
                },
                columns: [
                    {
                        field: "application_id",
                        headerName: "Application Id",
                        editable: true,
                        width: 110,
                    },
                    {
                        field: "sender_account_id",
                        headerName: "Sender Account ID",
                        editable: true,
                        width: 140,
                    },
                    {
                        field: "content",
                        headerName: "Message content",
                        editable: true,
                        width: 150,
                    },
                ],
            })}
        </>
    );
}
