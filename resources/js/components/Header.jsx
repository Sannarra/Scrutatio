import SearchIcon from '@mui/icons-material/Search';
import ChatIcon from '@mui/icons-material/Chat';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';



export default function Header() {
    return (
        <header>
            <div><SearchIcon/></div>
            <div>Scrutatio</div>
            <div>
                <div><a href='#'><ChatIcon/></a></div>
                <div><a href='#'><AccountCircleIcon/></a></div>  
            </div>
        </header>
    )
}