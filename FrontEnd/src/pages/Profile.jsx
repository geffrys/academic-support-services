import React from "react";
import { useEffect, useState } from "react";
import useUser from "../Hooks/useUser";
import { useAuth } from "../context/AuthContext";
import "../css/Profile.css";
import EditUser from "../components/EditUser";
import UserProfileInfo from "../components/UserProfileInfo";

function Profile() {
  const { user } = useAuth();
  // to avoid constantly refreshing propagated by useEffect hook in useAuth
  const userId = user.id;
  const [isEdit, setEdit] = useState(false);
  const userProfile = useUser(userId, isEdit);
  const [userImg, setUserImg] = useState(null);

  return (
    <section className="profile">
      <section className="profile_container">
        <header className="profileTitle_container">
          {isEdit ? <h2>Edit Profile</h2> : <h2>Profile</h2>}
        </header>

        <section className="profile_content_container">
          <aside className="profilePicture_container">
            <img
              src={
                userProfile && userProfile.user_img
                  ? `${userProfile.user_img}`
                  : "../../public/images/6d73f20813d7e26c3a5de4f382a5d705_360_360.png"
              }
              alt="profile picture"
            />
          </aside>
          <article>
            {!isEdit ? (
              <UserProfileInfo userProfile={userProfile} />
            ) : (
              <EditUser userProfile={userProfile} setEdit={setEdit} />
            )}
          </article>
        </section>
        <div className="profile__button">
          {!isEdit ? (
            <button
              className="submit_button"
              onClick={() => {
                setEdit(!isEdit);
              }}
            >
              Edit profile
            </button>
          ) : (
            ""
          )}
        </div>
      </section>
    </section>
  );
}

export default Profile;