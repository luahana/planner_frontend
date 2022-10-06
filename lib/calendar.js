import { addZero } from './date'
import { midFromYmd, ymdFromMid, ymwFromWid, ymdFromDate } from './date'

export const WEEKDAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

const weekArrByWidObj = ({ year, month }) => {
  const wids = widsMonth({ year, month })
  const weekArrays = getWeekArraysMonthArr({ year, month })

  return weekArrays.reduce((acc, cur, i) => ({ ...acc, [wids[i]]: cur }), {})
}

export const weekArrByWid = (wid) => {
  return weekArrByWidObj(ymwFromWid(wid))
}

export const numOfWeekInMonth = ({ year, month }) => {
  const dtMonth = month - 1
  let date
  for (let i = 1; i <= 7; i++) {
    const a = new Date(year, dtMonth, i)
    if (a.getDay() === 0) date = i
  }
  let week = 0
  for (let i = 0; i <= 5; i++) {
    const a = new Date(year, dtMonth, date + 7 * i)
    if (a.getMonth() + 1 === month) week++
  }
  return week
}

export const widsMonth = ({ year, month }) => {
  const weekArraysMonthArr = getWeekArraysMonthArr({ year, month })
  return weekArraysMonthArr.map((arr) => {
    const dt = new Date(arr[0])
    return calcWeekId(ymdFromDate(dt))
  })
}

const getWeekArraysMonthArr = ({ year, month }) => {
  const monthArr = getCalDates(midFromYmd({ year, month }))

  const weekArrays = []
  while (monthArr.length) {
    weekArrays.push(monthArr.splice(0, 7))
  }
  return weekArrays
}

export const calcWeekId = ({ year, month, date }) => {
  const dtMonth = month - 1
  const weekArraysMonthArr = getWeekArraysMonthArr({ year, month })

  if (new Date(year, dtMonth, 1).getDay() === 0) {
    const week = weekArraysMonthArr.reduce((acc, cur, i) => {
      if (cur.includes(new Date(year, dtMonth, date).toDateString()))
        return acc + i
      return acc
    }, 1)

    return year + addZero(month) + week
  }

  const { year: sunYear, month: sunMonth } = getSunday({ year, month, date })

  if (sunMonth !== month) {
    return (
      year +
      addZero(sunMonth) +
      numOfWeekInMonth({ year: sunYear, month: sunMonth })
    )
  }

  const week = weekArraysMonthArr.reduce((acc, cur, i) => {
    if (cur.includes(new Date(year, dtMonth, date).toDateString())) return i
    return acc
  }, 0)

  return year + addZero(month) + week
}

export const getCalDates = (mid) => {
  const { year: y, month: m } = ymdFromMid(mid)

  const dt = new Date(y, m - 1, 1)
  const month = dt.getMonth()
  const year = dt.getFullYear()

  const firstDayOfMonth = new Date(year, month, 1)
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const firstDayDateString = firstDayOfMonth.toLocaleDateString('en-us', {
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  })
  const paddingDays = WEEKDAYS.indexOf(firstDayDateString.split(', ')[0])

  const lastDayDateString = new Date(year, month + 1, 0).toLocaleDateString(
    'en-us',
    {
      weekday: 'long',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    }
  )

  const endPaddingDays =
    WEEKDAYS.length - WEEKDAYS.indexOf(lastDayDateString.split(', ')[0]) - 1

  const paddingMonthArr = []
  for (let i = paddingDays - 1; i >= 0; i--) {
    paddingMonthArr.push(new Date(year, month, -i).toDateString())
  }

  const curMonthArr = []
  for (let i = 1; i <= daysInMonth; i++) {
    curMonthArr.push(new Date(year, month, +i).toDateString())
  }

  const endPaddingMonthArr = []
  for (let i = 0; i < endPaddingDays; i++) {
    endPaddingMonthArr.push(new Date(year, month + 1, i + 1).toDateString())
  }

  return [...paddingMonthArr, ...curMonthArr, ...endPaddingMonthArr]
}

const getSunday = ({ year, month, date }) => {
  const dtMonth = month - 1
  let dt = new Date(year, dtMonth, date)

  for (let i = 0; i < 7; i++) {
    dt = new Date(year, dtMonth, date - i)
    if (dt.getDay() === 0) break
  }
  return {
    year: dt.getFullYear(),
    month: dt.getMonth() + 1,
    date: dt.getDate(),
  }
}

export const getDayOfPrevWeek = (dateString) => {
  const dt = new Date(dateString)
  let resultDate = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate() - 1)
  if (dt.getMonth() === 0) {
    const { year, month, date } = getSunday({
      year: dt.getFullYear(),
      month: dt.getMonth() + 1,
      date: dt.getDate() - 1,
    })
    if (year !== dt.getFullYear()) return { year, month, date }
  }

  return ymdFromDate(resultDate)
}

export const getDayOfNextWeek = (dateString) => {
  const dt = new Date(dateString)
  const resultDate = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate() + 1)
  return ymdFromDate(resultDate)
}

export const calcMid = (mid, adder) => {
  const year = parseInt(mid.slice(0, 4))
  const month = parseInt(mid.slice(-2))
  const resMonth = month + adder
  if (resMonth <= 12 && resMonth >= 1)
    return year.toString() + addZero(resMonth)
  const addYear = Math.floor(resMonth / 12)
  if (resMonth <= 0) addYear -= 1
  const remainderMonth = resMonth % 12
  if (remainderMonth < 1) remainderMonth += 12

  return (year + addYear).toString() + addZero(remainderMonth)
}

export const calcDid = (did, adder) => {
  const year = parseInt(did.slice(0, 4))
  const dtMonth = parseInt(did.slice(4, 6)) - 1
  const date = parseInt(did.slice(-2))
  const resDate = date + adder
  const resDt = new Date(year, dtMonth, resDate)

  return (
    resDt.getFullYear() +
    addZero(resDt.getMonth() + 1) +
    addZero(resDt.getDate())
  )
}
