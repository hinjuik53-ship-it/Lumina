import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GlassCard } from '../components/ui/GlassCard'
import { MOCK_DAILY_TIMETABLE, MOCK_TIMETABLE_GRID, SUBJECT_COLORS } from '../data/mockData'
import { MapPin, User, Calendar, List } from 'lucide-react'

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const SHORT_DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
const TIME_SLOTS = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00']

export const Timetable = () => {
  const [view, setView] = useState('weekly')
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' })
  const [selectedDay, setSelectedDay] = useState(DAYS.includes(today) ? today : 'Monday')

  const nowMins = new Date().getHours() * 60 + new Date().getMinutes()

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">Timetable</h2>
          <p className="text-zinc-400 mt-1">Semester 6 · CSE-B Section</p>
        </div>
        <div className="flex bg-zinc-900 p-1 rounded-xl border border-zinc-800">
          <button
            onClick={() => setView('daily')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              view === 'daily' ? 'bg-brand-600 text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <List size={16} /> Daily
          </button>
          <button
            onClick={() => setView('weekly')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              view === 'weekly' ? 'bg-brand-600 text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <Calendar size={16} /> Weekly
          </button>
        </div>
      </header>

      <AnimatePresence mode="wait">
        {view === 'daily' ? (
          <motion.div
            key="daily"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            {/* Day selector */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {DAYS.map(day => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all border ${
                    selectedDay === day
                      ? 'bg-brand-500/10 border-brand-500 text-brand-400'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>

            {/* Timeline */}
            <div className="relative pl-8 space-y-6 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-zinc-800">
              {MOCK_DAILY_TIMETABLE[selectedDay]?.length > 0
                ? MOCK_DAILY_TIMETABLE[selectedDay].map((slot, i) => {
                    const [sh, sm] = slot.time.split(':').map(Number)
                    const [eh, em] = slot.end.split(':').map(Number)
                    const isNow = selectedDay === today && nowMins >= sh * 60 + sm && nowMins < eh * 60 + em
                    const isPast = selectedDay === today && nowMins >= eh * 60 + em
                    return (
                      <div key={i} className="relative">
                        <div className={`absolute -left-[27px] top-1.5 w-4 h-4 rounded-full border-4 border-[#09090b] z-10 ${
                          isNow ? 'bg-brand-500 ring-4 ring-brand-500/20' :
                          isPast ? 'bg-zinc-700' : 'bg-zinc-800'
                        }`} />
                        <GlassCard className="p-5 flex flex-col md:flex-row items-center gap-5">
                          <div className="flex flex-col items-center justify-center min-w-[100px] md:border-r border-zinc-800 md:pr-5">
                            <span className="font-black text-xl text-white">{slot.time}</span>
                            <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">{slot.end}</span>
                          </div>
                          <div className="flex-1 text-center md:text-left">
                            <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                              <h4 className={`text-lg font-bold ${isPast ? 'text-zinc-500' : 'text-white'}`}>{slot.subject}</h4>
                              <span className={`text-[10px] px-2 py-0.5 rounded-md uppercase font-black tracking-tighter ${
                                slot.type === 'Lab'
                                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                                  : 'bg-brand-500/10 text-brand-400 border border-brand-500/20'
                              }`}>{slot.type}</span>
                              {isNow && (
                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-brand-500/20 text-brand-400 font-black flex items-center gap-1">
                                  <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" />LIVE
                                </span>
                              )}
                            </div>
                            <div className="flex items-center justify-center md:justify-start gap-5 text-zinc-400 text-sm">
                              <span className="flex items-center gap-2"><User size={13} className="text-zinc-600" />{slot.instructor}</span>
                              <span className="flex items-center gap-2"><MapPin size={13} className="text-zinc-600" />{slot.room}</span>
                            </div>
                          </div>
                        </GlassCard>
                      </div>
                    )
                  })
                : <p className="text-zinc-600 text-center py-12">No classes scheduled for {selectedDay}</p>
              }
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="weekly"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
          >
            <GlassCard className="overflow-x-auto">
              <div className="min-w-[720px] p-6">
                <div className="grid gap-3" style={{ gridTemplateColumns: '80px repeat(6, 1fr)' }}>
                  {/* Header */}
                  <div className="text-[10px] font-black text-zinc-600 uppercase tracking-widest flex items-center">Time</div>
                  {SHORT_DAYS.map((day, di) => (
                    <div key={day} className={`text-[10px] font-black uppercase tracking-widest text-center py-2 rounded-lg ${
                      DAYS[di] === today ? 'bg-brand-500/10 text-brand-400' : 'text-zinc-500'
                    }`}>{day}</div>
                  ))}

                  {/* Rows */}
                  {TIME_SLOTS.map(time => (
                    <>
                      <div key={`t-${time}`} className="text-sm font-bold text-zinc-500 flex items-center">{time}</div>
                      {SHORT_DAYS.map(day => {
                        const slot = MOCK_TIMETABLE_GRID[time]?.[day]
                        return (
                          <div key={`${time}-${day}`} className="h-16">
                            {slot ? (
                              <div className={`h-full w-full rounded-xl border p-2 flex flex-col items-center justify-center text-center transition-all hover:scale-105 cursor-pointer ${
                                SUBJECT_COLORS[slot.code] || 'bg-zinc-900 border-zinc-800 text-zinc-400'
                              }`}>
                                <span className="text-xs font-black">{slot.code.replace('CS', '')}</span>
                                <span className="text-[8px] font-medium opacity-70 uppercase tracking-tighter">{slot.name}</span>
                              </div>
                            ) : (
                              <div className="h-full w-full rounded-xl border border-dashed border-zinc-800/50 flex items-center justify-center">
                                <span className="text-zinc-800">—</span>
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </>
                  ))}
                </div>
              </div>
            </GlassCard>

            {/* Legend */}
            <div className="flex flex-wrap gap-2 mt-4">
              {Object.entries(SUBJECT_COLORS).map(([code, cls]) => (
                <div key={code} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold border ${cls}`}>
                  {code}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
