
import AJAX from '../common/ajax'

export function addAnswer({ questionId, answerContent, deviceId, accessToken, callback }) {

  AJAX({
    url: '/api/v1/add-answer',
    type: 'post',
    headers: { AccessToken: accessToken },
    data: {
      question_id : questionId,
      answer_content : answerContent,
      device_id : deviceId
    },
    callback: (result) => {
      if (result.success) {
        callback(null, result);
      } else {
        callback(true, result)
      }
    }
  })

}


export const loadAnswers = ({ accessToken, data, callback }) => {

  AJAX({
    url: '/api/v1/answers',
    headers: { AccessToken: accessToken },
    data: data,
    callback: (result) => {
      if (result.success) {
        callback(null, result);
      } else {
        callback(true, result)
      }
    }
  })

}
