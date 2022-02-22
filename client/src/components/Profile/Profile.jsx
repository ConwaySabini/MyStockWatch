import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
    const { user, isAuthenticated } = useAuth0();

    return (
        isAuthenticated && (
            <>
                <div id="Profile" class="navbar-item mb-2 ml-4 mr-3 ">
                    {/* <img src={user.picture} alt={user.name} id="profile-picture" /> */}
                    {/* <h2>{user.name}</h2>
        <p>{user.email}</p> */}
                </div>
            </>
        )
    );
}

export default Profile;
