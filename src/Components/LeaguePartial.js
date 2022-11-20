import {Card, Col, Icon} from "react-materialize";
import {Link} from "react-router-dom";
import Cookies from "universal-cookie/lib";
import jwtDecode from "jwt-decode";

const LeaguePartial = ({league}) => {
    let cookies = new Cookies();
    let decodedToken = jwtDecode(cookies.get('token'));
    function checkOwner(){
        if(decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === 'Owner') {
            return (
                <Link key="2" to={`/league/Admin/${league.id}`}><Icon className={'blue-text'}>edit</Icon></Link>
            )
        }
        }
    return(
        <>
            <Col l={4} m={6} s={12} offset={'l4 m3'}>
                <Card
                    actions={[
                        <>
                            {checkOwner()}
                            <Link key="3" to={`/league/User/${league.id}`}><Icon className={'green-text'}>arrow_forward</Icon></Link>
                        </>
                        
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