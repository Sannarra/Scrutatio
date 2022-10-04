import SearchIcon from '@mui/icons-material/Search';
import ChatIcon from '@mui/icons-material/Chat';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';



export default function Header({ openSidebar }) {
    return (
        <header style={{maxHeight:'5vh'}}>
            <button onClick={() => openSidebar()}><SearchIcon/></button>
            <div style={{justifyContent:'center',alignItems:'center', display:'flex'}} >
                <img style={{width:'100%',height:'auto', maxHeight:"100%" }} src="./logo-white.png" alt="logo" />
            </div>
            <div>
                <div><a href='#'><ChatIcon/></a></div>
                <div><a href='#'><AccountCircleIcon/></a></div>  
            </div>
        </header>
    )
}