import {useEffect, useState} from "react";
import {getRequest, postRequest} from "../Request";
import {Button, Col, Icon, Row, Toast} from "react-materialize";
import {Link} from "react-router-dom";
import M from 'materialize-css/dist/js/materialize.min'
import Cookies from "universal-cookie/lib";

const Navbar = () =>{
    const [invites, setInvites] = useState([]);
    useEffect(() => {
        let sideNav = document.querySelector('#slide-out');
        M.Sidenav.init(sideNav)
        getRequest.request({
            url: `Invite/GetAllReceivedWaitingInvites`
        }).then((result) => {
            setInvites(result.data);
        }).catch((error) => {
            
        })
    }, [])
    const acceptInvite = (event) => {
        let id = event.currentTarget.dataset.id;
        postRequest.request({
            url: `Invite/AcceptInvite/?id=${id}`
        }).then((result) => {
            setInvites(invites.filter(invite => invite !== result.data.message))
        })
    }
    const rejectInvite = (event) => {
        let id = event.currentTarget.dataset.id;
        postRequest.request({
            url: `Invite/RejectInvite/?id=${id}`
        }).then((result) => {
            setInvites(invites.filter(invite => invite !== result.data.message))
            window.location.reload();
        })
    }
    function checkToken(){
        let cookies = new Cookies()
        if(cookies.get('token') === undefined){
            return(
                <>
                    
                </>
            )
        }
        else {
            return (
                <>
                    <Row id={'mobileNav'} className={'mobileNav'}>
                        <Link to={'/'}><Col s={3}><Icon className={'mobileNavIcon'} medium={true}>home</Icon></Col></Link>
                        <a data-target="slide-out" className={'sidenav-trigger'}><Col s={3}><Icon className={'mobileNavIcon'} medium={true}>message</Icon><span className={'red-text'}>{invites.length}</span></Col></a>
                        <div ><Col s={3}><Icon title={'Function disabled'} className={'mobileNavIcon'} medium={true}>account_circle</Icon></Col></div>
                        <div ><Col s={3}><Icon title={'Function disabled'} className={'mobileNavIcon'} medium={true}>settings</Icon></Col></div>
                    </Row>
                    <ul className="sidenav collection" id="slide-out">
                        {invites.map((m) => (
                            <>
                                <li className={'collection-item'} key={m.id}>
                                    <span style={{fontWeight:'bold'}}>{m.invitingUserName}</span> is inviting you to a {m.leagueName} league!
                                    <Row>
                                        <Col className={'left'} s={6}>
                                            <Button data-id={m.id} className={'green'} onClick={acceptInvite}>Accept</Button>
                                        </Col>
                                        <Col className={'right'} s={6}>
                                            <Button data-id={m.id} className={'red'} onClick={rejectInvite}>Reject</Button>
                                        </Col>
                                    </Row>
                                </li>
                            </>
                        ))}
                    </ul>
                </>
            )
        }
    }
    return(
        <>
            {checkToken()}
        </>
    )
}
export default Navbar;