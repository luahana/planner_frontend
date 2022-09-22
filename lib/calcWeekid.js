const calcWeekid = (curWeekid, adder) => {
  const week = curWeekid.slice(-2)
  const year = curWeekid.slice(0, 4)
  let resWeek = parseInt(week) + adder
  let resYear = parseInt(year)
  if (resWeek > 52) {
    resYear += 1
    resWeek -= 52
  }
  if (resWeek < 1) {
    resYear -= 1
    resWeek += 52
  }

  return (
    resYear.toString() +
    resWeek.toLocaleString('en-US', {
      minimumIntegerDigits: 2,
    })
  )
}

export default calcWeekid
