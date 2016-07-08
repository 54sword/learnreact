import React from 'react';
import {get} from '../utils/ajax';

export default class Plist extends React.Component {

  constructor(props) {
    super(props);
    this.state = {"loading":false, "list": []};
  }

  //当初次渲染完毕 设置该组件的属性firstView为true
  componentDidMount() {
    this.setState({"firstView": true});
  }

  //当传入的props有变化，请注意看上面第二张图，就是时候发起请求 更新列表的内容了
  componentWillReceiveProps(nextProps) {
    let keyword = nextProps.keyword;
    this.setState({"loading": true, 'firstView': false});
    let url = `https://api.github.com/search/users?q=${keyword}`;
    get(url).then((data) => {
      this.setState({"loading":false, "list": data.items});
    }).catch((error) => {
      console.error(error);
    });
  }

  // 渲染
  render() {

    const imgStyle = {
      width: '100px'
    }

    //添加一些if else的判断，用来展示不同的内容
    if (this.state.firstView) {
      return (
        <h2>Enter name to search</h2>
      )
    }
    if (this.state.loading) {
      return (
        <h2>Loading result...</h2>
      );
    } else {
      if (this.state.list.length === 0) {
        return (
          <h2>No result.</h2>
        )
      } else {
        return (
          <div className="row">
            {this.state.list.map(people=>{
              return (
                <div key={people.id} className="card">
                  <img src={people.avatar_url} style={imgStyle}/>
                  <p className="card-text">{people.login}</p>
                </div>
              )
            })}
         </div>
       );
      }
    }
  }
}
