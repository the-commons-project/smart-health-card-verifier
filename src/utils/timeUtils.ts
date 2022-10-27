import { useTranslation } from '../services/i18n/i18nUtils'
import  moment from 'moment-timezone'

interface DateTimeType {
  rawData: string
  hasTime: boolean
  time: string | null
  month: string | null
  day: string | null
  year: string | null
  formattedDate: string | null
}

export const getLocalDateTimeStringDataFromDate = ( date: Date, timeZone: string, t:any ): DateTimeType => { 
  let time = null
  let month = null
  let day   = null
  let year  = null
  let formattedDate = null
  const defaultMonths = 'Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec'

  const mmt = moment(date)
  time = mmt.tz(timeZone).format('HH:mm Z z')
  formattedDate = mmt.format( 'YYYY-MM-DD' )

  const [_year, _month, _day] = formattedDate.split('-')
  const monthArr = t('Utility.Month', defaultMonths).split(',')
  month = monthArr[ ( parseInt(_month) - 1 ) ]
  formattedDate = t('Utility.Date', formattedDate, { month, year: _year, day : _day } )
  year = _year
  month = _month
  day = _day

  return {
    hasTime: true,
    rawData: '',
    time,
    formattedDate,
    year,
    month,
    day
  }

}

/* in convination with the i18n useTranslation, it returns localized formatted date and time */
export const  getLocalDateTimeStringData = ( rawData: string, timeZone: string, t: any ): DateTimeType | null => {
  let hasTime = false
  let d: any

  if ( rawData.length > 0  ) {
    if ( rawData.indexOf('T') >  0 ) {
      hasTime = true
      d = new Date( rawData )
    } else {
      d = new Date( rawData + 'T00:00:00+00:00')
    }
    const {
        time,
        formattedDate,
        year,
        month,
        day
    } = getLocalDateTimeStringDataFromDate( d, timeZone, t );

    return {
      rawData,
      hasTime,
      time,
      formattedDate,
      year,
      month,
      day
    }

  }
  return null;
}
