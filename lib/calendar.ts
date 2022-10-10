import { addZero, ymd } from './date'
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

const weekArrByWidObj = ({ year, month }: ymd) => {
  const wids: string[] = widsMonth({ year, month })
  const weekArrays: string[] = getWeekArraysMonthArr({ year, month })

  return weekArrays.reduce((acc, cur, i) => ({ ...acc, [wids[i]]: cur }), {})
}

export const weekArrByWid = (wid: string) => {
  return weekArrByWidObj(ymwFromWid(wid))
}

export const numOfWeekInMonth = ({ year, month }: ymd): number => {
  const dtMonth = month - 1
  let date: number
  for (let i = 1; i <= 7; i++) {
    const a = new Date(year, dtMonth, i)
    if (a.getDay() === 0) date = i
  }
  let week: number = 0
  for (let i = 0; i <= 5; i++) {
    const a = new Date(year, dtMonth, date + 7 * i)
    if (a.getMonth() + 1 === month) week++
  }
  return week
}

export const widsMonth = ({ year, month }: ymd): string[] => {
  const weekArraysMonthArr = getWeekArraysMonthArr({ year, month })
  return weekArraysMonthArr.map((arr) =>
    calcWeekId(ymdFromDate(new Date(arr[0])))
  )
}

const getWeekArraysMonthArr = ({ year, month }: ymd): string[] => {
  const monthArr: string[] = getCalDates(midFromYmd({ year, month }))

  const weekArrays = []
  while (monthArr.length) {
    weekArrays.push(monthArr.splice(0, 7))
  }
  return weekArrays
}

export const calcWeekId = ({ year, month, date }: ymd): string => {
  const dtMonth: number = month - 1
  const weekArraysMonthArr: string[] = getWeekArraysMonthArr({ year, month })

  if (new Date(year, dtMonth, 1).getDay() === 0) {
    const week = weekArraysMonthArr.reduce((acc, cur, i) => {
      if (cur.includes(new Date(year, dtMonth, date).toDateString()))
        return acc + i
      return acc
    }, 1)

    return year + addZero(month.toString()) + week
  }

  const { year: sunYear, month: sunMonth } = getSunday({ year, month, date })

  if (sunMonth !== month) {
    return (
      year +
      addZero(sunMonth.toString()) +
      numOfWeekInMonth({ year: sunYear, month: sunMonth })
    )
  }

  const week: number = weekArraysMonthArr.reduce((acc, cur, i) => {
    if (cur.includes(new Date(year, dtMonth, date).toDateString())) return i
    return acc
  }, 0)

  return year + addZero(month.toString()) + week
}

export const getCalDates = (mid: string) => {
  const { year: y, month: m }: ymd = ymdFromMid(mid)

  const dt: Date = new Date(y, m - 1, 1)
  const month: number = dt.getMonth()
  const year: number = dt.getFullYear()

  const firstDayOfMonth: Date = new Date(year, month, 1)
  const daysInMonth: number = new Date(year, month + 1, 0).getDate()

  const firstDayDateString = firstDayOfMonth.toLocaleDateString('en-us', {
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  })
  const paddingDays: number = WEEKDAYS.indexOf(
    firstDayDateString.split(', ')[0]
  )

  const lastDayDateString: string = new Date(
    year,
    month + 1,
    0
  ).toLocaleDateString('en-us', {
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  })

  const endPaddingDays: number =
    WEEKDAYS.length - WEEKDAYS.indexOf(lastDayDateString.split(', ')[0]) - 1

  const paddingMonthArr: string[] = []
  for (let i = paddingDays - 1; i >= 0; i--) {
    paddingMonthArr.push(new Date(year, month, -i).toDateString())
  }

  const curMonthArr: string[] = []
  for (let i = 1; i <= daysInMonth; i++) {
    curMonthArr.push(new Date(year, month, +i).toDateString())
  }

  const endPaddingMonthArr: string[] = []
  for (let i = 0; i < endPaddingDays; i++) {
    endPaddingMonthArr.push(new Date(year, month + 1, i + 1).toDateString())
  }

  return [...paddingMonthArr, ...curMonthArr, ...endPaddingMonthArr]
}

const getSunday = ({ year, month, date }: ymd) => {
  const dtMonth: number = month - 1
  let dt: Date = new Date(year, dtMonth, date)

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

export const getDayOfPrevWeek = (dateString: string) => {
  const dt: Date = new Date(dateString)
  let resultDate: Date = new Date(
    dt.getFullYear(),
    dt.getMonth(),
    dt.getDate() - 1
  )
  if (dt.getMonth() === 0) {
    const { year, month, date }: ymd = getSunday({
      year: dt.getFullYear(),
      month: dt.getMonth() + 1,
      date: dt.getDate() - 1,
    })
    if (year !== dt.getFullYear()) return { year, month, date }
  }

  return ymdFromDate(resultDate)
}

export const getDayOfNextWeek = (dateString: string) => {
  const dt: Date = new Date(dateString)
  const resultDate: Date = new Date(
    dt.getFullYear(),
    dt.getMonth(),
    dt.getDate() + 1
  )
  return ymdFromDate(resultDate)
}

export const calcMid = (mid: string, adder: number) => {
  const year: number = parseInt(mid.slice(0, 4))
  const month: number = parseInt(mid.slice(-2))
  const resMonth: number = month + adder
  if (resMonth <= 12 && resMonth >= 1)
    return year.toString() + addZero(resMonth.toString())
  let addYear: number = Math.floor(resMonth / 12)
  if (resMonth <= 0) addYear -= 1
  let remainderMonth = resMonth % 12
  if (remainderMonth < 1) remainderMonth += 12

  return (year + addYear).toString() + addZero(remainderMonth.toString())
}

export const calcDid = (did: string, adder: number) => {
  const year: number = parseInt(did.slice(0, 4))
  const dtMonth: number = parseInt(did.slice(4, 6)) - 1
  const date: number = parseInt(did.slice(-2))
  const resDate: number = date + adder
  const resDt: Date = new Date(year, dtMonth, resDate)

  return (
    resDt.getFullYear() +
    addZero((resDt.getMonth() + 1).toString()) +
    addZero(resDt.getDate().toString())
  )
}
