export default class Timer{
  startTime: number /* milli second */
  timeTook: number /* milli second */
  constructor (){
    this.startTime = 0
    this.timeTook  = 0
  }

  start (){
    this.startTime = ( new Date() ).getTime()
  }

  /**
   * result will be return in second.
   * @return {number} [description]
   */
  stop (): number{
    const time = ( new Date() ).getTime()
    this.timeTook = ( time - this.startTime )
    return this.timeTook / 1000
  }

}
