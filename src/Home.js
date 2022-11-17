import Cookies from "universal-cookie/lib";
import LoginPage from "./LoginPage";
import HomePage from "./HomePage";
import jwtDecode from "jwt-decode";

export default function Home() {
    let cookies = new Cookies();
    let token = cookies.get('token');
    
    function ifTokenExpired(){
        const decoded = jwtDecode(token);
        if(Date.now() > decoded.exp * 1000){
            cookies.remove('token');
            window.location.reload();
        }
    }
    
    function checkToken(){
        if(cookies.get('token') === undefined){
            return (
                <LoginPage/>
            )
        }
        else {
           ifTokenExpired();
            return (
                <HomePage/>
            )
        }
    }
    return(
        <>
            {checkToken()}
        </>
    )
}
