import {Card, Col, Icon} from "react-materialize";
import {Link} from "react-router-dom";

const LeaguePartial = ({league}) => {
    return(
        <>
            <Col l={4} m={6} s={12} offset={'l4 m3'}>
                <Card
                    actions={[
                        <Link key="2" to={`/league/Admin/${league.id}`}><Icon className={'blue-text'}>edit</Icon></Link>,
                        <Link key="3" to={`/league/User/${league.id}`}><Icon className={'green-text'}>arrow_forward</Icon></Link>
                    ]}
                    className='league-card'
                    textClassName="white-text"
                    title={league.name}
                >
                </Card>
            </Col>
        </>
    )
}
export default LeaguePartial;