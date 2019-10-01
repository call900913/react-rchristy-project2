import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

function mapStateToProps({ authedUser, users, questions }) {
  console.log('Users[authedUser: ', questions)
  const answers = users[authedUser].answers

  const answeredQs = answers.map((id) => questions[id])
    .sort((a,b) => b.timestamp - a.timestamp)

  const unansweredQs = Object.keys(questions)
    .filter((id) => !answers.includes(id))
    .map((id) => questions[id])
    .sort((a,b) => b.timestamp - a.timestamp)

  return {
    answeredQs,
    unansweredQs
  }
}

class Dashboard extends React.Component {
  state = {
    showAnswered: false
  }
  showAnswered = () => {
    this.setState(() => ({
      showAnswered: true
    }))
  }
  showUnanswered = () => {
    this.setState(() => ({
      showAnswered: false
    }))
  }

  render() {
    const { showAnswered } = this.state
    const { answeredQs, unansweredQs } = this.props

    const list = showAnswered === true ? answeredQs : unansweredQs

    return (
      <div>
        <div className='dashboard-category'>
          <button
            style={{color: showAnswered === false ? 'green' : 'inherit'}}
            onClick={this.showUnanswered}
          >Unanswered</button>
          <span>    </span>
          <button
            style={{color: showAnswered === true ? 'green' : 'inherit'}}
            onClick={this.showAnswered}
          >Answered</button>
        </div>
        <ul className='dashboard-ul'>
          {list.map((q) => (
            <li key={q.id}>
              <Link to={`questions/${q.id}`}>{q.id}</Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}



export default connect(mapStateToProps)(Dashboard)
