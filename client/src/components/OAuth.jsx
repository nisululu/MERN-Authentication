import React from 'react'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase'
import axios from 'axios'
import {  useDispatch } from 'react-redux'
import { signInSuccess } from '../slice/user.slice'
import { useNavigate } from 'react-router-dom'

const OAuth = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleAuth = () => {
        const provider = new GoogleAuthProvider()
        const auth = getAuth(app)
        signInWithPopup(auth, provider)
            .then(async (res) => {
                const result = res.user
                const userData = {
                    name: result.displayName,
                    email: result.email,
                    photo: result.photoURL
                }

                const config = { headers: { "Content-Type": "application/json" } }
                const { data } = await axios.post('/api/auth/google', userData, config)

                dispatch(signInSuccess(data))
                navigate('/')
            }).catch((err) => {
                console.log(err);
            })
    }

    return <button
        type="button"
        onClick={handleAuth}
        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
        Continue with Google
    </button>
}

export default OAuth
