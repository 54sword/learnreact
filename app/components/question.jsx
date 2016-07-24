import React from 'react';

// import './question.scss';

// import {get} from '../utils/ajax';
// import $ from 'jquery';

export default class Plist extends React.Component {

  constructor(props) {
    super(props);
    this.state = {"loading":false, "list": []};
  }

  //当初次渲染完毕 设置该组件的属性firstView为true
  componentDidMount() {

    var self = this;

    $.ajax({
      url: 'http://localhost:3000/fetch-question',
      type: 'get',
      data: {
        per_page: 3,
        type: 'global'
      }
    }).done(function(result){

      self.setState({"loading":false, "list": result});

      console.log(result);
    });

    /*

    let url = `http://localhost:3000/fetch-question`;
    get(url).then((data) => {

      console.log(data);

      this.setState({"loading":false, "list": data});
    }).catch((error) => {
      console.error(error);
    });
    */

    // this.setState({"firstView": true});
  }
  /*
  //当传入的props有变化，请注意看上面第二张图，就是时候发起请求 更新列表的内容了
  componentWillReceiveProps(nextProps) {
    let keyword = nextProps.keyword;
    this.setState({"loading": true, 'firstView': false});
    let url = `http://localhost:3000/fetch-question?per_page=30&type=all`;
    get(url).then((data) => {
      this.setState({"loading":false, "list": data.items});
    }).catch((error) => {
      console.error(error);
    });
  }
  */


  // 渲染
  render() {

    if (this.state.loading) {
      return (
        <h2>Loading result...</h2>
      )
    } else {
      if (this.state.list.length === 0) {
        return (
          <h2>No result.</h2>
        )
      } else {
        return (
          <div id="questions">
            {this.state.list.map(question=>{
              return (
                <div key={question._id} className="question">
                  <div><img src={question.user_id.avatar_url} /></div>
                  <div>
                    <p>{question.title}</p>
                    <p>{question.content}</p>
                  </div>
                  <div className="answers">
                    {question.answers.map(answer=>{
                      return (
                        <div key={answer._id}>
                          <div>
                            <img width="30" src={answer.user_id.avatar_url} />
                          </div>
                          <div>
                            <p>{answer.brief}</p>
                            <p>¥ {answer.price} 查看答案</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        );
      }
    }


  }
}
