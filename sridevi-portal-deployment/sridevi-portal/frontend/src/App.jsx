import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Login }              from './pages/Login'
import { Sidebar }            from './components/layout/Sidebar'
import { Dashboard }          from './pages/Dashboard'
import { Attendance }         from './pages/Attendance'
import { Marks }              from './pages/Marks'
import { Timetable }          from './pages/Timetable'
import { Profile }            from './pages/Profile'
import { GradePredictorPage } from './pages/GradePredictorPage'
import { CGPAPredictor }      from './pages/CGPAPredictor'
import { Search, Bell }       from 'lucide-react'
import { MOCK_STUDENT }       from './data/mockData'

// Page title map
const PAGE_TITLES = {
  dashboard:       'Dashboard',
  attendance:      'Attendance',
  marks:           'Academic Marks',
  'grade-predictor':'Grade Predictor',
  'cgpa-predictor': 'CGPA Predictor',
  timetable:       'Timetable',
  profile:         'My Profile',
}

export default function App() {
  // Check if already logged in from a previous session
  const savedStudent = (() => {
    try { return JSON.parse(sessionStorage.getItem('student')) } catch { return null }
  })()
  const savedLogin = sessionStorage.getItem('isLoggedIn') === 'true'

  const [isAuthenticated, setIsAuthenticated] = useState(savedLogin && !!savedStudent)
  const [student, setStudent]                 = useState(savedLogin && !!savedStudent ? savedStudent : null)
  const [activeTab, setActiveTab]             = useState('dashboard')

  function handleLogin(studentData) {
    // studentData comes from the backend response; merge with defaults for any missing fields
    const merged = { ...MOCK_STUDENT, ...studentData }
    setStudent(merged)
    setIsAuthenticated(true)
  }

  function handleLogout() {
    sessionStorage.removeItem('student')
    sessionStorage.removeItem('isLoggedIn')
    setIsAuthenticated(false)
    setStudent(null)
    setActiveTab('dashboard')
  }

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':        return <Dashboard  student={student} />
      case 'attendance':       return <Attendance />
      case 'marks':            return <Marks />
      case 'grade-predictor':  return <GradePredictorPage />
      case 'cgpa-predictor':   return <CGPAPredictor />
      case 'timetable':        return <Timetable />
      case 'profile':          return <Profile student={student} />
      default:                 return <Dashboard student={student} />
    }
  }

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={handleLogout}
        student={student}
      />

      <main className="flex-1 ml-72 min-h-screen relative">
        {/* Top bar */}
        <header className="sticky top-0 z-40 w-full h-[72px] bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800 px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <AnimatePresence mode="wait">
              <motion.h2
                key={activeTab}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
                className="text-[15px] font-bold text-white"
              >
                {PAGE_TITLES[activeTab]}
              </motion.h2>
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
              <input
                type="text"
                placeholder="Search..."
                className="w-64 bg-zinc-900/50 border border-zinc-800 rounded-xl py-2 pl-9 pr-4 text-sm text-zinc-300 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500/50 transition-all"
              />
            </div>

            {/* Notifications */}
            <button className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white transition-colors relative">
              <Bell size={17} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-brand-500 rounded-full border-2 border-zinc-950" />
            </button>

            <div className="h-7 w-px bg-zinc-800 mx-1" />

            {/* User button */}
            <button
              onClick={() => setActiveTab('profile')}
              className="flex items-center gap-2.5 pl-2 pr-4 py-1.5 rounded-xl hover:bg-white/5 transition-all"
            >
                <div className="w-7 h-7 rounded-lg bg-brand-600 flex items-center justify-center shrink-0">
                  <span className="text-[11px] font-bold text-white">
                    {student?.name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || '?'}
                  </span>
                </div>
              <div className="text-left hidden lg:block">
                <p className="text-xs font-bold leading-none text-white">{student?.name?.split(' ')[0] || 'Student'}</p>
                <p className="text-[10px] text-zinc-500 font-medium mt-0.5">{student?.rollNumber || ''}</p>
              </div>
            </button>
          </div>
        </header>

        {/* Page content */}
        <div className="p-8 max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Background glow effects */}
        <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-brand-500/4 blur-[120px] rounded-full -z-10 pointer-events-none" />
        <div className="fixed bottom-0 left-72 w-[500px] h-[500px] bg-cyan-500/4 blur-[120px] rounded-full -z-10 pointer-events-none" />
      </main>
    </div>
  )
}
