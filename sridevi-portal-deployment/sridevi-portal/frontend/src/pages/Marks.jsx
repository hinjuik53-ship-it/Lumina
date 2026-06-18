import { GlassCard } from '../components/ui/GlassCard'
import { MOCK_MARKS, MOCK_STUDENT, GRADE_POINTS } from '../data/mockData'
import { TrendingUp } from 'lucide-react'

const totalCredits = MOCK_MARKS.reduce((a, m) => a + m.credits, 0)
const sgpa = (MOCK_MARKS.reduce((a, m) => a + (GRADE_POINTS[m.grade] || 0) * m.credits, 0) / totalCredits).toFixed(2)

export const Marks = () => {
  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-3xl font-bold">Academic Marks</h2>
        <p className="text-zinc-400 mt-1">Subject-wise marks breakdown · Semester 6</p>
      </header>

      {/* Summary row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'CGPA',       value: MOCK_STUDENT.cgpa, color: 'text-brand-400',   bg: 'bg-brand-500/5 border-brand-500/20' },
          { label: 'SGPA',       value: sgpa,              color: 'text-emerald-400', bg: 'bg-emerald-500/5 border-emerald-500/20' },
          { label: 'Credits',    value: totalCredits,      color: 'text-amber-400',   bg: 'bg-amber-500/5 border-amber-500/20' },
          { label: 'Subjects',   value: MOCK_MARKS.length, color: 'text-blue-400',    bg: 'bg-blue-500/5 border-blue-500/20' },
        ].map((s, i) => (
          <GlassCard key={i} delay={i * 0.07} className={`p-5 ${s.bg}`}>
            <p className={`text-3xl font-black ${s.color}`}>{s.value}</p>
            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mt-1">{s.label}</p>
          </GlassCard>
        ))}
      </div>

      {/* Marks table */}
      <GlassCard className="overflow-hidden border-zinc-800/50">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-900/40">
                <th className="px-6 py-5 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Subject</th>
                <th className="px-6 py-5 text-[10px] font-black text-zinc-500 uppercase tracking-widest text-center">Code</th>
                <th className="px-6 py-5 text-[10px] font-black text-zinc-500 uppercase tracking-widest text-center">Cr</th>
                <th className="px-6 py-5 text-[10px] font-black text-zinc-500 uppercase tracking-widest text-right">Internal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {MOCK_MARKS.map((mark, i) => (
                <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-6 py-4">
                    <p className="font-bold text-zinc-100 group-hover:text-brand-400 transition-colors">{mark.subject}</p>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-[10px] font-black text-zinc-500 uppercase tracking-wider px-2 py-1 rounded bg-zinc-900">{mark.code}</span>
                  </td>
                  <td className="px-6 py-4 text-center text-zinc-400 font-bold">{mark.credits}</td>
                  <td className="px-6 py-4 text-right text-zinc-300 font-bold">{mark.internal}<span className="text-zinc-600 text-xs">/60</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* Grade scale reference */}
      <GlassCard className="p-6 border-zinc-800/50">
        <h4 className="text-xs font-black uppercase tracking-widest mb-4 text-zinc-500 flex items-center gap-2">
          <TrendingUp size={14} className="text-brand-400" /> Grading Scale (Anna University)
        </h4>
        <div className="flex flex-wrap gap-3">
          {[
            { label: 'O ≥ 91', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
            { label: 'A+ ≥ 81', color: 'bg-brand-500/10 text-brand-400 border-brand-500/20' },
            { label: 'A ≥ 71', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
            { label: 'B+ ≥ 61', color: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
            { label: 'B ≥ 56', color: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20' },
            { label: 'C ≥ 50', color: 'bg-orange-500/10 text-orange-400 border-orange-500/20' },
            { label: 'F < 50',  color: 'bg-red-500/10 text-red-400 border-red-500/20' },
          ].map((b, i) => (
            <span key={i} className={`px-3 py-1.5 rounded-lg text-[11px] font-bold border ${b.color}`}>{b.label}</span>
          ))}
        </div>
      </GlassCard>
    </div>
  )
}
