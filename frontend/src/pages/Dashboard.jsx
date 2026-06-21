import { GlassCard } from '../components/ui/GlassCard'
import {
  MOCK_ATTENDANCE, MOCK_MARKS, MOCK_DAILY_TIMETABLE,
  GRADE_POINTS, getGrade
} from '../data/mockData'
import { getGreeting } from '../lib/utils'
import { Clock, BookOpen, ArrowRight, Calendar, AlertCircle, TrendingUp } from 'lucide-react'

export const Dashboard = ({ student }) => {
  const name = student?.name || 'Student'
  const cgpa = student?.cgpa || 0

  // moved inside component (no useMemo needed yet)
  const overallAtt = Math.round(
    MOCK_ATTENDANCE.reduce((a, s) => a + s.attended, 0) /
    MOCK_ATTENDANCE.reduce((a, s) => a + s.conducted, 0) * 100
  )
  const totalCredits = MOCK_MARKS.reduce((a, m) => a + m.credits, 0)
  const sgpa = (MOCK_MARKS.reduce((a, m) => a + (GRADE_POINTS[m.grade] || 0) * m.credits, 0) / totalCredits).toFixed(2)

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' })
  const todaySchedule = MOCK_DAILY_TIMETABLE[today] || MOCK_DAILY_TIMETABLE['Monday']
  const lowAtt = MOCK_ATTENDANCE.filter(s => s.percentage < 75)
  const mlMarks = MOCK_MARKS.find(m => m.code === 'CS605')

  return (
    <div className="space-y-8">
      {/* Header */}
      <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <p className="text-xs font-semibold text-brand-400 uppercase tracking-widest mb-2">
            {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}
          </p>
          <h2 className="text-4xl font-black tracking-tight">
            {getGreeting()}, {name.split(' ')[0]} 👋
          </h2>
          <p className="text-zinc-400 mt-2 font-medium">Here's a quick overview of your academic status.</p>
        </div>
        <div className="flex items-center gap-8 bg-zinc-900/50 border border-zinc-800 p-5 rounded-2xl">
          <div className="text-right">
            <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">Current CGPA</p>
            <p className="text-3xl font-black text-brand-400">{cgpa}</p>
          </div>
          <div className="w-px h-10 bg-zinc-800" />
          <div className="text-right">
            <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">Attendance</p>
            <p className={`text-3xl font-black ${overallAtt >= 75 ? 'text-emerald-400' : 'text-red-400'}`}>{overallAtt}%</p>
          </div>
          <div className="w-px h-10 bg-zinc-800" />
          <div className="text-right">
            <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">SGPA</p>
            <p className="text-3xl font-black text-blue-400">{sgpa}</p>
          </div>
        </div>
      </header>

      {/* Alerts */}
      {lowAtt.length > 0 && (
        <div className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-amber-500/5 border border-amber-500/15">
          <AlertCircle size={18} className="text-amber-400 shrink-0" />
          <p className="text-sm text-amber-300">
            <span className="font-bold">Attendance alert: </span>
            {lowAtt.map(s => s.code).join(', ')} {lowAtt.length === 1 ? 'is' : 'are'} below 75%.
            Attend more classes to avoid detainment.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Hero next class card */}
          <GlassCard className="p-8 bg-brand-600 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[80px] rounded-full -mr-20 -mt-20 group-hover:scale-110 transition-transform duration-700" />
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <span className="px-3 py-1 rounded-full bg-white/20 text-white text-[10px] font-bold uppercase tracking-widest">
                  Semester 6 · {new Date().toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
                </span>
                <h3 className="text-3xl font-black text-white mt-4">
                  {todaySchedule[0]?.subject || 'No classes today'}
                </h3>
                <p className="text-brand-100 font-medium mt-1">
                  {todaySchedule[0] ? `${todaySchedule[0].room} · ${todaySchedule[0].instructor}` : 'Enjoy your day!'}
                </p>
              </div>
              <div className="flex flex-col items-start md:items-end gap-2">
                <span className="px-4 py-2 rounded-xl bg-white/15 text-white text-sm font-bold">
                  {todaySchedule[0]?.time || ''} – {todaySchedule[0]?.end || ''}
                </span>
                <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wide ${
                  todaySchedule[0]?.type === 'Lab' ? 'bg-cyan-400/20 text-cyan-200' : 'bg-white/10 text-white/80'
                }`}>
                  {todaySchedule[0]?.type || 'Lecture'}
                </span>
              </div>
            </div>
          </GlassCard>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Academic Alerts */}
            <GlassCard className="p-6 border-zinc-800/50">
              <h3 className="text-sm font-black uppercase tracking-widest mb-5 flex items-center gap-2 text-zinc-400">
                <AlertCircle size={16} className="text-amber-400" /> Academic Alerts
              </h3>
              <div className="space-y-3">
                {lowAtt.length > 0
                  ? lowAtt.map((s, i) => (
                    <div key={i} className="p-4 rounded-xl border bg-amber-500/5 border-amber-500/10 text-amber-400">
                      <p className="text-[10px] font-black uppercase tracking-widest mb-1">Attendance Warning</p>
                      <p className="text-xs font-medium text-zinc-300">{s.subject}: {s.percentage.toFixed(1)}%</p>
                    </div>
                  ))
                  : (
                    <div className="p-4 rounded-xl border bg-emerald-500/5 border-emerald-500/10 text-emerald-400">
                      <p className="text-[10px] font-black uppercase tracking-widest mb-1">All Good!</p>
                      <p className="text-xs font-medium text-zinc-300">All subjects above 75% attendance</p>
                    </div>
                  )
                }
                <div className="p-4 rounded-xl border bg-blue-500/5 border-blue-500/10 text-blue-400">
                  <p className="text-[10px] font-black uppercase tracking-widest mb-1">Internal Marks</p>
                  <p className="text-xs font-medium text-zinc-300">
                    {mlMarks ? `ML Internals: ${mlMarks.internal}/60 · ${mlMarks.grade} Grade` : 'No internal marks recorded yet'}
                  </p>
                </div>
              </div>
            </GlassCard>

            {/* Recent Grades */}
            <GlassCard className="p-6 border-zinc-800/50">
              <h3 className="text-sm font-black uppercase tracking-widest mb-5 flex items-center gap-2 text-zinc-400">
                <BookOpen size={16} className="text-brand-400" /> Recent Grades
              </h3>
              <div className="space-y-3">
                {MOCK_MARKS.slice(0, 4).map((mark, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-zinc-900/30 border border-zinc-800/50">
                    <div>
                      <p className="text-xs font-bold text-zinc-200">{mark.subject.split(' ').slice(0, 2).join(' ')}</p>
                      <p className="text-[10px] text-zinc-500 font-medium">{mark.total}/{mark.maxTotal}</p>
                    </div>
                    <span className={`text-sm font-black ${
                      mark.grade === 'O' || mark.grade === 'A+' ? 'text-brand-400' :
                      mark.grade === 'A' ? 'text-emerald-400' :
                      mark.grade === 'B+' ? 'text-amber-400' : 'text-zinc-400'
                    }`}>{mark.grade}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>

        {/* Today's schedule timeline */}
        <div className="space-y-6">
          <GlassCard className="p-6">
            <h3 className="text-sm font-black uppercase tracking-widest mb-6 flex items-center gap-2 text-zinc-400">
              <Calendar size={16} className="text-brand-400" /> Today's Schedule
            </h3>
            <div className="space-y-5">
              {(todaySchedule.slice(0, 4)).map((item, i) => {
                const now = new Date()
                const nowMins = now.getHours() * 60 + now.getMinutes()
                const [sh, sm] = item.time.split(':').map(Number)
                const [eh, em] = item.end.split(':').map(Number)
                const isNow = nowMins >= sh * 60 + sm && nowMins < eh * 60 + em
                const isPast = nowMins >= eh * 60 + em
                return (
                  <div key={i} className="flex gap-4 group">
                    <div className="flex flex-col items-center">
                      <div className={`w-3 h-3 rounded-full mt-1.5 shrink-0 ${
                        isNow ? 'bg-brand-500 ring-4 ring-brand-500/20' :
                        isPast ? 'bg-zinc-700' : 'bg-zinc-800'
                      }`} />
                      {i < todaySchedule.slice(0, 4).length - 1 && <div className="w-0.5 flex-1 bg-zinc-800 my-1" />}
                    </div>
                    <div className="pb-4">
                      <p className={`text-[10px] font-black uppercase tracking-widest ${
                        isNow ? 'text-brand-400' : isPast ? 'text-zinc-600' : 'text-zinc-500'
                      }`}>{item.time}</p>
                      <h4 className={`font-bold mt-0.5 text-sm ${isPast ? 'text-zinc-600' : 'text-zinc-200'}`}>
                        {item.subject.split(' ').slice(0, 3).join(' ')}
                      </h4>
                      <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-tighter mt-0.5">
                        {item.room} · {item.type}
                        {isNow && <span className="ml-2 text-brand-400">● LIVE</span>}
                      </p>
                    </div>
                  </div>
                )
              })}
              {todaySchedule.length === 0 && (
                <p className="text-zinc-600 text-sm text-center py-4">No classes today</p>
              )}
            </div>
          </GlassCard>

          {/* Quick stats */}
          <GlassCard className="p-6">
            <h3 className="text-sm font-black uppercase tracking-widest mb-4 text-zinc-400">
              Quick Stats
            </h3>
            <div className="space-y-3">
              {[
                { label: 'Classes Today',   value: todaySchedule.length, color: 'text-brand-400' },
                { label: 'Subjects',         value: MOCK_MARKS.length,    color: 'text-emerald-400' },
                { label: 'Total Credits',    value: totalCredits,          color: 'text-amber-400' },
              ].map((s, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-zinc-800/50 last:border-0">
                  <span className="text-xs text-zinc-500 font-medium">{s.label}</span>
                  <span className={`text-lg font-black ${s.color}`}>{s.value}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  )
}
