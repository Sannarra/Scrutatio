import CardsList from "../components/CardsList";
import Pagination from "@mui/material/Pagination";

export default function ManagePosts(props) {
    const onPageChange = (e, value) => {
        let url = new URL(window.location.href);
        url.searchParams.set("page", value);
        window.location.href = url.href;
    };

    return (
        <div>
            <CardsList edit_mode data={props.data} />
            <br />
            <div style={{ justifyContent: "center", display: "flex" }}>
                <Pagination
                    count={props.data.page.count}
                    page={props.data.page.current}
                    color="primary"
                    onChange={onPageChange}
                />
            </div>
        </div>
    );
}
