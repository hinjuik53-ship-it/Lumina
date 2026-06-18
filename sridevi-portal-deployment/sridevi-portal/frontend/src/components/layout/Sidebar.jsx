import { LayoutDashboard, UserCheck, GraduationCap, Calendar, User, LogOut, Sparkles, Calculator, LineChart } from 'lucide-react'

const menuItems = [
  { id: 'dashboard',       label: 'Dashboard',      icon: LayoutDashboard },
  { id: 'attendance',      label: 'Attendance',     icon: UserCheck },
  { id: 'marks',           label: 'Marks',          icon: GraduationCap },
  { id: 'grade-predictor', label: 'Grade Predictor',icon: Calculator },
  { id: 'cgpa-predictor',  label: 'CGPA Predictor', icon: LineChart },
  { id: 'timetable',       label: 'Timetable',      icon: Calendar },
  { id: 'profile',         label: 'My Profile',     icon: User },
]

export const Sidebar = ({ activeTab, setActiveTab, onLogout, student }) => {
  const name = student?.name || 'Student'
  const rollNumber = student?.rollNumber || ''
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()

  return (
    <aside className="fixed left-0 top-0 h-screen w-72 bg-zinc-950 border-r border-zinc-800 p-6 flex flex-col z-50">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-8 px-2">
        <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center shadow-lg shadow-brand-500/20">
          <Sparkles className="text-white w-5 h-5" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white">Sridevi</h1>
          <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold">Student Portal</p>
        </div>
      </div>

      {/* Student card */}
      <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-zinc-900/50 border border-zinc-800 mb-6">
        <div className="w-9 h-9 rounded-lg bg-brand-600 flex items-center justify-center shrink-0">
          <span className="text-[13px] font-bold text-white">{initials}</span>
        </div>
        <div className="min-w-0">
          <p className="text-[13px] font-semibold text-white truncate">{name}</p>
          <p className="text-[10px] text-zinc-500 font-mono">{rollNumber}</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1 overflow-y-auto">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
          >
            <item.icon size={19} />
            <span className="font-medium text-[13.5px]">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Logout */}
      <button
        onClick={onLogout}
        className="mt-4 flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-500 hover:text-red-400 hover:bg-red-400/5 transition-all duration-200"
      >
        <LogOut size={19} />
        <span className="font-medium text-[13.5px]">Sign Out</span>
      </button>
    </aside>
  )
}
