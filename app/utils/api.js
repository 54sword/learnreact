
import config from '../config/config'
let apiUrl = config.API_URL

// 购买答案
export function buyAnswer(id, accessToken, callback) {
  $.ajax({
    url: apiUrl+'/api/v1/buy-answer',
    type: 'post',
    data: {
      answer_id: id,
      access_token: accessToken
    },
    error(err) {
      callback(err.status, err.responseJSON)
    },
    success(result) {
      callback(null, result);
    }
  })
}

// 获取答案
export function fetchAnswer(id, callback) {
  $.ajax({
    url: apiUrl+'/api/v1/answer/'+id,
    type: 'get',
    error(err) {
      callback(err.status, err.responseJSON)
    },
    success(result) {
      callback(null, result);
    }
  })
};

// 获取答案
export function fetchAnswers(id, callback) {
  $.ajax({
    url: apiUrl+'/api/v1/answers',
    type: 'get',
    data: {
      question_id: id
    },
    error(err) {
      callback(err.status, err.responseJSON)
    },
    success(result) {
      callback(null, result);
    }
  })
};

// 添加答案
export function addAnswer(config, accessToken, callback) {
  $.ajax({
    url: apiUrl+'/api/v1/add-answer',
    type: 'post',
    data: {
      question_id : config.question_id,
      answer_brief : config.answer_brief,
      answer_content : config.answer_content,
      price : config.price,
      device_id : config.device_id,
      access_token: accessToken
    },
    error(err) {
      callback(err.status, err.responseJSON)
    },
    success(result) {
      callback(null, result);
    }
  })
}


export function addQuestion(config, accessToken, callback) {
  $.ajax({
    url: apiUrl+'/api/v1/add-question',
    type: 'post',
    data: {
      title: config.title,
      detail: config.detail,
      node_id: config.nodeId,
      device: config.device,
      access_token: accessToken
    },
    error(err) {
      callback(err.status, err.responseJSON)
    },
    success(result) {
      callback(null, result);
    }
  })
}

// 根据 id 获取某个问题
export function fetchQuestionById(id, callback) {
  $.ajax({
    url: apiUrl+'/api/v1/question/'+id,
    type: 'get',
    error(err) {
      callback(err.status, err.responseJSON)
    },
    success(result) {
      callback(null, result);
    }
  })
}

// 登录获取 token
export function signin(email, password, callback) {

  $.ajax({
    url: apiUrl+'/api/v1/signin',
    type: 'post',
    data: {
      email: email,
      password: password
    },
    error(err) {
      callback(err.status, err.responseJSON)
    },
    success(result) {
      callback(null, result);
    }
  })

}

export function signup(userinfo, callback) {

  $.ajax({
    url: apiUrl+'/api/v1/signup',
    type: 'post',
    data: {
      nickname: userinfo.nickname,
      email: userinfo.email,
      password: userinfo.password,
      gender: userinfo.gender,
      source: userinfo.source ? userinfo.source : 0
    },
    error(err) {
      callback(err.status, err.responseJSON)
    },
    success(result) {
      callback(null, result);
    }
  });

}

export function signupEmailVerify(code, callback) {

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


// 获取用户信息
export function fetchUserinfo(accessToken, callback) {

  $.ajax({
    url: apiUrl+'/api/v1/user',
    type: 'post',
    data: {
      access_token: accessToken
    },
    error(err) {
      callback(err.status, err.responseJSON)
    },
    success(result) {
      callback(null, result);
    }
  });

}

// 获取问题列表
export function fetchQuestions(perPage, date, callback) {

  $.ajax({
    url: apiUrl+'/api/v1/questions',
    type: 'get',
    data: {
      per_page: perPage,
      date: date
    },
    error(err) {
      callback(err.status, err.responseJSON)
    },
    success(result) {
      callback(null, result);
    }
  });

}

export function fetchAllNode(callback) {
  $.ajax({
    url: apiUrl+'/api/v1/nodes',
    type: 'get',
    error(err) {
      callback(err.status, err.responseJSON)
    },
    success(result) {
      callback(null, result);
    }
  });
}
