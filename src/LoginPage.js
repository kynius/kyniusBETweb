import {Col, Row, Tab, Tabs} from "react-materialize";
import Login from "./Components/Login";
import Register from "./Components/Register";


export default function LoginPage(){
    
    return(
        <>
            <Row>
                <Col l={6} m={8} s={12} offset={'l3 m2'}>
            <Tabs className={'tab-demo z-depth-1 tabs-fixed-width'}>
                <Tab
                    options={{
                        duration: 300,
                        onShow: null,
                        responsiveThreshold: Infinity,
                        swipeable: false
                    }}
                    title="Login"
                >
                    <Login/>
                </Tab>
                <Tab
                    options={{
                        duration: 300,
                        onShow: null,
                        responsiveThreshold: Infinity,
                        swipeable: false
                    }}
                    title="Register"
                >
                   <Register/>
                </Tab>
            </Tabs>
                </Col>
            </Row>
        </>
    )
}