


function UserProfileInfo({ userProfile }) {
    return (
        <>
            <div className="profileInfo_container">
                <h3 className="profileInfo_subtitle">Name</h3>
                <p className="profileInfo_description">{userProfile.user_name}</p>
            </div>
            <div className="profileInfo_container">
                <h3 className="profileInfo_subtitle">Last Name</h3>
                <p className="profileInfo_description">{userProfile.user_last_name}</p>
            </div>
            <div className="profileInfo_container">
                <h3 className="profileInfo_subtitle">Email</h3>
                <p className="profileInfo_description">{userProfile.user_mail}</p>
            </div>
            <div className="profileInfo_container">
                <h3 className="profileInfo_subtitle">Phone</h3>
                <p className="profileInfo_description">{userProfile.user_phone}</p>
            </div>
            <div className="profileInfo_container">
                <h3 className="profileInfo_subtitle">Interests</h3>
                <p className="profileInfo_description">{
                    (userProfile.user_interests) ? userProfile.user_interests.split(";").map((interest) => {
                        return (
                            <span>{interest}</span>
                        )
                    }) : ""
                }</p>
            </div>
        </>
    )
}

export default UserProfileInfo;