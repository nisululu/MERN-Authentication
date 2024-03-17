import axios from 'axios'
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { signInFailure, signInStart, signInSuccess } from '../slice/user.slice'

const Signin = () => {

  const [formData, setFormData] = useState({})
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {currentUser, loading, error} = useSelector((state)=> state.user)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      dispatch(signInStart())
      const config = { headers: { "Content-Type": "application/json" } }
      const { data } = await axios.post('/api/auth/signin', formData, config)

      dispatch(signInSuccess(data))
      navigate('/')

    } catch (err) {
      console.log(err);
      dispatch(signInFailure(err.response.data.message))
    }
  }

  return (
    <div className='min-h-full flex flex-col justify-center px-6 pt-20 lg:px-8'>

      <div>
        <h2 className='text-center text-2xl font-bold leading-9 tracking-tight'>Sign in</h2>
      </div>

      <div className='mt-10 max-w-sm sm:mx-auto sm:w-full sm:max-w-md'>
        <form className='space-y-5' onSubmit={handleSubmit}>

          <div>
            <label className='font-medium text-small text-gray-900'>Email</label>
            <div className="mt-2">
              <input
                onChange={handleChange}
                name='email'
                type="email"
                required
                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label className='font-medium text-small text-gray-900'>Password</label>
            <div className="mt-2">
              <input
                onChange={handleChange}
                name='password'
                type="password"
                required
                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {loading ? "Loading..." : "Sign in"}
            </button>
          </div>

          <div className='flex justify-between'>
            <p>Already have an account?</p>
            <Link to='/sign-up'>Sign up</Link>
          </div>

          <div>
            {error && <p className='text-red-700'>{error || "Something went wrong."}</p>}
          </div>
        </form>
      </div>

    </div>
  )
}

export default Signin
