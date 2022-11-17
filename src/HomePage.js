import {useEffect, useState} from "react";
import {Card, Col, Icon, Preloader, Row} from "react-materialize";
import {getRequest} from "./Request";
import LeaguePartial from "./Components/LeaguePartial";
import Cookies from "universal-cookie/lib";
import jwtDecode from "jwt-decode";

export default function HomePage() {
    const [loading, isLoading] =  useState(true);
    const [data, setData] = useState(null);
    const config = {
        url: 'League/GetAllLeaguesByUser',
    }
    useEffect(() => {
        let response = getRequest.request(config);
        response.then(function (result){
         setData(result.data);
         isLoading(false);
        })
    }, [])
    function setMatches(){
        getRequest.request({
            url: '/Admin/SetMatches'
        });
    }
    function checkBets(){
        getRequest.request({
            url: '/Admin/CheckBets'
        })
    }
    let cookies = new Cookies();
    let decodedToken = jwtDecode(cookies.get('token'));
    function checkOwner(){
        if(decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === 'Owner'){
            return(
                <>
                    <Col l={4} m={6} s={12} offset={'l4 m3'}>
                        <Card
                            actions={[
                                <a key="1" onClick={setMatches}>Set Matches</a>,
                                <a key="2" onClick={checkBets}>Check Bets</a>,
                            ]}
                            className='league-card'
                            textClassName="white-text"
                            title='Owner functions'
                        >
                        </Card>
                    </Col>
                </>
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
                        size={'big'}
                    />
                </>
            )
        }
        else{
            return(
                <>
                    <Row>
                    {data.map((item) => (
                        <LeaguePartial key={item.id} league={item}/>
                    ))}
                        <Col l={6}>
                          Create League  
                        </Col>
                        {checkOwner()}
                    </Row>
                </>
            )
        }
    }
    return(
        <>
            {checkLoading()}
        </>
    )
}
