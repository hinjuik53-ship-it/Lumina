# Changes Summary — Sridevi Portal Lumina

Every change below maps directly to one of the 12 requested items. Nothing else
was restructured or refactored. Visual design is untouched.

---

## SECURITY

### 1. MySQL password moved out of application.properties
- `backend/src/main/resources/application.properties`: username/password now
  read from `${DB_USERNAME:root}` / `${DB_PASSWORD}` environment variables
  instead of being hardcoded.
- `backend/.env`: holds the real password locally for your own reference.
- **Important:** Spring Boot does NOT auto-load `.env` files. You must export
  the variable yourself before running, e.g.:
  ```
  export DB_PASSWORD=Cherry@5517
  mvn spring-boot:run
  ```
  This is documented in the README's Quick Start section.

### 2. .gitignore added
- New file `.gitignore` at project root — excludes `.env`, `node_modules/`,
  `target/`, `dist/`, and common IDE/OS files so secrets and build output
  never get committed.

### 3. SecurityConfig.java locked down
- `backend/src/main/java/com/sridevi/portal/config/SecurityConfig.java`:
  changed `.anyRequest().permitAll()` to explicitly permit only
  `/api/v1/auth/login` and `/api/v1/auth/health`, with `.anyRequest().authenticated()`
  for everything else.
- **Flag for you:** there is currently no JWT filter wired into Spring Security,
  so any future endpoint other than login/health will be rejected by default
  until real token-based auth is added (see item 4 below). This is intentional
  and safe for today's scope — there are no other real data endpoints yet.

### 4. Password hashing (BCrypt)
- Added a `PasswordEncoder` bean (`BCryptPasswordEncoder`) in `SecurityConfig.java`.
- `backend/src/main/java/com/sridevi/portal/service/AuthService.java`: login now
  calls `passwordEncoder.matches(...)` instead of comparing plaintext strings.
- `backend/src/main/java/com/sridevi/portal/config/DataInitializer.java`: the
  seeded demo password is now stored hashed via `passwordEncoder.encode("123456")`.
- **Action needed from you:** since `ddl-auto=update` only creates the table
  if missing, your existing `students` row (if already created) still has the
  OLD plaintext password and will fail to log in. Drop/truncate that row once
  so it reseeds with the hashed version, or manually update it.

### 5. JWT — documentation corrected instead of implemented
- No JWT library is in `pom.xml`, and the existing `LoginResponse.token` field
  was always an empty string — JWT was claimed in the README but never actually
  built. Implementing real JWT (token generation, validation filter, refresh
  flow) is a new feature, not a fix, so per your "don't add new features"
  instruction I corrected the docs instead:
  - `README.md`: removed "+ JWT" from the tech stack line and structure
    diagram, and added a note explaining the current auth is sessionless
    with no real token issued yet.
  - If you do want real JWT before the faculty demo, that's a separate,
    larger task — happy to scope it as its own request.

### 6. DEBUG logging turned off
- `backend/src/main/resources/application.properties`: `logging.level.com.sridevi`
  changed from `DEBUG` to `INFO`.

### Database question (your "am I using a database or not" question)
**Yes — real MySQL**, via Spring Boot + JPA (`Student` entity, `StudentRepository`,
`CollegeDB` schema). This part was already true before any of my changes.
However: only login/profile actually hits the database right now. Marks,
attendance, timetable, and CGPA history are still frontend-only mock data in
`mockData.js` — the backend doesn't serve real academic records yet. For your
faculty demo, you can honestly say "auth and student profile are backed by a
real MySQL database; academic data endpoints are the next phase, currently
demoed with realistic mock data."

---

## DATA / UI FIXES

### 7. Marks.jsx — internal /60 only, External/Total/Grade columns removed
- `frontend/src/pages/Marks.jsx`: removed the External, Total, and Grade
  `<th>` and `<td>` cells from the marks table. Table now shows only Subject,
  Code, Cr, Internal. Internal display changed from `/50` to `/60`.
- Removed now-unused `GRADE_COLORS` constant and `GraduationCap` import
  (only existed to render the deleted grade column/icon).
- Also fixed the "Grading Scale" legend at the bottom of the same page —
  it was missing the C grade entirely and had the wrong B cutoff (50 instead
  of 56). Now shows the full confirmed scale: O≥91, A+≥81, A≥71, B+≥61, B≥56,
  C≥50, F<50.
- `frontend/src/data/mockData.js`: `MOCK_MARKS` rescaled so `internal` values
  are realistic out of 60 (was out of 50) and `external` values are realistic
  out of 75 (was out of 100). `total`/`grade` recalculated using the confirmed
  formula (see item 9) so SGPA math elsewhere stays consistent.

### 8. Dashboard.jsx hardcoded internal marks text
- `frontend/src/pages/Dashboard.jsx`: replaced the hardcoded string
  `"ML Internals: 45/50 · A+ Grade"` with a dynamic lookup against
  `MOCK_MARKS` (subject code CS605), displaying `/60` and the actual stored
  grade. Now reads correctly off the data instead of a typed-in string.
- Also fixed a real bug found while in this file: the inline SGPA grade-point
  mapping on this page had no case for B, C, or F grades (everything below
  B+ silently fell through to 6 points). Replaced with the same correct
  `GRADE_POINTS` lookup table used in Marks.jsx and Profile.jsx, so SGPA is
  now consistent across all three pages.

