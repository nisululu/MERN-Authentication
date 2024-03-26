import React, { useEffect, useRef, useState } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { deleteFailure, deleteStart, deleteSuccess, logoutFailure, logoutSuccess, updateFailure, updateStart, updateSuccess } from '../slice/user.slice'

const Profile = ({ currentUser }) => {

  // const [formData, setFormData] = useState({
  //   email: currentUser.email,
  //   username: currentUser.username,
  // })

  const fileRef = useRef()
  const [username, setUsername] = useState(currentUser.username || "")
  const [email, setEmail] = useState(currentUser.email || "")
  const [password, setPassword] = useState("")
  const [image, setImage] = useState(undefined)
  const [loadImage, setLoadImage] = useState(0)
  const { imageError, setImgError } = useState(false)
  const [formData, setFormData] = useState({})
  const [updatedSuccess, setUpdatedSuccess] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    if (image) {
      handleImgUpload(image)
    }
  }, [image])

  const handleImgUpload = async (image) => {
    const storage = getStorage(app)
    const fileName = new Date().getTime() + image.name
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, image)

    uploadTask.on('stage_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      setLoadImage(Math.round(progress))
    },
      (error) => {
        setImgError(true)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, profilePicture: downloadURL })
        })
      })
  }

  const handleUpdate = async (e) => {
    e.preventDefault()

    try {
      dispatch(updateStart())
      const userData = {
        email,
        username,
        password,
        profilePicture: formData.profilePicture
      }

      const config = { headers: { "Content-Type": "application/json" } }
      const { data } = await axios.put(`/api/user/update/${currentUser._id}`, userData, config)
      console.log(data);

      dispatch(updateSuccess(data.rest))
      setUpdatedSuccess(true)

    } catch (err) {
      dispatch(updateFailure(err))
      console.log(err);
    }

  }

  const handleLogout = async () => {
    try {
      const { data } = await axios.get('/api/user/logout')
      if (data) {
        dispatch(logoutSuccess())
      }
    } catch (err) {
      dispatch(logoutFailure())
    }
  }

  const handleDelete = async () => {
    try {
      dispatch(deleteStart())
      const { data } = await axios.delete(`/api/user/delete/${currentUser._id}`)
      if (data) {
        dispatch(deleteSuccess())
      }
    } catch (err) {
      dispatch(deleteFailure(err))
    }
  }

  return (
    <div className=''>
      <h1 className='text-xl sm:text-2xl font-semibold text-center my-7'>{currentUser.username}'s Profile</h1>

      <form onSubmit={handleUpdate} className='flex flex-col mt-10 max-w-80 mx-auto sm:max-w-lg space-y-5 hover:cursor-pointer'>
        <input type='file' ref={fileRef} hidden accept='image/*' onChange={(e) => setImage(e.target.files[0])} />
        <img
          className='rounded-full w-40 h-40 self-center object-cover'
          src={formData.profilePicture || currentUser.profilePicture}
          alt=""
          onClick={() => fileRef.current.click()}
        />

        <div className="text-center">
          {
            loadImage > 0 && loadImage < 100 ? (
              <span>{`Uploading image ${loadImage}%`}</span>) : (loadImage === 100 ? <span className='text-green-600'>Image uploaded successfully</span> : "")
          }
        </div>

        <div className="mt-2">
          <input
            onChange={(e) => setUsername(e.target.value)}
            name='username'
            type="username"
            placeholder='username'
            value={username}
            required
            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>

        <div className="mt-2">
          <input
            onChange={(e) => setEmail(e.target.value)}
            name='email'
            type="email"
            placeholder='email'
            value={email}
            required
            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>

        <div className="mt-2">
          <input
            onChange={(e) => setPassword(e.target.value)}
            name='password'
            type="password"
            placeholder='password'
            value={password}
            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>

        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Update
        </button>

        <div className='flex justify-between'>
          <span className='text-red-600' onClick={handleDelete}>Delete Account</span>
          <span className='text-red-600' onClick={handleLogout}>Logout</span>
        </div>
      {updatedSuccess && <span className='text-green-500'>Profile Updated Successfully</span>}
      </form>
    </div>
  )
}

export default Profile
