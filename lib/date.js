export const addZero = (num) => `${num}`.padStart(2, '0')

export const dateFromDid = (did) => {
  return new Date(
    parseInt(did.slice(0, 4)),
    parseInt(did.slice(4, 6) - 1),
    parseInt(did.slice(-2))
  )
}

export const midFromYmd = ({ year, month }) => {
  return year.toString() + addZero(month)
}
export const midFromDate = (dt) => {
  return midFromYmd(ymdFromDate(dt))
}

export const didFromDate = (dt) => {
  return didFromYmd(ymdFromDate(dt))
}
export const didFromDateStr = (dateStr) => {
  return didFromYmd(ymdFromDate(new Date(dateStr)))
}

export const didFromYmd = ({ year, month, date }) => {
  return year.toString() + addZero(month) + addZero(date)
}

export const ymdFromDate = (dt) => {
  return {
    year: dt.getFullYear(),
    month: dt.getMonth() + 1,
    date: dt.getDate(),
  }
}

export const ymdFromDid = (did) => {
  return {
    year: parseInt(did.slice(0, 4)),
    month: parseInt(did.slice(4, 6)),
    date: parseInt(did.slice(-2)),
  }
}
export const ymdFromMid = (mid) => {
  return { year: parseInt(mid.slice(0, 4)), month: parseInt(mid.slice(4, 6)) }
}

export const ymwFromWid = (wid) => {
  return {
    year: wid.slice(0, 4),
    month: parseInt(wid.slice(4, 6)),
    week: wid.slice(-1),
  }
}
