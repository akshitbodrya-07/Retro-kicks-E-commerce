import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FaGoogle } from "react-icons/fa"
import { AiFillFacebook } from "react-icons/ai"
import { FaXTwitter } from "react-icons/fa6"
import { useAuth } from '../context/AuthContext'
import { API_URL } from '../config'

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [serverError, setServerError] = useState(null)
  const navigate = useNavigate()
  const { login } = useAuth()

  const loginSchema = z.object({
    email: z.string().email('Please enter a valid email'),
    password: z.string().min(8, 'Password must be at least 8 characters')
  })

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema)
  })

  const onSubmit = async (data) => {
    setServerError(null)
    try {
      if (isLogin) {
        const res = await fetch(`${API_URL}/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: data.email, password: data.password })
        })
        if (!res.ok) throw new Error('Invalid email or password')
        const result = await res.json()
        login(result.access_token)
        navigate('/shop')
      } else {
        const signupRes = await fetch(`${API_URL}/signup`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: data.email, password: data.password })
        })
        if (!signupRes.ok) {
          const errData = await signupRes.json()
          throw new Error(errData.detail || 'Signup failed')
        }

        const loginRes = await fetch(`${API_URL}/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: data.email, password: data.password })
        })
        const loginResult = await loginRes.json()
        login(loginResult.access_token)
        navigate('/shop')
      }
    } catch (err) {
      setServerError(err.message)
    }
  }

  return (
    <div className='flex items-center justify-center'>
      <div className='bg-zinc-900 flex flex-col items-center gap-4 rounded-xl mt-20 w-full max-w-md py-8'>
        <div className='flex flex-col items-center gap-2'>
          <h1 className='text-2xl font-bold tracking-widest'>RETRO <span className='text-2xl tracking-widest text-red-500 font-bold'>KICKS</span></h1>
          <p className='text-sm text-zinc-500'>Sign in to your account</p>
        </div>

        <div className='w-full px-10 flex justify-center items-center'>
          <button
          onClick={() => setIsLogin(true)}
          className={`px-4 py-3 flex-1 text-sm border-b ${isLogin ? 'border-red-500 text-white' : 'border-zinc-500 text-zinc-500'}`}>Login</button>
          <button
          onClick={() => setIsLogin(false)}
          className={`px-4 py-3 flex-1 text-sm border-b ${!isLogin ? 'border-red-500 text-white' : 'border-zinc-500 text-zinc-500'}`}>Sign Up</button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2 px-10 py-4 w-full'>
          {!isLogin && (
            <>
              <h1 className='text-sm text-zinc-500 uppercase tracking-wide'>Full Name</h1>
              <input type="text" placeholder='John Doe' className='px-4 py-2 bg-zinc-800 border border-zinc-700 rounded mb-2'/>
            </>
          )}
          <h1 className='text-sm text-zinc-500 uppercase tracking-wide'>Email Address</h1>
          <input type="email" placeholder='john@example.com' className='px-4 py-2 bg-zinc-800 border border-zinc-700 rounded' {...register('email')}/>
          {errors.email && (
            <p className='text-red-500 text-xs mt-1'>{errors.email.message}</p>
          )}
          <h1 className='text-sm text-zinc-500 uppercase tracking-wide mt-2'>Password</h1>
          <input type="password" placeholder='Password' className='px-4 py-2 bg-zinc-800 border border-zinc-700 rounded' {...register('password')}/>
          {errors.password && (
            <p className='text-red-500 text-xs mt-1'>{errors.password.message}</p>
          )}
          {serverError && (
            <p className='text-red-500 text-xs mt-1'>{serverError}</p>
          )}
          <button className='bg-red-500 p-2 rounded mt-4'>{isLogin? 'Sign In' : 'Create Account'}</button>
        </form>

        <div className='px-10 border-t border-zinc-500/50'>
          <div className='flex justify-center mt-4'>
            <p className='text-sm text-zinc-500'>Don't have an account? <span className='text-red-500 cursor-pointer'>Sign Up</span></p>
          </div>

          <div className='flex justify-center mt-2'>
            <p className='text-xs text-red-500 cursor-pointer underline'>Reset Password</p>
          </div>

          <div className='flex justify-center mt-5'>
            <p className='text-sm text-zinc-500'>Or sign in with</p>
          </div>

          <div className='flex justify-center items-center gap-5 mt-5'>
            <FaGoogle size={24}/>
            <AiFillFacebook size={28}/>
            <FaXTwitter size={24}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth
