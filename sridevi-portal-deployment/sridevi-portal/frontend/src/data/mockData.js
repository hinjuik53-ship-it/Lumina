// ─────────────────────────────────────────────────────────────────────────────
// mockData.js  —  Replace with real API calls once college APIs are available
// ─────────────────────────────────────────────────────────────────────────────

// Shared grade system — imported by Dashboard, GradePredictorPage, CGPAPredictor
export const GRADE_POINTS = { O: 10, 'A+': 9, A: 8, 'B+': 7, B: 6, C: 5, F: 0 }

// Threshold map for reverse-grade → minimum total%
export const GRADE_THRESHOLDS = { O: 91, 'A+': 81, A: 71, 'B+': 61, B: 56, C: 50 }

export const getGrade = (totalPct) => {
  if (totalPct >= 91) return { grade: 'O',  color: 'text-emerald-400', label: 'Outstanding' }
  if (totalPct >= 81) return { grade: 'A+', color: 'text-brand-400',   label: 'Excellent'   }
  if (totalPct >= 71) return { grade: 'A',  color: 'text-blue-400',    label: 'Very Good'   }
  if (totalPct >= 61) return { grade: 'B+', color: 'text-amber-400',  label: 'Good'        }
  if (totalPct >= 56) return { grade: 'B',  color: 'text-zinc-400',   label: 'Average'    }
  if (totalPct >= 50) return { grade: 'C',  color: 'text-orange-400', label: 'Pass'        }
  return                    { grade: 'F',  color: 'text-red-400',    label: 'Fail'        }
}

export const MOCK_STUDENT = {
  id: "22B81A05H7",
  name: "Charan Peddi",
  rollNumber: "22B81A05H7",
  department: "School of Computing",
  program: "B.Tech Computer Science and Engineering",
  semester: 6,
  section: "CSE-A",
  batch: "2022-2026",
  advisor: "Dr. Priya Venkataraman",
  cgpa: 8.92,
  email: "charan.t@sridevi.edu.in",
  phone: "+91 96760 XXXXX",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Charan",
}

export const MOCK_ATTENDANCE = [
  { subject: "Database Management Systems", code: "CS601", conducted: 48, attended: 42, percentage: 87.5 },
  { subject: "Operating Systems",           code: "CS602", conducted: 44, attended: 30, percentage: 68.2 },
  { subject: "Computer Networks",           code: "CS603", conducted: 42, attended: 40, percentage: 95.2 },
  { subject: "Software Engineering",        code: "CS604", conducted: 40, attended: 35, percentage: 87.5 },
  { subject: "Machine Learning",            code: "CS605", conducted: 36, attended: 34, percentage: 94.4 },
  { subject: "Web Technologies",            code: "CS606", conducted: 36, attended: 27, percentage: 75.0 },
]

export const MOCK_MARKS = [
  { subject: "Database Management Systems", code: "CS601", internal: 54, external: 68, total: 90.3, maxTotal: 100, grade: "A+", credits: 4 },
  { subject: "Operating Systems",           code: "CS602", internal: 50, external: 64, total: 84.1, maxTotal: 100, grade: "A+", credits: 4 },
  { subject: "Computer Networks",           code: "CS603", internal: 52, external: 60, total: 84.0, maxTotal: 100, grade: "A+", credits: 3 },
  { subject: "Software Engineering",        code: "CS604", internal: 45, external: 52, total: 72.7, maxTotal: 100, grade: "A",  credits: 3 },
  { subject: "Machine Learning",            code: "CS605", internal: 53, external: 65, total: 87.7, maxTotal: 100, grade: "A+", credits: 4 },
  { subject: "Web Technologies",            code: "CS606", internal: 42, external: 45, total: 66.0, maxTotal: 100, grade: "B+", credits: 2 },
]

export const SUBJECT_COLORS = {
  "CS601": "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
  "CS602": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  "CS603": "bg-rose-500/20 text-rose-400 border-rose-500/30",
  "CS604": "bg-amber-500/20 text-amber-400 border-amber-500/30",
  "CS605": "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
  "CS606": "bg-violet-500/20 text-violet-400 border-violet-500/30",
}

