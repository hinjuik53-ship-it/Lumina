import { GlassCard } from '../components/ui/GlassCard'
import { MOCK_STUDENT, MOCK_ATTENDANCE, MOCK_MARKS, GRADE_POINTS } from '../data/mockData'
import { Mail, Phone, Calendar, ShieldCheck, MapPin } from 'lucide-react'

const totalCredits = MOCK_MARKS.reduce((a, m) => a + m.credits, 0)
const sgpa = (MOCK_MARKS.reduce((a, m) => a + (GRADE_POINTS[m.grade] || 0) * m.credits, 0) / totalCredits).toFixed(2)
const overallAtt = Math.round(
  MOCK_ATTENDANCE.reduce((a, s) => a + s.attended, 0) /
  MOCK_ATTENDANCE.reduce((a, s) => a + s.conducted, 0) * 100
)

export const Profile = ({ student }) => {
  const s = { ...MOCK_STUDENT, ...student }
  const initials = s.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()

  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-3xl font-bold">My Profile</h2>
        <p className="text-zinc-400 mt-1">Your academic profile and personal information.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: avatar card */}
        <GlassCard className="p-8 text-center" delay={0.1}>
          <div className="relative inline-block mb-6">
            <div className="w-28 h-28 rounded-3xl bg-brand-600 flex items-center justify-center mx-auto shadow-2xl shadow-brand-600/20">
              <span className="text-3xl font-black text-white">{initials}</span>
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full border-4 border-zinc-950 flex items-center justify-center">
              <ShieldCheck size={14} className="text-white" />
            </div>
          </div>
          <h3 className="text-2xl font-bold">{s.name}</h3>
          <p className="text-zinc-500 font-medium mt-1 mb-1 font-mono text-sm">{s.rollNumber}</p>
          <p className="text-zinc-600 text-xs mb-6">{s.program} · Sem {s.semester}</p>

          <div className="space-y-3 pt-6 border-t border-zinc-800">
            <div className="flex items-center gap-3 text-zinc-400 text-sm">
              <Mail size={15} className="text-zinc-600 shrink-0" />
              <span className="truncate">{s.email}</span>
            </div>
            <div className="flex items-center gap-3 text-zinc-400 text-sm">
              <Phone size={15} className="text-zinc-600 shrink-0" />
              <span>{s.phone}</span>
            </div>
            <div className="flex items-center gap-3 text-zinc-400 text-sm">
              <MapPin size={15} className="text-zinc-600 shrink-0" />
              <span>Sridevi Campus</span>
            </div>
          </div>
        </GlassCard>

        {/* Right: details */}
        <div className="lg:col-span-2 space-y-6">
          <GlassCard className="p-8" delay={0.2}>
            <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Calendar size={20} className="text-brand-400" /> Academic Details
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: 'Department',       value: s.department },
                { label: 'Program',          value: s.program    },
                { label: 'Current Semester', value: `Semester ${s.semester}` },
                { label: 'Section',          value: s.section    },
                { label: 'Academic Advisor', value: s.advisor    },
                { label: 'Batch',            value: s.batch      },
                { label: 'Student ID',       value: s.id, mono: true },
                { label: 'Roll Number',      value: s.rollNumber, mono: true },
              ].map((item, i) => (
                <div key={i}>
                  <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider mb-1">{item.label}</p>
                  <p className={`text-base font-semibold text-zinc-200 ${item.mono ? 'font-mono' : ''}`}>{item.value}</p>
                </div>
              ))}
            </div>
          </GlassCard>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <GlassCard className="p-6 bg-brand-500/5 border-brand-500/20" delay={0.3}>
              <p className="text-sm font-medium text-brand-400 mb-1">CGPA</p>
              <p className="text-4xl font-black">{s.cgpa}</p>
            </GlassCard>
            <GlassCard className="p-6 bg-blue-500/5 border-blue-500/20" delay={0.35}>
              <p className="text-sm font-medium text-blue-400 mb-1">SGPA</p>
              <p className="text-4xl font-black">{sgpa}</p>
            </GlassCard>
            <GlassCard className={`p-6 ${overallAtt >= 75 ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-red-500/5 border-red-500/20'}`} delay={0.4}>
              <p className={`text-sm font-medium mb-1 ${overallAtt >= 75 ? 'text-emerald-400' : 'text-red-400'}`}>Attendance</p>
              <p className="text-4xl font-black">{overallAtt}%</p>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  )
}
