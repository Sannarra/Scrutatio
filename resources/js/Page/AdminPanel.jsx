import PostsGrid from "../components/grid/PostsGrid.jsx";
import AccountsGrid from "../components/grid/AccountsGrid.jsx";

export default function AdminPanel(props) {
    return (
        <div>
            <PostsGrid />
            <AccountsGrid />
        </div>
    );
}
