import {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {getRequest, postRequest} from "./Request";
import {Button, Card, Col, Icon, Preloader, Row} from "react-materialize";

export default function LeagueUserPage(){
    const [loading, isLoading] = useState(true);
    const [matches, setMatches] = useState([]);
    const [bets, setBets] = useState([]);
    const [activeBets, setActiveBets] = useState([]);
    const [error, setError] = useState([]);
    const navigate = useNavigate();
    let {id} = useParams()
    
    useEffect(() => {
        let array = [];
        let betResponse = getRequest.request({
            url: `LeagueBet/GetAllLeagueBets/${id}`
        });
        betResponse.then((result) => {
            if(result.data.message !== 'League have no active bets')
            {
                setMatches(result.data.message);
            }
            else {
                setError(result.data.message);
            }
        }).catch(function (error){
            if(error.response){
                setError(error.response.data.message)
            }
        }) 
        getRequest.request({
            url: 'Bet/GetAllBets/37?onlyActive=true'
        }).then((result) => {
            
            setActiveBets(result.data.message);
            result.data.message.forEach((m) => {
                let b = document.querySelector(`[data-type="${m.leagueBetId};${m.dateToBet}"][data-value="${m.value}"]`);
                let value = `${m.leagueBetId};${m.dateToBet};${m.value}`
                b.parentElement.classList.add('active');
                isLoading(false);
                if(array.includes(value))
                {
                    
                }
                else{
                    array.push(value);
                    setBets((prevState) => [...prevState, value])
                }
            })
        })
    }, [id])
    const setActive = event => {
        let value = event.currentTarget.firstElementChild.dataset.type + ';' + event.currentTarget.firstElementChild.dataset.value;
        let otherBets = Array.from(document.querySelectorAll(`[data-type="${event.currentTarget.firstElementChild.dataset.type}"]`))
        let activeBet = otherBets.find((x) => x.parentElement.classList.contains('active') === true);
        if(event.currentTarget.firstElementChild.dataset.type !== undefined || event.currentTarget.firstElementChild.dataset.value !== undefined)
        {
            if(activeBet === undefined || activeBet.parentElement === event.currentTarget)
            {
                event.currentTarget.classList.toggle('active');
                if(bets.includes(value))
                {
                    setBets(bets.filter(item => item !== value))
                }
                else{
                    setBets((prevState) => [...prevState, value])
                }
            }
            else{
                let activeBetValue = activeBet.dataset.type + ';' + activeBet.dataset.value;
                activeBet.parentElement.classList.toggle('active');
                event.currentTarget.classList.toggle('active');
                setBets(bets.filter(item => item !== activeBetValue));
                setBets((prevState) => [...prevState, value]);
            }
        }
    }
    function onSave(){
        let request = [];
        bets.forEach((b) => {
            let ids = b.split(';');
            let bet =  {
                "leagueBetId": parseInt(ids[0]),
                "value": ids[2],
                "dateToBet": ids[1]
            }
            request.push(bet);
        })
        if(request !== activeBets)
        {
            postRequest.request({
                url: `/Bet/AddBet/${id}`,
                data: request
            });
        }
        navigate('/');
    }
    function betOptions(bet){
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
                        onClick={setActive}
                    >
                        <div data-type={`${bet.id};${bet.dateToBet}`} data-value={bet.homeTeam.id}>{bet.homeTeam.name}</div>
                    </Button>
                    <Button
                        node="button"
                        style={{
                            marginRight: '5px',
                            marginTop: '5px'
                        }}
                        className={'leagueBetButton'}
                        onClick={setActive}
                    >
                        <div data-type={`${bet.id};${bet.dateToBet}`} data-value={0}>X</div>
                    </Button>
                    <Button
                        node="button"
                        style={{
                            marginRight: '5px',
                            marginTop: '5px'
                        }}
                        className={'leagueBetButton'}
                        onClick={setActive}
                    >
                        <div data-type={`${bet.id};${bet.dateToBet}`} data-value={bet.awayTeam.id}>{bet.awayTeam.name}</div>
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
                        onClick={setActive}
                    >
                        <div data-type={`${bet.id};${bet.dateToBet}`} data-value={true}><Icon className={'green-text'} large={true}>check</Icon></div>
                    </Button>
                    <Button
                        node="button"
                        style={{
                            marginRight: '5px',
                            marginTop: '5px'
                        }}
                        className={`leagueBetButton`}
                        onClick={setActive}
                    >
                        <div data-type={`${bet.id};${bet.dateToBet}`} data-value={false}><Icon className={'red-text'} large={true}>close</Icon></div>
                    </Button>
                </>
            )
        }
        else if(bet.betType.name === "Score"){
            return (
                <>
                    <Row>
                        <Col l={4} m={4} s={4}>
                            <input onChange={onSave} data-type={`${bet.id};${bet.dateToBet};home`} className={'center'} defaultValue={0} type={'number'}/>
                        </Col>
                        <Col l={4} m={4} s={4}>
                        </Col>
                        <Col l={4} m={4} s={4}>
                            <input data-type={`${bet.id};${bet.dateToBet};home`} className={'center'} defaultValue={0} type={'number'}/>
                        </Col>
                    </Row>
                </>
            )
        }
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
    return(
        <>
            <Card className={'center league-card'}>
            <Link className={'black-text'} to={`/league/bets/${id}`}>See all your bets <Icon>arrow_forward</Icon></Link>
            </Card>
            <div className={'red-text center'}>{error}</div>
            <Row>
            {matches.map((m) => (
                <Col l={6} m={6} s={12} offset={''} className={'center'}>
                    <Card
                        className='league-card'
                        textClassName="white-text"
                        title={m.homeTeam.name + ' vs ' + m.awayTeam.name}
                        actions={[
                            betOptions(m)
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
                                    <span className={'hide-on-med-and-down'}>Bet type:</span>{m.betType.name}
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
                <Button
                    className="green addButton"
                    floating
                    icon={<Icon>add</Icon>}
                    large
                    node="button"
                    waves="light"
                    onClick={onSave}
                />
            {checkLoading()}
            </Row>
            <div style={{marginTop:'80px'}}></div>
        </>
    )
}