import React from 'react'
import PostSide from '../../components/PostSide/PostSide'
import ProfileCard from '../../components/ProfileCard/ProfileCard'
import ProfileLeft from '../../components/ProfileLeft/ProfileLeft'
import RightSide from '../../components/RightSide/RightSide'
import './Profile.css'
const Profile = () => {
    return (
        <div className="Profile">
            <ProfileLeft />
            <div className='for_overflow'>
                <div className="Profile-center">
                    <ProfileCard />
                    <PostSide />
                </div>
            </div>



            <RightSide />
        </div>
    )
}

export default Profile