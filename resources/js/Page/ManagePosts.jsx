import CardsList from "../components/CardsList";
import TablePagination from "@mui/material/TablePagination";

export default function ManagePosts(props) {
    const changePage = (pageId, size) => {
        let url = new URL(window.location.href);
        url.searchParams.set("page", pageId);
        url.searchParams.set("pageSize", size);
        window.location.href = url.href;
    };

    return (
        <div>
            <CardsList edit_mode data={props.data} />
            <br />
            <div style={{ justifyContent: "center", display: "flex" }}>
                <TablePagination
                    component="div"
                    count={props.data.page.count}
                    page={props.data.page.current - 1}
                    color="primary"
                    onPageChange={(event, value) =>
                        changePage(value + 1, props.data.page.size)
                    }
                    rowsPerPageOptions={[5, 10, 15, 25, 50, 100]}
                    rowsPerPage={props.data.page.size || 10}
                    onRowsPerPageChange={(event) => {
                        changePage(props.data.page.current, event.target.value);
                    }}
                />
            </div>
        </div>
    );
}
