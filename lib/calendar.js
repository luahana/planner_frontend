export const weekdays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

const weekArrByWidObj = (year, month) => {
  const wids = widsMonth(year, month)
  const weekArrays = getWeekArraysMonthArr(year, month)

  return weekArrays.reduce((acc, cur, i) => ({ ...acc, [wids[i]]: cur }), {})
}

export const weekArrByWid = (wid) => {
  const widYear = parseInt(wid.slice(0, 4))
  const widMonth = parseInt(wid.slice(4, 6))
  return weekArrByWidObj(widYear, widMonth)
}

export const numOfWeekInMonth = (year, month) => {
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

export const widsMonth = (year, month) => {
  const weekArraysMonthArr = getWeekArraysMonthArr(year, month)
  return weekArraysMonthArr.map((arr) => {
    const dt = new Date(arr[0])
    return calcWeekId(dt.getFullYear(), dt.getMonth() + 1, dt.getDate())
  })
}

const getWeekArraysMonthArr = (year, month) => {
  const monthArr = fullMonthArray(year, month)

  const weekArrays = []
  while (monthArr.length) {
    weekArrays.push(monthArr.splice(0, 7))
  }
  return weekArrays
}

export const calcWeekId = (year, month, date) => {
  const dtMonth = month - 1
  const weekArraysMonthArr = getWeekArraysMonthArr(year, month)

  if (new Date(year, dtMonth, 1).getDay() === 0) {
    const week = weekArraysMonthArr.reduce((acc, cur, i) => {
      if (cur.includes(new Date(year, dtMonth, date).toDateString()))
        return acc + i
      return acc
    }, 1)

    return (
      year +
      month.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
      }) +
      week
    )
  }

  const { year: sunYear, month: sunMonth } = getSunday(year, month, date)

  if (sunMonth !== month) {
    return (
      year +
      sunMonth.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
      }) +
      numOfWeekInMonth(sunYear, sunMonth)
    )
  }

  const week = weekArraysMonthArr.reduce((acc, cur, i) => {
    if (cur.includes(new Date(year, dtMonth, date).toDateString())) return i
    return acc
  }, 0)

  return (
    year +
    month.toLocaleString('en-US', {
      minimumIntegerDigits: 2,
    }) +
    week
  )
}

export const fullMonthArray = (y, m) => {
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
  const paddingDays = weekdays.indexOf(firstDayDateString.split(', ')[0])

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
    weekdays.length - weekdays.indexOf(lastDayDateString.split(', ')[0]) - 1

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

const getSunday = (year, month, date) => {
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
    const { year, month, date } = getSunday(
      dt.getFullYear(),
      dt.getMonth() + 1,
      dt.getDate() - 1
    )
    if (year !== dt.getFullYear())
      return { prevYear: year, prevMonth: month, prevDate: date }
  }

  return {
    prevYear: resultDate.getFullYear(),
    prevMonth: resultDate.getMonth() + 1,
    prevDate: resultDate.getDate(),
  }
}

export const getDayOfNextWeek = (dateString) => {
  const dt = new Date(dateString)
  const resultDate = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate() + 1)
  return {
    nextYear: resultDate.getFullYear(),
    nextMonth: resultDate.getMonth() + 1,
    nextDate: resultDate.getDate(),
  }
}

export const calcMid = (mid, adder) => {
  const year = parseInt(mid.slice(0, 4))
  const month = parseInt(mid.slice(-2))
  const resMonth = month + adder
  if (resMonth <= 12 && resMonth >= 1)
    return (
      year.toString() +
      resMonth.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
      })
    )
  const addYear = Math.floor(resMonth / 12)
  if (resMonth <= 0) addYear -= 1
  const remainderMonth = resMonth % 12
  if (remainderMonth < 1) remainderMonth += 12

  return (
    (year + addYear).toString() +
    remainderMonth.toLocaleString('en-US', {
      minimumIntegerDigits: 2,
    })
  )
}

export const calcDid = (did, adder) => {
  const year = parseInt(did.slice(0, 4))
  const dtMonth = parseInt(did.slice(4, 6)) - 1
  const date = parseInt(did.slice(-2))
  const resDate = date + adder
  const resDt = new Date(year, dtMonth, resDate)

  return (
    resDt.getFullYear() +
    (resDt.getMonth() + 1).toLocaleString('en-US', {
      minimumIntegerDigits: 2,
    }) +
    resDt.getDate().toLocaleString('en-US', {
      minimumIntegerDigits: 2,
    })
  )
}

export const convertDateStrToDid = (dateStr) => {
  const dt = new Date(dateStr)
  const year = dt.getFullYear()
  const month = dt.getMonth() + 1
  const date = dt.getDate()
  return (
    year.toString() +
    month.toLocaleString('en-US', {
      minimumIntegerDigits: 2,
    }) +
    date.toLocaleString('en-US', {
      minimumIntegerDigits: 2,
    })
  )
}
