import { GlassCard } from '../components/ui/GlassCard'
import { MOCK_ATTENDANCE } from '../data/mockData'
import { CheckCircle2, AlertCircle, Info } from 'lucide-react'

const TARGET = 75

function calcStats(attended, conducted) {
  const pct = (attended / conducted) * 100
  if (pct >= TARGET) {
    const margin = Math.floor((attended / (TARGET / 100)) - conducted)
    return { margin, required: 0 }
  }
  const required = Math.ceil((0.75 * conducted - attended) / 0.25)
  return { margin: 0, required }
}

export const Attendance = () => {
  const overall = Math.round(
    MOCK_ATTENDANCE.reduce((a, s) => a + s.attended, 0) /
    MOCK_ATTENDANCE.reduce((a, s) => a + s.conducted, 0) * 100
  )

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">Attendance</h2>
          <p className="text-zinc-400 mt-1">Subject-wise attendance tracking · Semester 6</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-brand-500/10 border border-brand-500/20 rounded-xl">
            <Info size={15} className="text-brand-400" />
            <span className="text-xs font-bold text-brand-400 uppercase tracking-wider">Target: {TARGET}%</span>
          </div>
          <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border ${
            overall >= TARGET ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-red-500/10 border-red-500/20'
          }`}>
            <span className={`text-xs font-bold uppercase tracking-wider ${overall >= TARGET ? 'text-emerald-400' : 'text-red-400'}`}>
              Overall: {overall}%
            </span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-4">
        {MOCK_ATTENDANCE.map((record, i) => {
          const { margin, required } = calcStats(record.attended, record.conducted)
          const isSafe = record.percentage >= TARGET

          return (
            <GlassCard key={record.code} delay={i * 0.05} className="p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              {/* Subject info */}
              <div className="flex items-center gap-4 min-w-[280px]">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                  isSafe ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'
                }`}>
                  {isSafe ? <CheckCircle2 size={24} /> : <AlertCircle size={24} />}
                </div>
                <div>
                  <h4 className="font-bold text-lg text-white leading-tight">{record.subject}</h4>
                  <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mt-1">
                    {record.code} · {record.attended}/{record.conducted} classes
                  </p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="flex-1 w-full max-w-md">
                <div className="flex justify-between text-xs mb-2 font-black uppercase tracking-widest">
                  <span className="text-zinc-500">Attendance</span>
                  <span className={isSafe ? 'text-emerald-400' : 'text-red-400'}>{record.percentage.toFixed(1)}%</span>
                </div>
                <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ${isSafe ? 'bg-emerald-500' : 'bg-red-500'}`}
                    style={{ width: `${Math.min(record.percentage, 100)}%` }}
                  />
                </div>
                {/* 75% marker */}
                <div className="relative mt-1">
                  <div className="absolute h-2 border-l border-dashed border-zinc-600" style={{ left: '75%', top: -10 }} />
                  <p className="text-[9px] text-zinc-600 absolute" style={{ left: 'calc(75% + 2px)', top: -9 }}>75%</p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-8 lg:gap-12 min-w-[200px]">
                <div className="text-center lg:text-left">
                  <p className="text-[10px] text-zinc-500 uppercase font-black tracking-widest mb-1">Can Miss</p>
                  <p className={`text-2xl font-black ${margin > 0 ? 'text-emerald-400' : 'text-zinc-700'}`}>
                    {margin} <span className="text-[10px] font-bold text-zinc-500">classes</span>
                  </p>
                </div>
                <div className="text-center lg:text-left">
                  <p className="text-[10px] text-zinc-500 uppercase font-black tracking-widest mb-1">Need</p>
                  <p className={`text-2xl font-black ${required > 0 ? 'text-red-400' : 'text-zinc-700'}`}>
                    {required} <span className="text-[10px] font-bold text-zinc-500">more</span>
                  </p>
                </div>
              </div>
            </GlassCard>
          )
        })}
      </div>
    </div>
  )
}
