import {Button, Col, Preloader, Row, TextInput} from "react-materialize";
import {useState} from "react";
import axios from "axios";

const RegisterPartial = () => {
    const [loading, isLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
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
        isLoading(true);
        setError(null);
       let response = await axios.post('https://kyniusbetapi.gadzina.biz/Authentication/Register', 
            {
                "userName": username,
                "email": email,
                "firstName": firstname,
                "lastName": lastname,
                "password": password
            })
        if(response.data.isSucceeded === true){
            isLoading(false);
            setError('User succesfully created');
        }else {
            isLoading(false);
            setError(response.data.message);
        }
    }
    function registerButton(){
        if(username !== "" && password !== "" && firstname !== "" && lastname !== "" && email !== "")
        {
            return(
                <Button waves={"teal"} onClick={onRegister}>Register</Button>
            )
        }
        else {
            return(
                <Button waves={"teal"} disabled={true} onClick={onRegister}>Register</Button>
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
    return(
        <>
        <Row>
            <Col l={8} m={12} s={12} offset={'l2'} className={'center'}>
                <TextInput validate={true} onChange={handleChangeUsername} noLayout={true} label={'Username'}>
                    
                </TextInput>
            </Col>
            <Col l={8} m={12} s={12} offset={'l2'} className={'center'}>
                <Col l={6} m={6} s={6}>
                    <TextInput validate={true} onChange={handleChangeFirstname} noLayout={true} label={'First Name'}>

                    </TextInput>
                </Col>
                <Col l={6} m={6} s={6}>
                    <TextInput validate={true} onChange={handleChangeLastName} noLayout={true} label={'Last Name'}>

                    </TextInput>
                </Col>
            </Col>
            <Col l={8} m={12} s={12} offset={'l2'} className={'center'}>
                <TextInput validate={true} onChange={handleChangeEmail} noLayout={true} label={'E-mail'} email={true}>

                </TextInput>
            </Col>
            <Col l={8} m={12} s={12} offset={'l2'} className={'center'}>
                <TextInput validate={true} onChange={handleChangePassword} noLayout={true} label={'Password'} password={true}>

                </TextInput>
            </Col>
            <Col l={10} m={12} s={12} className={'right-align'}>
                {registerButton()}
            </Col>
            <Col l={12} className={'center'}>
                <div className={'red-text center'}>{error}</div>
                {checkLoading()}
            </Col>
        </Row>
        </>
    )
}
export default RegisterPartial;