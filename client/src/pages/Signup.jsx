import axios from 'axios'
import React, { useState } from 'react'
import {Link} from 'react-router-dom'


const Signup = () => {

  const [formData, setFormData] = useState({})
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(null)

  const handleChange = (e) => {
    setFormData({...formData,[e.target.name] : e.target.value})
    setError(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()    

    try{
      setLoading(true)
      setError(false)
      const config = { headers: { "Content-Type": "application/json" } }
      const {data} = await axios.post('/api/auth/signup',formData, config)
      if(data){
        console.log(data);
        setLoading(false)
      }
    }catch(err) {
      setLoading(false)
      setError(true)
      console.log(err.response.data);
    }
  }

  return (
    <div className='min-h-full flex flex-col justify-center px-6 pt-20 lg:px-8'>
      
      <div>
        <h2 className='text-center text-2xl font-bold leading-9 tracking-tight'>Sign up to create new account</h2>
      </div>

      <div className='mt-10 max-w-sm sm:mx-auto sm:w-full sm:max-w-md'>
        <form className='space-y-5' onSubmit={handleSubmit}>
          <div>
          <label className='font-medium text-small text-gray-900'>User Name</label>
            <div className="mt-2">
              <input
                onChange={handleChange}
                name="username"
                type="text"
                required
                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

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
                {loading? "Loading..." : "Sign up"}
              </button>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Continue with Google
              </button>
            </div>

            <div className='flex justify-between'>
              <p>Have an account?</p>
              <Link to='/sign-in'>Sign in</Link>
            </div>

            <div>
              {error && <p className='text-red-700'>Ops, something went wrong.</p>}
            </div>
        </form>
      </div>

    </div>
  )
}

export default Signup
