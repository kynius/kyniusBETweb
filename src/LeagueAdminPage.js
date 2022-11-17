import {getRequest, postRequest} from "./Request";
import {Button, Card, Col, Icon, Preloader, Row} from "react-materialize";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom"; 

export default function LeagueAdminPage(){
        const [loading, isLoading] = useState(true);
        const [matches, setMatches] = useState([]);
        const [betTypes, setBetTypes] = useState([]);
        const [bets, setBets] = useState([]);
        const [activeBets, setActiveBets] = useState([]);
        const setActive = event => {
            event.currentTarget.classList.toggle('active');
            let value = event.target.id;
            if(bets.includes(value) === false)
            {
                setBets((prevState) => [...prevState, value])
            }
            else {
                setBets(bets.filter(item => item !== value))
            }
        }
        const {id} = useParams()
        useEffect(() => {
            getRequest.request({
                url: `LeagueBet/GetAllMatches/${id}`
            }).then((result) => {
                setMatches(result.data.message);
            })
            getRequest.request({
                url: `/Bet/GetAllBetTypes/${id}`
            }).then((result) => {
                setBetTypes(result.data.message)
            })
            getRequest.request({
                url: `/LeagueBet/GetAllLeagueBets/${id}`
            }).then((result) => {
                setActiveBets(result.data.message);
                isLoading(false);
            })
            
        }, [])
        function onSave(){
            let request = [];
            bets.forEach((b) => {
                let ids = b.split(';');
                let bet =  {
                        "matchId": ids[0],
                        "betTypeId": ids[1]
                    }
                    request.push(bet);
            })
            postRequest.request({
                url: `/LeagueBet/AddLeagueBets/${id}`,
                data: request
            });
        }
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
        return (
            <>
                    <Row>
                        {matches.map((m) => (
                            <Col l={6} m={6} s={12} className={'center'}>
                                <Card
                                    className='league-card'
                                    textClassName="white-text"
                                    title={m.home.name + ' vs ' + m.away.name}
                                    actions={[
                                        betTypes.map((b) => (
                                            <>
                                                <Button
                                                    key={b.id}
                                                    node="button"
                                                    style={{
                                                        marginRight: '5px',
                                                        marginTop: '5px'
                                                    }}
                                                    className={'leagueBetButton'}
                                                    waves="light"
                                                    onClick={setActive}
                                                >
                                                    <div id={`${m.id};${b.id}`}>{b.name} | {b.pointValue}</div>
                                                </Button>
                                            </>
                                        ))
                                    ]}
                                >
                                    <div className={'center'}>
                                        {new Date(m.date).toLocaleString()}
                                    </div>
                                    <Row>
                                        <Col l={3} m={5} s={5}>
                                            <img style={{height: '83.66px'}} alt={m.home.name + ' logo'} className={'responsive-img'}
                                                 src={m.home.logo}/>
                                        </Col>
                                        <Col l={6} m={2} s={2} className={'center'}>
                                            VS
                                        </Col>
                                        <Col l={3} m={5} s={5}>
                                            <img style={{height: '83.66px'}} alt={m.away.name + ' logo'} className={'responsive-img'}
                                                 src={m.away.logo}/>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        ))}
                        <Col l={3} m={5} s={12}>
                            <Button
                                className="green"
                                floating
                                icon={<Icon>add</Icon>}
                                large
                                node="button"
                                waves="light"
                                style={{position: "fixed",bottom:'15px'}}
                                onClick={onSave}
                            />
                        </Col>
                       
                    </Row>
                <div className={'center'}>
                    {checkLoading()}
                </div>
                
            </>
        )
}