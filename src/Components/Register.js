import {Button, Col, Row, TextInput} from "react-materialize";
import {useState} from "react";
import axios from "axios";

const Register = () => {
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [firstname, setFirstname] = useState();
    const [lastname, setLastname] = useState();
    const [error, setError] = useState();
    const handleChangeUsername = event => {
        setUsername(event.target.value);
    }
    const handleChangeEmail = event => {
        setEmail(event.target.value);
    }
    const handleChangePassword = event => {
        setPassword(event.target.value);
    }
    const handleChangeFirstname = event => {
        setFirstname(event.target.value);
    }
    const handleChangeLastName = event => {
        setLastname(event.target.value);
    }
    async function onRegister(){
       let response = await axios.post('https://kyniusbetapi.gadzina.biz/Authentication/Register', 
            {
                "userName": username,
                "email": email,
                "firstName": firstname,
                "lastName": lastname,
                "password": password
            })
        if(response.data.isSucceeded === false){
            setError(response.data.message);
        }
    }
    return(
        <>
        <Row>
            <Col l={8} m={12} s={12} offset={'l2'} className={'center'}>
                <TextInput onChange={handleChangeUsername} noLayout={true} label={'Username'}>
                    
                </TextInput>
                {username}
            </Col>
            <Col l={8} m={12} s={12} offset={'l2'} className={'center'}>
                <Col l={6} m={6} s={6}>
                    <TextInput onChange={handleChangeFirstname} noLayout={true} label={'First Name'}>

                    </TextInput>
                    {firstname}
                </Col>
                <Col l={6} m={6} s={6}>
                    <TextInput onChange={handleChangeLastName} noLayout={true} label={'Last Name'}>

                    </TextInput>
                    {lastname}
                </Col>
            </Col>
            <Col l={8} m={12} s={12} offset={'l2'} className={'center'}>
                <TextInput onChange={handleChangeEmail} noLayout={true} label={'E-mail'} email={true}>

                </TextInput>
                {email}
            </Col>
            <Col l={8} m={12} s={12} offset={'l2'} className={'center'}>
                <TextInput onChange={handleChangePassword} noLayout={true} label={'Password'} password={true}>

                </TextInput>
                {password}
            </Col>
            <Col l={10} m={12} s={12} className={'right-align'}>
                <Button waves={"teal"} onClick={onRegister}>Register</Button>
            </Col>
            <Col l={12} className={'center'}>
                <div className={'red-text center'}>{error}</div>
            </Col>
        </Row>
        </>
    )
}
export default Register;