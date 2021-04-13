import React,{useEffect,Fragment} from 'react'
import PropTypes from 'prop-types'
import Spinner from '../Layout/Spinner'
import {connect } from 'react-redux'
import {getCurrentProfile} from '../../action/profile'
import { Link } from 'react-router-dom'
import ProFileForm from '../profile-form/ProfileForm'
import DashboardActions from './DashboardActions'

const Dashboard = ({getCurrentProfile,auth,profile}) => {
  useEffect(()=>{
    getCurrentProfile();
    
  },[])
  return profile.loading && profile.profile===null?<Spinner/>:
  <Fragment>
    <h1 className ='large text-primary'>Dasshboard</h1>
    <p className='lead'>
      <i className='fas fa-user'/> Welcome {auth.user && auth.user.name}
    </p>
    {profile.profile!==null?(
      <Fragment>
        <DashboardActions/>
      </Fragment>
    ):(
    <Fragment>
      <p>You have not setup profile, please add something info</p>
      <Link to='create-profile' className='btn btn-primary my-1' component={ProFileForm}>
        Create Profile
      </Link>

    </Fragment>)}
  </Fragment>
}

Dashboard.propTypes = {
  getCurrentProfile:PropTypes.func.isRequired,
  auth:PropTypes.object.isRequired,
  profile:PropTypes.object.isRequired

}
const mapStateToProps= state=>({
  auth:state.auth,
  profile:state.profile
})

export default connect(mapStateToProps,{getCurrentProfile})(Dashboard);
