import PostsGrid from "../components/grid/PostsGrid.jsx";
import AccountsGrid from "../components/grid/AccountsGrid.jsx";
import CompaniesGrid from "../components/grid/CompaniesGrid.jsx";
import UsersGrid from "../components/grid/UsersGrid.jsx";

export default function AdminPanel(props) {
    return (
        <div style={{ paddingLeft: "10%", paddingRight: "10%" }}>
            <PostsGrid />
            <UsersGrid />
            <CompaniesGrid />
            <AccountsGrid />
        </div>
    );
}
