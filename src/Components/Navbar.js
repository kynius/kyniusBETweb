import {Icon} from "react-materialize";

const Navbar = () =>{
    return(
        <>
            <div style={{position:'fixed', height:'100%',borderRight:'1px solid gray'}} >
                <div>
                    <Icon className={'grey-text'} style={{fontSize:'50px'}}>home</Icon>
                </div>
                <div>
                    <Icon className={''} style={{fontSize:'50px'}}>account_circle</Icon>
                </div>
                <div>
                    <Icon className={'grey-text'} style={{fontSize:'50px'}}>message</Icon>
                </div>
                <div>
                    <Icon className={'grey-text'} style={{fontSize:'50px'}}>view_list</Icon>
                </div>
                
            </div>
        </>
    )
}
export default Navbar;