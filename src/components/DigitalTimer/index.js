import {Component} from 'react'
import './index.css'

const initialState = {
  isTimeRunning: false,
  timerInMinutes: 25,
  timerInSeconds: 0,
}

class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  onClickMinus = () => {
    const {timerInMinutes} = this.state
    if (timerInMinutes > 1) {
      this.setState(prevState => ({
        timerInMinutes: prevState.timerInMinutes - 1,
      }))
    }
  }

  onClickPlus = () => {
    this.setState(prevState => ({timerInMinutes: prevState.timerInMinutes + 1}))
  }

  onClickResetButton = () => {
    this.clearTimerInterval()
    this.setState(initialState)
  }

  increaseTimerInSecond = () => {
    const {timerInMinutes, timerInSeconds} = this.state
    const isTimerCompleted = timerInSeconds === timerInMinutes * 60

    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({isTimeRunning: false})
    } else {
      this.setState(prevState => ({
        timerInSeconds: prevState.timerInSeconds + 1,
      }))
    }
  }

  onClickStartPauseButton = () => {
    const {isTimeRunning, timerInMinutes, timerInSeconds} = this.state
    const isTimerCompleted = timerInSeconds === timerInMinutes * 60
    if (isTimerCompleted) {
      this.setState({timerInSeconds: 0})
    }
    if (isTimeRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.increaseTimerInSecond, 1000)
    }
    this.setState(prevState => ({isTimeRunning: !prevState.isTimeRunning}))
  }

  getTimer = () => {
    const {timerInMinutes, timerInSeconds} = this.state
    const totalRemainingSeconds = timerInMinutes * 60 - timerInSeconds
    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    const formattedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const formattedSeconds = seconds > 9 ? seconds : `0${seconds}`
    return `${formattedMinutes}:${formattedSeconds}`
  }

  render() {
    const {timerInSeconds, timerInMinutes, isTimeRunning} = this.state
    const startPauseImgUrl = isTimeRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const startPauseText = isTimeRunning ? 'Pause' : 'Start'
    const status = isTimeRunning ? 'Running' : 'Paused'
    const altText = isTimeRunning ? 'pause icon' : 'play icon'
    const isButtonDisabled = timerInSeconds > 0

    return (
      <div className="bg-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="operation-container">
          <div className="timer-bg-container">
            <div className="timer-container">
              <h1 className="timer">{this.getTimer()}</h1>
              <p className="status">{status}</p>
            </div>
          </div>
          <div className="remote-container">
            <div className="start-pause-reset-container">
              <button
                className="plus-minus-button"
                type="button"
                onClick={this.onClickStartPauseButton}
              >
                <img src={startPauseImgUrl} className="icon" alt={altText} />
                <p className="text">{startPauseText}</p>
              </button>
              <button
                className="plus-minus-button"
                type="button"
                onClick={this.onClickResetButton}
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  className="icon"
                  alt="reset icon"
                />
                <p className="text">Reset</p>
              </button>
            </div>
            <p className="set-timer-text">Set Timer limit</p>
            <div className="set-timer-container">
              <button
                className="plus-minus-button plus-minus"
                type="button"
                onClick={this.onClickMinus}
                disabled={isButtonDisabled}
              >
                -
              </button>
              <p className="set-timer">{timerInMinutes}</p>
              <button
                className="plus-minus-button plus-minus"
                type="button"
                onClick={this.onClickPlus}
                disabled={isButtonDisabled}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
