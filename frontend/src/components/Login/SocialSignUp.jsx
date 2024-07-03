
import React, { useState } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { FaFacebook, FaGoogle } from 'react-icons/fa';
import { END_POINT } from '../../config';
import { useNavigate } from 'react-router-dom';
import { signGoogle } from '../../api/api_user';
import auth from '../auth/authHelper';

const App = () => {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const navigate = useNavigate();

    const fetchGoogleUserInfo = async (accessToken) => {
        try {
            const res = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    Accept: 'application/json',
                },
            });
            return res.data;
        } catch (error) {
            console.error('Error fetching Google user info:', error);
            throw error;
        }
    };

    const sendFormDataToEndpoint = async (formData) => {
        try {
            signGoogle(formData).then((data) => {
                if (data) {
                    auth.authenticate('jwt', data);
                    navigate('/');
                }
            })
        } catch (error) {
            console.error('Error sending form data to endpoint:', error);
            throw error;
        }
    };

    const login = useGoogleLogin({
        onSuccess: async (codeResponse) => {
            try {
                setUser(codeResponse);
                const userInfo = await fetchGoogleUserInfo(codeResponse.access_token);
                setProfile(userInfo);

                const form = {
                    fullName: userInfo.name,
                    email: userInfo.email,
                    provider: 'google',
                    googleId: userInfo.id,
                    mobile: '',
                    file: '',
                    gender: '',
                    city: '',
                    state: '',
                    zipcode: '',
                    country: '',
                    address: '',
                    link: ''
                };

                await sendFormDataToEndpoint(form);
            } catch (error) {
                console.error('Error in async operations:', error);
            }
        },
        onError: (error) => console.log('Login Failed:', error),
    });

    return (
        <div className='social-media'>
            <button className="social-icon" onClick={login}><FaGoogle /> </button>
            <a href={`${END_POINT}/auth/facebook`}>
                <div className="social-icon">
                    <FaFacebook />
                </div>
            </a>
        </div>
    )
}
export default App;