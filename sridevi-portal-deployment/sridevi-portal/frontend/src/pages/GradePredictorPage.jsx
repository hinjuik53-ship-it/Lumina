import { useState } from 'react'
import { GlassCard } from '../components/ui/GlassCard'
import { Calculator, Target, CheckCircle, XCircle } from 'lucide-react'
import { getGrade, GRADE_THRESHOLDS } from '../data/mockData'

// Total% = internal (out of 60, used as-is) + (external/75 × 40)
const getTotalPercent = (internal60, external75) => internal60 + (external75 / 75) * 40

// Reverse: what external score is needed to hit a target grade?
const getExternalNeeded = (internal, targetGrade) => {
  const targetMin = GRADE_THRESHOLDS[targetGrade]
  if (targetMin === undefined) return null
  return Math.ceil((targetMin - internal) * 75 / 40)
}

const GRADE_COLORS = {
  O:  { text: 'text-emerald-400', bar: 'bg-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  'A+': { text: 'text-brand-400',   bar: 'bg-brand-500',   bg: 'bg-brand-500/10',   border: 'border-brand-500/20' },
  A:  { text: 'text-blue-400',    bar: 'bg-blue-500',    bg: 'bg-blue-500/10',    border: 'border-blue-500/20'  },
  'B+': { text: 'text-amber-400',  bar: 'bg-amber-500',   bg: 'bg-amber-500/10',   border: 'border-amber-500/20' },
  B:  { text: 'text-zinc-400',    bar: 'bg-zinc-600',    bg: 'bg-zinc-700/10',    border: 'border-zinc-700/20'  },
  C:  { text: 'text-orange-400',  bar: 'bg-orange-500',  bg: 'bg-orange-500/10',  border: 'border-orange-500/20' },
}

const TARGET_GRADES = ['O', 'A+', 'A', 'B+', 'B', 'C']

export const GradePredictorPage = () => {
  // ── Mode ──────────────────────────────────────────────────────────────────
  const [mode, setMode] = useState('reverse') // 'reverse' | 'forward'

  // ── Forward mode state ─────────────────────────────────────────────────────
  const [credits, setCredits]               = useState(4)
  const [internals, setInternals]           = useState(40)
  const [expectedExternal, setExpected]     = useState(35)

  const totalPct  = getTotalPercent(internals, expectedExternal)
  const current   = getGrade(totalPct)

  // ── Reverse mode state ─────────────────────────────────────────────────────
  const [revInternal, setRevInternal] = useState(40)
  const [revGrade, setRevGrade]       = useState('A')

  const extNeeded = getExternalNeeded(revInternal, revGrade)
  const revColors  = GRADE_COLORS[revGrade] || GRADE_COLORS.C
  const revResult =
    extNeeded === null ? null :
    extNeeded <= 0    ? 'already' :
    extNeeded > 75   ? 'impossible' :
    'normal'

  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-3xl font-bold">Grade Predictor</h2>
        <p className="text-zinc-400 mt-1">
          {mode === 'reverse'
            ? 'Find out what you need on your external exam to hit a target grade.'
            : 'Simulate your final grade based on internal and expected external marks.'}
        </p>
      </header>

      {/* Mode toggle */}
      <div className="flex gap-2 p-1 bg-zinc-900/60 border border-zinc-800 rounded-xl w-fit">
        {[
          { id: 'reverse',  label: 'What do I need?' },
          { id: 'forward',  label: 'What grade will I get?' },
        ].map(btn => (
          <button
            key={btn.id}
            onClick={() => setMode(btn.id)}
            className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${
              mode === btn.id
                ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/20'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* ── REVERSE MODE ─────────────────────────────────────────────────── */}
      {mode === 'reverse' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left card — inputs */}
          <GlassCard className="p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-brand-500/10 rounded-xl flex items-center justify-center text-brand-400">
                <Target size={20} />
              </div>
              <h3 className="text-xl font-bold">Your Details</h3>
            </div>

            <div className="space-y-8">
              {/* Internal marks */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                  Internal Marks (out of 60)
                </label>
                <input
                  type="number"
                  min="0"
                  max="60"
                  value={revInternal}
                  onChange={(e) => setRevInternal(Math.min(60, Math.max(0, parseInt(e.target.value) || 0)))}
                  placeholder="Enter your internal marks"
                  className="w-full glass-input"
                />
                <p className="text-[10px] text-zinc-600">
                  Already scored: <span className="text-brand-400 font-bold">{revInternal} / 60</span>
                </p>
              </div>

              {/* Target grade */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                  Target Grade
                </label>
                <div className="grid grid-cols-6 gap-2">
                  {TARGET_GRADES.map(g => {
                    const colors = GRADE_COLORS[g]
                    const isActive = revGrade === g
                    return (
                      <button
                        key={g}
                        onClick={() => setRevGrade(g)}
                        className={`py-3 rounded-xl font-black text-sm transition-all border ${
                          isActive
                            ? `${colors.bg} ${colors.text} ${colors.border} shadow-lg`
                            : 'bg-zinc-900/50 text-zinc-500 border-zinc-800 hover:border-zinc-700 hover:text-zinc-300'
                        }`}
                      >
                        {g}
                      </button>
                    )
                  })}
                </div>
                <p className="text-[10px] text-zinc-600">
                  Min total needed for <span className={`font-bold ${revColors.text}`}>{revGrade}</span>:{' '}
                  <span className="text-white font-bold">{GRADE_THRESHOLDS[revGrade]}%</span>
                </p>
              </div>

              {/* Formula note */}
              <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/50">
                <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-1">Formula</p>
                <p className="text-xs text-zinc-400 font-mono">
                  Total% = Internal + (External ÷ 75 × 40)
                </p>
              </div>
            </div>
          </GlassCard>

          {/* Right card — result */}
          <div className="space-y-6">
            <GlassCard className="p-10 flex flex-col items-center justify-center text-center relative overflow-hidden min-h-[320px]">
              <div className="absolute top-0 right-0 w-48 h-48 bg-brand-500/10 blur-[80px] rounded-full -mr-24 -mt-24 pointer-events-none" />

              {revResult === 'already' && (
                <>
                  <CheckCircle size={48} className="text-emerald-400 mb-4" />
                  <p className="text-emerald-400 font-black text-2xl mb-2">Already there!</p>
                  <p className="text-zinc-400 text-sm">
                    Your internals ({revInternal}) are enough to reach {revGrade} without the external exam.
                  </p>
                  <div className="w-full pt-8 border-t border-zinc-800 mt-8">
                    <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">Total % so far</p>
                    <p className="text-4xl font-black text-emerald-400">{revInternal}<span className="text-sm text-zinc-500">/100</span></p>
                  </div>
                </>
              )}

              {revResult === 'impossible' && (
                <>
                  <XCircle size={48} className="text-red-400 mb-4" />
                  <p className="text-red-400 font-black text-2xl mb-2">Not Possible</p>
                  <p className="text-zinc-400 text-sm">
                    Even a perfect score (75/75) won't reach {revGrade}. Try a lower target grade.
                  </p>
                  <div className="w-full pt-8 border-t border-zinc-800 mt-8">
                    <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">Max possible %</p>
                    <p className="text-4xl font-black text-red-400">{revInternal + 40}<span className="text-sm text-zinc-500">/100</span></p>
                  </div>
                </>
              )}

              {revResult === 'normal' && (
                <>
                  <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-4">
                    External needed for {revGrade}
                  </p>
                  <div className={`text-8xl font-black mb-2 ${revColors.text}`}>
                    {extNeeded}
                    <span className="text-3xl text-zinc-600 font-bold">/75</span>
                  </div>
                  <p className={`text-sm font-black uppercase tracking-widest mb-6 ${revColors.text}`}>
                    to score {revGrade}
                  </p>

                  {/* Progress bar */}
                  <div className="w-full mb-6">
                    <div className="h-3 bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${revColors.bar}`}
                        style={{ width: `${Math.min((extNeeded / 75) * 100, 100)}%` }}
                      />
                    </div>
                    <p className="text-[10px] text-zinc-600 text-right mt-1 font-bold">
                      {extNeeded} / 75 marks needed
                    </p>
                  </div>

                  {/* Breakdown */}
                  <div className="w-full grid grid-cols-3 gap-3 pt-6 border-t border-zinc-800">
                    {[
                      { label: 'Internal',   value: revInternal,         sub: '/60',  color: 'text-brand-400' },
                      { label: 'Ext. needed', value: extNeeded,           sub: '/75',  color: revColors.text },
                      { label: 'Min total%',  value: GRADE_THRESHOLDS[revGrade], sub: '%', color: 'text-zinc-300' },
                    ].map(cell => (
                      <div key={cell.label} className="text-center">
                        <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-1">{cell.label}</p>
                        <p className={`text-xl font-black ${cell.color}`}>{cell.value}{cell.sub && <span className="text-xs text-zinc-600 font-normal">{cell.sub}</span>}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </GlassCard>

            {/* Grading scale reference */}
            <GlassCard className="p-6">
              <h4 className="text-xs font-black uppercase tracking-widest flex items-center gap-2 mb-5 text-zinc-400">
                <Target size={16} className="text-brand-400" /> Grading Scale
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { range: '≥ 91%', grade: 'O',  color: 'bg-emerald-500' },
                  { range: '81–90%',grade: 'A+', color: 'bg-brand-500'   },
                  { range: '71–80%',grade: 'A',  color: 'bg-blue-500'    },
                  { range: '61–70%',grade: 'B+', color: 'bg-amber-500'   },
                  { range: '56–60%',grade: 'B',  color: 'bg-zinc-600'    },
                  { range: '50–55%',grade: 'C',  color: 'bg-orange-500'  },
                  { range: '< 50%', grade: 'F',  color: 'bg-red-500'     },
                ].map((b) => (
                  <div key={b.grade} className="flex items-center justify-between p-3 rounded-xl bg-zinc-900/50 border border-zinc-800/50">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${b.color}`} />
                      <span className="text-[10px] text-zinc-400 font-bold">{b.range}</span>
                    </div>
                    <span className="font-black text-zinc-200 text-xs">{b.grade}</span>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-zinc-600 mt-4 leading-relaxed">
                Total% = Internal + (External ÷ 75 × 40). Non-relative scale — treat as estimate.
              </p>
            </GlassCard>
          </div>
        </div>
      )}

      {/* ── FORWARD MODE ──────────────────────────────────────────────────── */}
      {mode === 'forward' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Inputs */}
          <GlassCard className="p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-brand-500/10 rounded-xl flex items-center justify-center text-brand-400">
                <Calculator size={20} />
              </div>
              <h3 className="text-xl font-bold">Simulation Inputs</h3>
            </div>

            <div className="space-y-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Credits</label>
                  <input
                    type="number" value={credits}
                    onChange={(e) => setCredits(parseInt(e.target.value) || 0)}
                    className="w-full glass-input"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Internal (60)</label>
                  <input
                    type="number" max="60" value={internals}
                    onChange={(e) => setInternals(Math.min(60, parseInt(e.target.value) || 0))}
                    className="w-full glass-input"
                  />
                </div>
              </div>

              <div className="space-y-4 pt-2">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Expected External (75)</label>
                  <span className="text-xl font-black text-brand-400">{expectedExternal}</span>
                </div>
                <input
                  type="range" min="0" max="75" step="1" value={expectedExternal}
                  onChange={(e) => setExpected(parseInt(e.target.value))}
                  className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-brand-500"
                />
                <div className="flex justify-between text-[10px] font-bold text-zinc-600">
                  {[0, 19, 37, 56, 75].map(v => <span key={v}>{v}</span>)}
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-800">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-zinc-500">Total Score</span>
                  <span className="text-2xl font-black text-white">{totalPct.toFixed(1)}<span className="text-sm text-zinc-600">/100</span></span>
                </div>
                <div className="mt-3 h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      totalPct >= 91 ? 'bg-emerald-500' : totalPct >= 81 ? 'bg-brand-500' : totalPct >= 71 ? 'bg-blue-500' : totalPct >= 61 ? 'bg-amber-500' : totalPct >= 50 ? 'bg-orange-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${Math.min(totalPct, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Result */}
          <div className="space-y-6">
            <GlassCard className="p-10 flex flex-col items-center justify-center text-center relative overflow-hidden min-h-[320px]">
              <div className="absolute top-0 right-0 w-48 h-48 bg-brand-500/10 blur-[80px] rounded-full -mr-24 -mt-24 pointer-events-none" />
              <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-6">Predicted Grade</p>
              <div className={`text-9xl font-black mb-4 ${current.color}`}>{current.grade}</div>
              <p className={`text-lg font-black uppercase tracking-widest mb-8 ${current.color}`}>{current.label}</p>
              <div className="w-full pt-8 border-t border-zinc-800">
                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">Total Score</p>
                <p className="text-4xl font-black text-white">{totalPct.toFixed(1)}<span className="text-sm text-zinc-500">/100</span></p>
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <h4 className="text-xs font-black uppercase tracking-widest flex items-center gap-2 mb-5 text-zinc-400">
                <Target size={16} className="text-brand-400" /> Grading Scale
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { range: '≥ 91%', grade: 'O',  color: 'bg-emerald-500' },
                  { range: '81–90%',grade: 'A+', color: 'bg-brand-500'   },
                  { range: '71–80%',grade: 'A',  color: 'bg-blue-500'    },
                  { range: '61–70%',grade: 'B+', color: 'bg-amber-500'   },
                  { range: '56–60%',grade: 'B',  color: 'bg-zinc-600'    },
                  { range: '50–55%',grade: 'C',  color: 'bg-orange-500'  },
                  { range: '< 50%', grade: 'F',  color: 'bg-red-500'     },
                ].map((b) => (
                  <div key={b.grade} className="flex items-center justify-between p-3 rounded-xl bg-zinc-900/50 border border-zinc-800/50">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${b.color}`} />
                      <span className="text-[10px] text-zinc-400 font-bold">{b.range}</span>
                    </div>
                    <span className="font-black text-zinc-200 text-xs">{b.grade}</span>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-zinc-600 mt-4 leading-relaxed">
                Absolute, non-relative scale shown above. Treat as an estimate, not a guarantee.
              </p>
            </GlassCard>
          </div>
        </div>
      )}
    </div>
  )
}