export const MOCK_DAILY_TIMETABLE = {
  "Monday": [
    { time: "09:00", end: "10:00", subject: "Database Management Systems", code: "CS601", room: "LH-201", instructor: "Dr. Ramesh Kumar",      type: "Lecture" },
    { time: "10:00", end: "11:00", subject: "Operating Systems",           code: "CS602", room: "LH-201", instructor: "Dr. Priya Venkataraman", type: "Lecture" },
    { time: "11:15", end: "13:15", subject: "DBMS Lab",                    code: "CS601", room: "Lab-3",  instructor: "Dr. Ramesh Kumar",      type: "Lab"     },
    { time: "14:00", end: "15:00", subject: "Machine Learning",            code: "CS605", room: "LH-103", instructor: "Dr. Anand Pillai",      type: "Lecture" },
  ],
  "Tuesday": [
    { time: "09:00", end: "10:00", subject: "Computer Networks",    code: "CS603", room: "LH-203", instructor: "Prof. Suresh Nair",  type: "Lecture" },
    { time: "10:00", end: "11:00", subject: "Software Engineering", code: "CS604", room: "LH-203", instructor: "Dr. Kavitha Rajan",  type: "Lecture" },
    { time: "14:00", end: "15:00", subject: "Web Technologies",     code: "CS606", room: "LH-102", instructor: "Prof. Divya Menon",  type: "Lecture" },
  ],
  "Wednesday": [
    { time: "09:00", end: "10:00", subject: "Machine Learning",    code: "CS605", room: "LH-205", instructor: "Dr. Anand Pillai",      type: "Lecture" },
    { time: "11:15", end: "13:15", subject: "Networks Lab",        code: "CS603", room: "Lab-5",  instructor: "Prof. Suresh Nair",     type: "Lab"     },
    { time: "14:00", end: "15:00", subject: "Operating Systems",   code: "CS602", room: "LH-201", instructor: "Dr. Priya Venkataraman",type: "Lecture" },
  ],
  "Thursday": [
    { time: "09:00", end: "10:00", subject: "Software Engineering",        code: "CS604", room: "LH-203", instructor: "Dr. Kavitha Rajan", type: "Lecture" },
    { time: "10:00", end: "11:00", subject: "Database Management Systems", code: "CS601", room: "LH-103", instructor: "Dr. Ramesh Kumar",  type: "Lecture" },
    { time: "14:00", end: "16:00", subject: "ML Lab",                      code: "CS605", room: "Lab-4",  instructor: "Dr. Anand Pillai",  type: "Lab"     },
  ],
  "Friday": [
    { time: "09:00", end: "10:00", subject: "Web Technologies",  code: "CS606", room: "LH-102", instructor: "Prof. Divya Menon", type: "Lecture" },
    { time: "10:00", end: "11:00", subject: "Computer Networks", code: "CS603", room: "LH-203", instructor: "Prof. Suresh Nair", type: "Lecture" },
    { time: "14:00", end: "15:00", subject: "Machine Learning",  code: "CS605", room: "LH-205", instructor: "Dr. Anand Pillai",  type: "Lecture" },
  ],
  "Saturday": [
    { time: "09:00", end: "10:00", subject: "Software Engineering", code: "CS604", room: "LH-101", instructor: "Dr. Kavitha Rajan", type: "Lecture" },
    { time: "10:00", end: "11:00", subject: "Web Technologies",     code: "CS606", room: "LH-102", instructor: "Prof. Divya Menon", type: "Lecture" },
  ],
}

export const MOCK_TIMETABLE_GRID = {
  "09:00": { MON: { code: "CS601", name: "DBMS" }, TUE: { code: "CS603", name: "CN" },   WED: { code: "CS605", name: "ML" },   THU: { code: "CS604", name: "SE" },   FRI: { code: "CS606", name: "WT" },   SAT: { code: "CS604", name: "SE" }  },
  "10:00": { MON: { code: "CS602", name: "OS" },   TUE: { code: "CS604", name: "SE" },   WED: null,                             THU: { code: "CS601", name: "DBMS" }, FRI: { code: "CS603", name: "CN" },   SAT: { code: "CS606", name: "WT" }  },
  "11:00": { MON: { code: "CS601", name: "Lab" },  TUE: null,                             WED: { code: "CS603", name: "Lab" },  THU: null,                             FRI: null,                             SAT: null                           },
  "12:00": { MON: { code: "CS601", name: "Lab" },  TUE: null,                             WED: { code: "CS603", name: "Lab" },  THU: null,                             FRI: null,                             SAT: null                           },
  "14:00": { MON: { code: "CS605", name: "ML" },   TUE: { code: "CS606", name: "WT" },   WED: { code: "CS602", name: "OS" },   THU: { code: "CS605", name: "ML Lab" },  FRI: { code: "CS605", name: "ML" },   SAT: null                           },
  "15:00": { MON: null,                             TUE: null,                             WED: null,                             THU: { code: "CS605", name: "ML Lab" },  FRI: null,                             SAT: null                           },
}
