import SearchIcon from '@mui/icons-material/Search';
import ChatIcon from '@mui/icons-material/Chat';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import IconButton from "@mui/material/IconButton";



export default function Header({ openSidebar }) {
    return (
        <header style={{maxHeight:'5vh'}}>
             <IconButton sx={{ color: "white" }} onClick={() => openSidebar()}><SearchIcon/></IconButton>
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