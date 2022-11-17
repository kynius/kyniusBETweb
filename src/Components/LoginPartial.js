import {Button, Col, Preloader, Row, TextInput} from "react-materialize";
import {useState} from "react";
import axios from "axios";
import Cookies from "universal-cookie/es6";

const LoginPartial = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] =  useState();
    const [loading, isLoading] = useState(false);
    let cookies = new Cookies();
    async function onLogin(){
        setError(null);
        isLoading(true);
        let response = await axios.post('https://kyniusbetapi.gadzina.biz/Authentication/Login', 
            {
                "userName": username,
                "password": password
            }, )
        if(response.data.isSucceeded !== true){
            setError(response.data.message);
            isLoading(false);
        }
        else{
            cookies.set('token', response.data.token);
            isLoading(false);
            window.location.reload();
        } 
        console.log(cookies.get('token'))
    }
   
    const handleChangeUsername = event => {
            setUsername(event.target.value);
    }
    const handleChangePassword = event => {
        setPassword(event.target.value);
    }
    function loginButton(){
        if(username !== "" && password !== "")
        {
            return(
                <Button waves={"teal"} onClick={onLogin}>Log in</Button>
            )
        }
        else {
            return(
                <Button disabled={true} waves={"teal"} onClick={onLogin}>Log in</Button>
            )
        }
    }
    function checkLoading(){
        if(loading === true)
        {
            return (
                <>
                    <Preloader
                        active
                        color="blue"
                        flashing
                    />
                </>
            )
        }
    }
    return (
        <>
            <Row>
             <Col l={8} s={12} m={12} offset={'l2'} className={'center'}>
                 <TextInput validate={true} onChange={handleChangeUsername} noLayout={true} label={'Username'}>
                     
                 </TextInput>
             </Col>
                <Col l={8} s={12} m={6} offset={'l2'} className={'center'}>
                    <TextInput validate={true} onChange={handleChangePassword} noLayout={true} label={'Password'} password={true}>

                    </TextInput>
                </Col>
                <Col l={10} m={9} s={12} className={'right-align'}>
                    {loginButton()}
                </Col>
                <Col l={12} className={'center'}>
                    <div className={'red-text center'}>{error}</div>
                    {checkLoading()}
                </Col>
            </Row>
        </>
    )
}
export default LoginPartial;