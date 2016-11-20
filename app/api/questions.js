
import AJAX from '../common/ajax'

const loadQuestions = ({ accessToken = '', data, callback }) => {
  AJAX({
    url: '/api/v1/questions',
    data: data,
    headers: { AccessToken: accessToken },
    callback: (result)=>{

      var data = result.data

      /*
      var data = result.data

      data.map((question, i) => {
        if (question.answers.length > 0) {
          question.answers.map((answer, n)=>{
            if (answer.content.length > 140) {
              data[i].answers[n].content = answer.content.slice(0, 140)
              data[i].answers[n].content = answer.content.replace(/\n/g,"")+'...'
            }
          })
        }
      })
      */

      callback(data)

    }
  })
}

// 获取多个
export function getQuestions({ accessToken = '', data, callback }) {
  loadQuestions({ accessToken, data, callback })
}

// 通过id获取
export function getQuestionById({ accessToken = '', data, callback }) {
  loadQuestions({
    accessToken,
    data,
    callback: (questions)=>{
      callback(questions && questions.length > 0 ? questions[0] : null)
    }
  })
}

export function addQuestion({ title, detail, nodeId, device, accessToken, callback }) {
  AJAX({
    url: '/api/v1/add-question',
    type: 'post',
    data: { title: title, detail: detail, node_id: nodeId, device: device },
    headers: { AccessToken: accessToken },
    callback: (result)=>{
      if (result.success) {
        callback(null, result.data)
      } else {
        callback(result.error || 'error')
      }
    }
  })
}
