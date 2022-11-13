import {Button, Col, Row, TextInput} from "react-materialize";
import {useState} from "react";
import axios from "axios";

const Login = () => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [error, setError] =  useState();
    async function onLogin(){
        let response = await axios.post('http://kyniusbetapi.gadzina.biz/Authentication/Login', 
            {
                "userName": username,
                "password": password
            }, )
        if(response.data.isSucceeded === false){
            setError(response.data.message);
        }
    }
    
    const handleChangeUsername = event => {
            setUsername(event.target.value);
    }
    const handleChangePassword = event => {
        setPassword(event.target.value);
    }
    return (
        <>
            <Row>
             <Col l={8} s={12} m={12} offset={'l2'} className={'center'}>
                 <TextInput onChange={handleChangeUsername} noLayout={true} label={'Username'}>
                     
                 </TextInput>
                 {username}
             </Col>
                <Col l={8} s={12} m={6} offset={'l2'} className={'center'}>
                    <TextInput onChange={handleChangePassword} noLayout={true}  label={'Password'} password={true}>

                    </TextInput>
                    {password}
                </Col>
                <Col l={10} m={9} s={12} className={'right-align'}>
                    <Button waves={"teal"} onClick={onLogin}>Log in</Button>
                </Col>
                <Col l={12} className={'center'}>
                    <div className={'red-text center'}>{error}</div>
                </Col>
            </Row>
        </>
    )
}
export default Login;