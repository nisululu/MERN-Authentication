import axios from 'axios'
import React, { useState } from 'react'

const Signin = () => {

  const [formData, setFormData] = useState({})
  const [loading, setLoading] = useState(null)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setLoading(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try{
      const config = { headers: { "Content-Type": "application/json" } }
      const { data } = await axios.post('/api/auth/signin', formData, config)

      console.log(data);

    }catch(err) {
      console.log(err.response.data);
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
              {/* {loading ? "Loading..." : "Sign in"} */}
              Sign in
            </button>
          </div>

          <div>
            {/* {error && <p className='text-red-700'>Ops, something went wrong.</p>} */}
          </div>
        </form>
      </div>

    </div>
  )
}

export default Signin
