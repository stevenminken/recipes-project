import React, {useContext, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";

const ProfilePage = ({setSearchField}) => {
    const [profileData, setProfileData] = useState({});
    const {user} = useContext(AuthContext);

    useEffect(() => {

        async function fetchProfileData() {
            const token = localStorage.getItem('token');

            try {
                const result = await axios.get(`http://localhost:3000/660/private-content`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                setProfileData(result.data);
            } catch (e) {
                console.error(e);
            }
        }

        void fetchProfileData();
    }, [])

    return (
        <main>
            <section>
                <p>test</p>
                <h2>Persoonlijke gegevens</h2>
                <p><strong>Gebruikersnaam:</strong> {user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>
                {/*<p><strong>Newsletter:</strong>{user.newsletter}</p>*/}
            </section>
            {Object.keys(profileData).length > 0 &&
                <section>
                    <h2>Strikt geheime profiel-content</h2>
                    <h3>{profileData.title}</h3>
                    <p>{profileData.content}</p>
                </section>
            }
            <button type="change">Change</button>
            {/*    TODO waardes aanpassen*/}
            <p>Terug naar de <Link to="/" onClick={() => setSearchField('curry')}>Homepagina</Link></p>
        </main>
    );
};

export default ProfilePage;