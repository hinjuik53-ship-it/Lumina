import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GlassCard } from '../components/ui/GlassCard'
import { Plus, Trash2 } from 'lucide-react'
import { GRADE_POINTS } from '../data/mockData'

export const CGPAPredictor = () => {
  const [courses, setCourses] = useState([
    { id: '1', credits: 4, grade: '' },
    { id: '2', credits: 4, grade: '' },
    { id: '3', credits: 3, grade: '' },
    { id: '4', credits: 3, grade: '' },
    { id: '5', credits: 2, grade: '' },
  ])

  const addCourse = () => setCourses(prev => [...prev, { id: Math.random().toString(), credits: 3, grade: '' }])
  const removeCourse = (id) => setCourses(prev => prev.filter(c => c.id !== id))
  const update = (id, field, value) => setCourses(prev => prev.map(c => c.id === id ? { ...c, [field]: value } : c))

  const graded = courses.filter(c => c.grade)
  const totalPts = graded.reduce((a, c) => a + (GRADE_POINTS[c.grade] || 0) * c.credits, 0)
  const totalCr  = graded.reduce((a, c) => a + c.credits, 0)
  const gpa = totalCr > 0 ? (totalPts / totalCr).toFixed(2) : '0.00'

  const gpaNum = parseFloat(gpa)
  const gpaColor = gpaNum >= 9 ? 'text-emerald-400' : gpaNum >= 8 ? 'text-brand-400' : gpaNum >= 7 ? 'text-amber-400' : 'text-red-400'

  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-3xl font-bold">CGPA Predictor</h2>
        <p className="text-zinc-400 mt-1">Estimate your semester GPA by entering courses with credits and expected grades.</p>
      </header>

      <div className="max-w-2xl mx-auto space-y-6">
        {/* Result banner */}
        <div className={`relative overflow-hidden rounded-2xl border p-6 text-center ${
          gpaNum >= 8.5 ? 'bg-brand-500/10 border-brand-500/20' :
          gpaNum >= 7   ? 'bg-amber-500/10 border-amber-500/20' :
                          'bg-red-500/10 border-red-500/20'
        }`}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/10 blur-3xl rounded-full -mr-16 -mt-16 pointer-events-none" />
          <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Predicted Semester GPA</p>
          <p className={`text-6xl font-black ${gpaColor}`}>{gpa}</p>
          <p className="text-xs text-zinc-500 mt-2">
            {courses.reduce((a, c) => a + c.credits, 0)} total credits · {courses.length} courses
          </p>
        </div>

        <GlassCard className="p-8 border-zinc-800/50">
          {/* Column headers */}
          <div className="grid grid-cols-12 gap-3 mb-4 px-1">
            <span className="col-span-3 text-[10px] font-black text-zinc-600 uppercase tracking-widest">Credits</span>
            <span className="col-span-7 text-[10px] font-black text-zinc-600 uppercase tracking-widest">Expected Grade</span>
            <span className="col-span-2" />
          </div>

          <div className="space-y-3 mb-6">
            <AnimatePresence initial={false}>
              {courses.map((course) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="grid grid-cols-12 gap-3 items-center"
                >
                  <div className="col-span-3">
                    <input
                      type="number" min="1" max="6" value={course.credits}
                      onChange={(e) => update(course.id, 'credits', parseInt(e.target.value) || 0)}
                      className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-brand-500/50 transition-all"
                    />
                  </div>
                  <div className="col-span-7">
                    <select
                      value={course.grade}
                      onChange={(e) => update(course.id, 'grade', e.target.value)}
                      className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-brand-500/50 appearance-none cursor-pointer"
                    >
                      <option value="" disabled>Select grade</option>
                      {Object.keys(GRADE_POINTS).map(g => (
                        <option key={g} value={g}>{g}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-span-2">
                    <button
                      onClick={() => removeCourse(course.id)}
                      className="w-full h-11 flex items-center justify-center rounded-xl bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <button
            onClick={addCourse}
            className="w-full py-4 rounded-xl border border-dashed border-zinc-800 text-zinc-500 hover:text-brand-400 hover:border-brand-500/50 hover:bg-brand-500/5 transition-all flex items-center justify-center gap-2 font-bold text-sm"
          >
            <Plus size={18} /> Add Course
          </button>
        </GlassCard>

        {/* Grade points reference */}
        <div className="grid grid-cols-4 gap-2">
          {Object.entries(GRADE_POINTS).map(([g, pts]) => (
            <div key={g} className="text-center p-3 rounded-xl bg-zinc-900/50 border border-zinc-800">
              <p className="text-lg font-black text-brand-400">{g}</p>
              <p className="text-xs text-zinc-600 font-bold">{pts} pts</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
