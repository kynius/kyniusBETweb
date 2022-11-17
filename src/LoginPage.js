import {Col, Row, Tab, Tabs} from "react-materialize";
import RegisterPartial from "./Components/RegisterPartial";
import LoginPartial from "./Components/LoginPartial";


export default function LoginPage(){
    
    return(
        <>
            <Row>
                <Col l={6} m={8} s={12} offset={'l3 m2'}>
            <Tabs className={'tab-demo z-depth-1 tabs-fixed-width'}>
                <Tab
                    idx={'login'}
                    options={{
                        duration: 300,
                        onShow: null,
                        responsiveThreshold: Infinity,
                        swipeable: false
                    }}
                    title="Login"
                >
                    <LoginPartial/>
                </Tab>
                <Tab
                    idx={'register'}
                    options={{
                        duration: 300,
                        onShow: null,
                        responsiveThreshold: Infinity,
                        swipeable: false
                    }}
                    title="Register"
                >
                   <RegisterPartial/>
                </Tab>
            </Tabs>
                </Col>
            </Row>
        </>
    )
}