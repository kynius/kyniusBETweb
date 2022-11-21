import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getRequest} from "./Request";
import {Button, Card, Col, Icon, Row} from "react-materialize";

export default function BetsPage(){
    const [bets, setBets] = useState([]);
    const {id} = useParams();
    useEffect(() => {
        getRequest.request({
            url: `Bet/GetAllBets/${id}`
        }).then((result) => {
            setBets(result.data.message);
            result.data.message.forEach((bet) => {
                let b = document.querySelector(`[data-type="${bet.leagueBetId};${bet.dateToBet}"][data-value="${bet.value}"]`);
                b.parentElement.classList.add('active');
            })
        })
    },[id])
    function checkIsCorrect(bet){
        if(bet.isCorrect === true)
        {
            return("green")
        }
        else if(bet.isCorrect === false)
        {
            return("red")
        }
        else{
            return("gray")
        }
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
                    >
                        <div data-type={`${bet.leagueBetId};${bet.dateToBet}`} data-value={bet.homeTeam.id}>{bet.homeTeam.name}</div>
                    </Button>
                    <Button
                        node="button"
                        style={{
                            marginRight: '5px',
                            marginTop: '5px'
                        }}
                        className={'leagueBetButton'}
                    >
                        <div data-type={`${bet.leagueBetId};${bet.dateToBet}`} data-value={0}>X</div>
                    </Button>
                    <Button
                        node="button"
                        style={{
                            marginRight: '5px',
                            marginTop: '5px'
                        }}
                        className={'leagueBetButton'}
                    >
                        <div data-type={`${bet.leagueBetId};${bet.dateToBet}`} data-value={bet.awayTeam.id}>{bet.awayTeam.name}</div>
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
                    >
                        <div data-type={`${bet.leagueBetId};${bet.dateToBet}`} data-value={true}><Icon className={'green-text'} large={true}>check</Icon></div>
                    </Button>
                    <Button
                        node="button"
                        style={{
                            marginRight: '5px',
                            marginTop: '5px'
                        }}
                        className={`leagueBetButton`}
                    >
                        <div data-type={`${bet.leagueBetId};${bet.dateToBet}`} data-value={false}><Icon className={'red-text'} large={true}>close</Icon></div>
                    </Button>
                </>
            )
        }
        else if(bet.betType.name === "Score"){
            return (
                <>
                    <Row>
                        <Col l={4} m={4} s={4}>
                            <input data-type={`${bet.leagueBetId};${bet.dateToBet};home`} className={'center'} defaultValue={0} type={'number'}/>
                        </Col>
                        <Col l={4} m={4} s={4}>
                        </Col>
                        <Col l={4} m={4} s={4}>
                            <input data-type={`${bet.leagueBetId};${bet.dateToBet};home`} className={'center'} defaultValue={0} type={'number'}/>
                        </Col>
                    </Row>
                </>
            )
        }
    }
    return(
        <>
            {bets.map((m) => (
                <>
                    <Card
                        style={{backgroundColor: checkIsCorrect(m)}}
                        className='center'
                        textClassName="black-text"
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
                </>
            ))}
            <div style={{marginBottom: '80px'}}></div>
        </>
    )
}