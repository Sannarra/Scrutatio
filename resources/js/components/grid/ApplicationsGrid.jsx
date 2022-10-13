import DBGrid from "./DBGrid.jsx";

export default function ApplicationsGrid(props) {
    return (
        <>
            {DBGrid({
                table_name: "Applications",
                crud: {
                    api: "/api/applications",
                },
                columns: [
                    {
                        field: "post_id",
                        headerName: "Post ID",
                        editable: true,
                    },
                    {
                        field: "user_id",
                        headerName: "Applicant user id",
                        editable: true,
                        width: 150,
                    },
                ],
            })}
        </>
    );
}
