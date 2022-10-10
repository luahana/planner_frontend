export interface ymd {
  year: number
  month: number
  date?: number
}

export interface ymw {
  year: number
  month: number
  week: number
}

export const addZero = (num: string): string => `${num}`.padStart(2, '0')

export const dateFromDid = (did: string): Date => {
  return new Date(
    parseInt(did.slice(0, 4)),
    parseInt(did.slice(4, 6)) - 1,
    parseInt(did.slice(-2))
  )
}

export const midFromYmd = ({ year, month }: ymd): string => {
  return year.toString() + addZero(month.toString())
}
export const midFromDate = (dt: Date): string => {
  return midFromYmd(ymdFromDate(dt))
}

export const didFromDate = (dt: Date): string => {
  return didFromYmd(ymdFromDate(dt))
}
export const didFromDateStr = (dateStr: string): string => {
  return didFromYmd(ymdFromDate(new Date(dateStr)))
}

export const didFromYmd = ({ year, month, date }: ymd): string => {
  return year.toString() + addZero(month.toString()) + addZero(date.toString())
}

export const ymdFromDate = (dt: Date): ymd => {
  return {
    year: dt.getFullYear(),
    month: dt.getMonth() + 1,
    date: dt.getDate(),
  }
}

export const ymdFromDid = (did: string): ymd => {
  return {
    year: parseInt(did.slice(0, 4)),
    month: parseInt(did.slice(4, 6)),
    date: parseInt(did.slice(-2)),
  }
}
export const ymdFromMid = (mid: string): ymd => {
  return { year: parseInt(mid.slice(0, 4)), month: parseInt(mid.slice(4, 6)) }
}

export const ymwFromWid = (wid: string): ymw => {
  return {
    year: parseInt(wid.slice(0, 4)),
    month: parseInt(wid.slice(4, 6)),
    week: parseInt(wid.slice(-1)),
  }
}
