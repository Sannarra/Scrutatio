import DBGrid from "./DBGrid.jsx";

export default function PostsGrid(props) {
    return (
        <>
            {DBGrid({
                table_name: "Posts",
                crud: {
                    api: "/api/posts",
                    web: {
                        create: (row) => `/create-post`,
                        update: (row) => `/edit-post/${row.id}`,
                    },
                },
                default: {
                    contract_type: "Not Defined",
                },
                columns: [
                    {
                        field: "title",
                        headerName: "Title",
                        width: 300,
                        editable: true,
                    },
                    {
                        field: "city",
                        headerName: "City",
                        width: 150,
                        editable: true,
                    },
                    {
                        field: "short_brief",
                        headerName: "Short Brief",
                        editable: true,
                    },
                    {
                        field: "description",
                        headerName: "Description",
                        editable: true,
                    },
                    {
                        field: "salary",
                        headerName: "Salary",
                        editable: true,
                        type: "number",
                    },
                    {
                        field: "working_time",
                        headerName: "Working Time",
                        width: 120,
                        editable: true,
                        type: "number",
                    },
                    {
                        field: "contract_type",
                        headerName: "Contract Type",
                        width: 120,
                        editable: true,
                        type: "singleSelect",
                        valueOptions: [
                            "Not Defined",
                            "Fixed-term",
                            "Permanent",
                            "Internship",
                            "Apprenticeship",
                            "Seasonal",
                        ],
                    },
                    {
                        field: "company_id",
                        headerName: "Company ID",
                        editable: true,
                        type: "number",
                    },
                ],
            })}
        </>
    );
}
