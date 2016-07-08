
export function fetchQuestionById(id, callback) {
  $.ajax({
    url: 'http://localhost:3000/api/v1/question/'+id,
    type: 'get',
    error(err) {
      var data = err.responseJSON;
      callback(data.error)
    },
    success(result) {
      callback(null, result);
    }
  })
}

export function signin(email, password, callback) {
  $.ajax({
    url: 'http://localhost:3000/api/v1/signin',
    type: 'post',
    data: {
      email: email,
      password: password
    },
    error(err) {
      var data = err.responseJSON;
      callback(data.error)
    },
    success(result) {
      callback(null, result);
    }
  })
}

export function fetchUserinfo(accessToken, callback) {

  $.ajax({
    url: 'http://localhost:3000/api/v1/user',
    type: 'post',
    data: {
      token: accessToken
    },
    error(err) {
      var data = err.responseJSON
      callback(data.error)
    },
    success(result) {
      callback(null, result)
    }
  });

}

export function fetchQuestions(perPage, date, callback) {

  $.ajax({
    url: 'http://localhost:3000/api/v1/questions',
    type: 'get',
    data: {
      per_page: perPage,
      date: date
    },
    error(err) {
      var data = err.responseJSON
      callback(data.error)
    },
    success(result) {
      callback(null, result)
    }
  });

}

/*
export const signin = (email, password, callback) => ({
  $.ajax({
    url: 'http://localhost:3000/api/v1/signin',
    type: 'post',
    data: {
      email: email,
      password: password
    },
    error(err) {
      var data = err.responseJSON;
      callback(data.error)
    },
    success(result) {
      callback(null, result);
    }
  })
});


// 获取用户信息
export const fetchUserinfo = (accessToken, callback) => ({

  $.ajax({
    url: 'http://localhost:3000/api/v1/user',
    type: 'post',
    data: {
      token: accessToken
    },
    error(err) {
      var data = err.responseJSON
      callback(data.error)
    },
    success(result) {
      callback(result)
    }
  });

});
*/
