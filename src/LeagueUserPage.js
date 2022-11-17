import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getRequest} from "./Request";
import {Button, Card, Col, Icon, Preloader, Row, TextInput} from "react-materialize";

export default function LeagueUserPage(){
    const [loading, isLoading] = useState(true);
    const [matches, setMatches] = useState([]);
    let {id} = useParams()
    useEffect(() => {
        let betResponse = getRequest.request({
            url: `LeagueBet/GetAllLeagueBets/${id}`
        });
        betResponse.then((result) => {
            setMatches(result.data.message);
            isLoading(false);
        })
    }, [])
    function getBetOptions(bet){
        if(bet.betType.name === "Winner")
        {
            return(
                <>
                    <Button
                        node="button"
                        style={{
                            marginRight: '5px',
                            marginTop: '5px'
                        }}
                        className={'leagueBetButton'}
                        waves="light"
                    >
                        <div>1</div>
                    </Button>
                    <Button
                    node="button"
                    style={{
                        marginRight: '5px',
                        marginTop: '5px'
                    }}
                    className={'leagueBetButton'}
                    waves="light"
                >
                    <div>X</div>
                </Button>
                    <Button
                    node="button"
                    style={{
                        marginRight: '5px',
                        marginTop: '5px'
                    }}
                    className={'leagueBetButton'}
                    waves="light"
                >
                    <div>2</div>
                </Button>
                </>
            )
        }
        else if(bet.betType.name === "BTTS"){
            return (
                <>
                    <Button
                        node="button"
                        style={{
                            marginRight: '5px',
                            marginTop: '5px'
                        }}
                        className={'leagueBetButton'}
                        waves="light"
                    >
                        <div><Icon className={'green-text'} large={true}>check</Icon></div>
                    </Button>
                    <Button
                        node="button"
                        style={{
                            marginRight: '5px',
                            marginTop: '5px'
                        }}
                        className={'leagueBetButton'}
                        waves="light"
                    >
                        <div><Icon className={'red-text'} large={true}>close</Icon></div>
                    </Button>
                </>
            )
        }
        else if(bet.betType.name === "Score"){
            return (
               <>
                   <input />
               </>
            )
        }
    }
    console.log(matches);
    function checkLoading() {
        if (loading === true) {
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
    }
    return(
        <>
            <Row>
            {matches.map((m) => (
                <Col l={6} m={6} s={12} offset={''} className={'center'}>
                    <Card
                        className='league-card'
                        textClassName="white-text"
                        title={m.homeTeam.name + ' vs ' + m.awayTeam.name}
                        actions={[
                            getBetOptions(m)
                        ]}
                    >
                        <div className={'center'}>
                            <div>
                            Match date: {new Date(m.dateTime).toLocaleString()}
                            </div>
                            <div>
                                Closing bet at {new Date(m.dateToBet).toLocaleString()}
                            </div>
                        </div>
                        <Row>
                            <Col l={3} m={5} s={5}>
                                <img style={{height: '83.66px'}} alt={m.homeTeam.name + ' logo'} className={'responsive-img'}
                                     src={m.homeTeam.logo}/>
                            </Col>
                            <Col l={6} m={2} s={2} className={'center'}>
                                <div>
                                    VS
                                </div>
                                <div>
                                    <span className={'hide-on-med-and-down'}>Bet type:</span> {m.betType.name}
                                </div>
                            </Col>
                            <Col l={3} m={5} s={5}>
                                <img style={{height: '83.66px'}} alt={m.awayTeam.name + ' logo'} className={'responsive-img'}
                                     src={m.awayTeam.logo}/>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            ))}
            {checkLoading()}
            </Row>
        </>
    )
}