import DBGrid from "./DBGrid.jsx";

export default function PostsGrid(props) {
    return (
        <>
            {DBGrid({
                table_name: "Posts",
                crud: {
                    create: "/create-post",
                    read: "/api/posts",
                    update: "/edit-post",
                    delete: "/api/posts",
                },
                columns: [
                    { field: "title", headerName: "Title", width: 300 },
                    { field: "city", headerName: "City", width: 150 },
                    {
                        field: "short_brief",
                        headerName: "Short Brief",
                        hide: true,
                    },
                    {
                        field: "description",
                        headerName: "Description",
                        hide: true,
                    },
                    { field: "salary", headerName: "Salary" },
                    {
                        field: "working_time",
                        headerName: "Working Time",
                        width: 120,
                    },
                    {
                        field: "contract_type",
                        headerName: "Contract Type",
                        width: 120,
                    },
                    { field: "company_id", headerName: "Company ID" },
                ],
            })}
        </>
    );
}
