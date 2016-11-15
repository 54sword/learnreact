import * as types from '../constants/ActionTypes'
import config from '../../config/config'

let apiUrl = config.API_URL

export function fetchUserInfo(accessToken, callback) {
  return (dispatch, getState) => {
    $.ajax({
      url: apiUrl+'/api/v1/user',
      type: 'post',
      data: {
        access_token: accessToken
      },
      error(err) {
        dispatch(removeToken())
        callback(err.responseJSON.error)
      },
      success(result) {
        dispatch(addAccessToken(accessToken))
        dispatch(setUser(result.data))
        callback(null);
      }
    });
  }
}


// 添加答案
export function addAnswer(config, accessToken, callback) {
  return dispatch => {
    $.ajax({
      url: apiUrl+'/api/v1/add-answer',
      type: 'post',
      data: {
        question_id : config.questionId,
        answer_brief : config.answerBrief,
        answer_content : config.answerDetail,
        price : config.answerPrice,
        device_id : config.deviceId,
        access_token: accessToken
      },
      error(err) {
        callback(err.responseJSON.error)
      },
      success(result) {
        callback(null, result);
      }
    })
  }
}

// 注册邮箱验证
export function signupEmailVerify(code, callback) {

  return dispatch => {

    $.ajax({
      url: apiUrl+'/api/v1/signup-email-verify',
      type: 'post',
      data: {
        code: code
      },
      error(err) {
        callback(err.status, err.responseJSON)
      },
      success(result) {
        callback(null, result);
      }
    });

  }

}


// 获取问题列表
export function fetchQuestions(perPage, date, callback) {


  return (dispatch, getState) => {

    const question = getState().question

    if (question.nomore || question.loading) {
      return;
    }

    dispatch(loadingQuestions(true))

    $.ajax({
      url: apiUrl+'/api/v1/questions',
      type: 'get',
      data: {
        per_page: question.perPage,
        date: question.date
      },
      error(err) {
        dispatch(loadingQuestions(false))
        // callback(err.status, err.responseJSON)
      },
      success(result) {
        dispatch(loadingQuestions(false))
        if (result.length == 0) {
          dispatch(nomoreQuestion(true))
        } else {
          dispatch(addQuestions(result))
        }
        // callback(null, result);
      }
    });
  }

}

export function setUser(userinfo) {
  return { type: 'SET_USER', userinfo }
}

export function addAccessToken(token) {
  return { type: types.ADD_ACCESS_TOKEN, token }
}

export function removeToken() {
  return { type: 'REMOVE_COOKIE' }
}

export function showSigninBox(show) {
  return { type: 'SHOW_SIGNIN_BOX', show }
}

export function addQuestions(questions) {
  return { type: 'ADD_QUESTIONS', questions }
}

export function loadingQuestions(bl) {
  return { type: 'LOADING_QUESTIONS', bl }
}

export function nomoreQuestion(bl) {
  return { type: 'NOMORE_QUESTIONS', bl }
}

export function setScroll(name) {
  return { type: 'SET_SCROLL', name }
}

export function setScrollPosition(name) {
  return { type: 'SET_SCROLL_POSITION', name }
}


export function setScrollPosition(name) {
  return { type: 'SET_SCROLL_POSITION', name }
}

export function saveScrollPosition(name) {
  return { type: 'SAVE_SCROLL_POSITION', name }
}