### 9. GradePredictorPage.jsx — new formula, /60 internal, /75 external
This was the most involved change. Based on the reference points you gave me
(internal = 40/60, external needed for each grade out of 75), I derived and
confirmed the exact underlying formula:

```
total% = internal_score (out of 60, used as-is)
       + (external_score / 75 × 40)
```

Total is out of 100. Confirmed grade cutoffs (absolute, non-relative):
- O ≥ 91
- A+ ≥ 81
- A ≥ 71
- B+ ≥ 61
- B ≥ 56
- C ≥ 50
- F < 50

This reproduces all five of your reference numbers exactly (18.8, 30.0, 39.4,
58.1, 76.9 external needed for C/B/B+/A/A+ respectively, given 40/60 internal).

Changes made in `frontend/src/pages/GradePredictorPage.jsx`:
- `getGrade()` replaced with the confirmed cutoffs above, including the
  previously-missing C grade.
- New `getTotalPercent(internal60, external75)` function implementing the
  formula.
- Internal input: max changed from 50 to 60, label updated.
- External slider: max changed from 100 to 75, label and tick marks updated.
- Total Score display and progress bar: now show `/100` using the computed
  `totalPct` instead of a raw `/150` sum.
- Grading Scale legend: added the missing C grade row, fixed B's range to
  56–60% (was incorrectly 50–60%).
- Added a visible disclaimer: *"Absolute, non-relative scale shown above.
  Relative grading... can shift these cutoffs slightly — treat this
  predictor as an estimate, not a guarantee."* — per your note that this is
  the generalized/non-relative version.

**One precision note:** plugging external=58.1 into the formula gives
70.987%, which is just under the 71% A cutoff — so by strict math that
specific rounded value actually lands as B+, not A. This isn't a bug in the
implementation; it's because 58.1 was itself a rounded display value (true
boundary is closer to 58.125). The formula and cutoffs themselves are
implemented exactly as confirmed.

### 10. CGPAPredictor.jsx — no autoselect, no points suffix
- `frontend/src/pages/CGPAPredictor.jsx`: all five default course rows and
  the "Add Course" button now start with `grade: ''` (no grade) instead of a
  pre-filled value like `'A+'`. The dropdown shows a disabled "Select grade"
  placeholder and requires an explicit choice.
- GPA calculation now filters to only courses where a grade has actually been
  selected (`courses.filter(c => c.grade)`), so unselected rows don't
  silently count as 0-point F grades and skew the GPA.
- Dropdown options changed from `"A+ — 9 points"` to just `"A+"` — grade
  letter only, no points shown inline. (The small reference grid at the
  bottom of the page showing "9 pts" etc. was left alone — that's a separate
  informational legend, not the dropdown you flagged, and removing it would
  hide how the GPA math actually works.)

### 11. CGPA/SGPA calculation check
- SGPA (credit-weighted average) is calculated correctly in Marks.jsx and
  Profile.jsx — both already used the proper grade-points lookup table.
- Dashboard.jsx had the bug described in item 8 (missing B/C/F cases) — now
  fixed to match.
- **CGPA is not actually calculated anywhere** — it's a static stored value
  (8.74) on `MOCK_STUDENT` and the backend `Student` entity. This is
  structurally correct for now (CGPA is supposed to represent cumulative
  GPA across all past semesters, which needs multi-semester historical data
  that doesn't exist yet in this single-semester data model) but it means
  the number shown is not derived from anything — it's just typed in. Once
  real semester records exist in the database, CGPA should be computed as
  the credit-weighted average across all semesters, the same way SGPA is
  computed within one semester.

### 12. Timetable mismatch fixed
- Found the exact mismatch by diffing `MOCK_DAILY_TIMETABLE` against
  `MOCK_TIMETABLE_GRID` programmatically: every day matched except Thursday.
  Thursday's daily view correctly shows a 2-hour ML Lab (14:00–16:00), but
  the weekly grid had no 15:00 row at all, so the lab appeared to be only
  1 hour wide in weekly view and was mislabeled "Lab" instead of "ML Lab".
- `frontend/src/data/mockData.js`: added a `"15:00"` row to
  `MOCK_TIMETABLE_GRID`, populated with the same CS605 ML Lab block for
  Thursday (and `null` for all other days, since no one else has a class
  then). Also relabeled Thursday's 14:00 cell from generic "Lab" to "ML Lab"
  for clarity.
- `frontend/src/pages/Timetable.jsx`: added `'15:00'` to the `TIME_SLOTS`
  array so the weekly grid actually renders that row.
- Re-verified programmatically after the fix: daily and weekly views now
  agree on every single class, every day.

---

## Validation performed
- Backend Java files reviewed manually for correctness (no Maven/network
  access available in this environment to do a full `mvn compile`, but
  Lombok's `@RequiredArgsConstructor` will correctly pick up the new
  `PasswordEncoder` field, and all imports/method calls were checked by hand).
- Frontend: ran `npm install --legacy-peer-deps` (your project already has a
  pre-existing React 19 vs lucide-react peer dependency conflict — not
  something I introduced, separate issue if you want it fixed) and
  `npm run build` — production build completed successfully with no errors
  across all edited files.

## Things I did NOT touch (out of scope)
- The pre-existing React 19 / lucide-react peer dependency warning.
- Actually wiring marks/attendance/timetable to real database-backed
  endpoints — they're still mock data on the frontend.
- Implementing real JWT issuance (documented instead, per your "no new
  features" instruction).
