import useSWR from 'swr'

function fetcher(url: string) {
  return window.fetch(url).then((res) => res.json())
}

export function useEntries() {
  const { data, error } = useSWR(`/api/get-entries`, fetcher)

  return {
    entries: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export function useUsers() {
  const { data, error } = useSWR(`/api/get-users`, fetcher)

  return {
    users: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export function useSemester(user_id) {
  const { data, error } = useSWR(`/api/get-semester?user_id=${user_id}`, fetcher)

  return {
    semester: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export function useClass(user_id) {
  const { data, error } = useSWR(`/api/get-class?user_id=${user_id}`, fetcher)

  return {
    course: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export function useGradeWeight(course_id) {
  const { data, error } = useSWR(`/api/get-grade-weight?course_id=${course_id}`, fetcher)
  
  return {
    gradeWeight: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export function useGradeWeights(current_semester) {
  const { data, error } = useSWR(`/api/get-grade-weights?current_semester=${current_semester}`, fetcher)
  
  return {
    grade_weights: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export function useGrades( course_id ){
  const {data, error} = useSWR(`/api/get-grades?course_id=${course_id}`, fetcher)

  return {
    grades: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export function useCurrentSem(user_id){
  const {data, error} = useSWR(`/api/get-current-semester?user_id=${user_id}`, fetcher)
  
  return {
    current_semester: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export function useCurrentCourse(user_id){
  const {data, error} = useSWR(`/api/get-current-courses?user_id=${user_id}`, fetcher)
  
  return {
    current_courses: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export function useCurrentGrades(current_semester){
  const {data, error} = useSWR(`/api/get-current-grades?current_semester=${current_semester}`, fetcher)
  
  return {
    current_grades: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export function useEntry(id: string) {
  return useSWR(`/api/get-entry?id=${id}`, fetcher)
}

export function useActivity(user_id){
  const {data, error} = useSWR(`/api/get-activities?user_id=${user_id}`, fetcher)

  return {
    activities: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export function useSchedule(user_id, current_semester){
  const {data, error} = useSWR(`/api/get-schedule?user_id=${user_id}&current_semester=${current_semester}`, fetcher)

  return {
    schedule: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export function useDueDates(user_id, current_semester){
  const {data, error} = useSWR(`/api/get-due-dates?user_id=${user_id}&current_semester=${current_semester}`, fetcher)

  return {
    due_dates: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export function useUpcomingGrades(current_semester){
  const {data, error} = useSWR(`/api/get-upcoming-grades?current_semester=${current_semester}`, fetcher)

  return {
    upcoming_grades: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export function useDayTime( semester_id, course_id ){
  const {data, error} = useSWR(`/api/get-course-day-time?semester_id=${semester_id}&course_id=${course_id}`, fetcher)

  return {
    course_day_time: data,
    isLoading: !error && !data,
    isError: error,
  }
}