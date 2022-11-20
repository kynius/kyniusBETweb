import {getRequest, postRequest} from "./Request";
import {Button, Card, Col, Icon, Preloader, Row, TextInput} from "react-materialize";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom"; 

export default function LeagueAdminPage(){
        const [loading, isLoading] = useState(true);
        const [matches, setMatches] = useState([]);
        const [betTypes, setBetTypes] = useState([]);
        const [bets, setBets] = useState([]);
        const [inviteMessage, setInviteMessage] = useState('');
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
        }, [])
    function sendInvite(){
        let input = document.getElementById('username').value;
        postRequest.request({
            url: `Invite/SendInvite/${id}`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: input
        }).then((result) => {
            if(result.data.IsSucceeded === true)
            {
                setInviteMessage(`You invited ${input} to your league!`)
            }
        })
    }
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
                        <Col className={'center'} l={12} m={12} s={12}>
                            <Col l={8} m={12} s={12} offset={'l2 m5'}>
                                    <TextInput l={8} m={8} s={12} id={'username'} placeholder={'Username'}></TextInput>
                                    <Button
                                        style={{marginTop:'25px'}}
                                        node="button"
                                        type="submit"
                                        waves="light"
                                        onClick={sendInvite}
                                    >
                                        Invite
                                        <Icon right>
                                            send
                                        </Icon>
                                    </Button>
                            </Col>
                        </Col>
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
                                className="green addButton"
                                floating
                                icon={<Icon>add</Icon>}
                                large
                                node="button"
                                waves="light"
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