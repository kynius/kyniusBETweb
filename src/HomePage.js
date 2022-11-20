import {useEffect, useState} from "react";
import {Card, Col, Icon, Preloader, Row} from "react-materialize";
import {getRequest} from "./Request";
import LeaguePartial from "./Components/LeaguePartial";
import Cookies from "universal-cookie/lib";
import jwtDecode from "jwt-decode";
import {Link} from "react-router-dom";

export default function HomePage() {
    const [loading, isLoading] =  useState(true);
    const [data, setData] = useState([]);
    const [error, setError] = useState('');
    useEffect(() => {
        const config = {
            url: 'League/GetAllLeaguesByUser',
        }
        let response = getRequest.request(config);
        response.then(function (result){
         setData(result.data);
         isLoading(false);
        }).catch(function (error){
            if(error.response){
                setError(error.response.data.message)
                isLoading(false);
            }
        })
    }, [])
    function setMatches(){
        getRequest.request({
            url: '/Admin/SetMatches'
        })
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
                                className='league-card center'
                                textClassName="white-text"
                                title='Create your own league'
                            >
                                <Icon medium={true}>add</Icon>
                            </Card>
                    </Col>
                    <Col l={4} m={6} s={12} offset={'l4 m3'}>
                        <Card
                            actions={[
                                <Link to={'#'} key="1" onClick={setMatches}>Set Matches</Link>,
                                <Link to={'#'} key="2" onClick={checkBets}>Check Bets</Link>,
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
                    <div className={'red-text center'}>{error}</div>
                    <Row>
                    {data.map((item) => (
                        <LeaguePartial key={item.id} league={item}/>
                    ))}
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
