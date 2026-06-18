import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Eye, EyeOff, ArrowRight, GraduationCap, Lock } from 'lucide-react'

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1'

export const Login = ({ onLogin }) => {
  const [studentId, setStudentId]   = useState('')
  const [password, setPassword]     = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading]   = useState(false)
  const [error, setError]           = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!studentId.trim() || !password.trim()) {
      setError('Please enter your Student ID and password.')
      return
    }
    setIsLoading(true)
    try {
      const res  = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId: studentId.trim().toUpperCase(), password }),
      })
      const json = await res.json()
      if (!res.ok || !json.data) {
        setError(json.message || 'Invalid credentials. Please try again.')
        return
      }
      const studentData = json.data?.student || {}
      sessionStorage.setItem('student', JSON.stringify(studentData))
      sessionStorage.setItem('isLoggedIn', 'true')
      onLogin(studentData)
    } catch {
      setError('Cannot reach server. Make sure the backend is running on port 8080.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4"
      style={{ background: '#09090b' }}>
      {/* Glow orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-500/10 blur-[120px] rounded-full animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-500/8 blur-[120px] rounded-full animate-pulse-slow pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex w-16 h-16 bg-brand-600 rounded-2xl items-center justify-center shadow-2xl shadow-brand-500/40 mb-6">
            <Sparkles className="text-white w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome to Sridevi</h1>
          <p className="text-zinc-400">Sign in to access your student dashboard</p>
        </div>

        {/* Card */}
        <div className="glass-card p-8">
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Student ID */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300 ml-1">Student ID</label>
              <div className="relative">
                <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                <input
                  type="text"
                  required
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value.toUpperCase())}
                  placeholder="22B81A05H7"
                  autoFocus
                  autoComplete="username"
                  className="w-full glass-input pl-12 font-mono tracking-wider"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300 ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="w-full glass-input pl-12 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Forgot password row */}
            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-600 text-xs">Sridevi Institute of Engineering</span>
              <a href="#" className="text-brand-400 hover:text-brand-300 font-medium">Forgot password?</a>
            </div>

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/8 border border-red-500/20 text-red-400 text-sm"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                {error}
              </motion.div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-brand-600 hover:bg-brand-500 text-white font-semibold py-3.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-brand-600/20 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Sign In <ArrowRight size={18} /></>
              )}
            </button>
          </form>
        </div>

        <p className="text-center mt-6 text-zinc-600 text-sm">
          Having trouble? <a href="#" className="text-brand-400 font-medium">Contact administration</a>
        </p>
      </motion.div>
    </div>
  )
}
