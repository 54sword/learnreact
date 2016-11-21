import * as API from '../api/questions'

import { Editor, EditorState, RichUtils, Entity, AtomicBlockUtils, convertToRaw, convertFromRaw, CompositeDecorator } from 'draft-js'

function getEntityStrategy(mutability) {
  return function(contentBlock, callback) {
    contentBlock.findEntityRanges(
      (character) => {
        const entityKey = character.getEntity();
        if (entityKey === null) {
          return false;
        }
        return Entity.get(entityKey).getMutability() === mutability;
      },
      callback
    );
  };
}

function getDecoratedStyle(mutability) {
  switch (mutability) {
    case 'IMMUTABLE': return styles.immutable;
    case 'MUTABLE': return styles.mutable;
    case 'SEGMENTED': return styles.segmented;
    default: return null;
  }
}

const TokenSpan = (props) => {
  const style = getDecoratedStyle(
    Entity.get(props.entityKey).getMutability()
  )
  return (
    <span {...props} style={style}>
      {props.children}
    </span>
  )
}

const decorator = new CompositeDecorator([
  {
    strategy: getEntityStrategy('IMMUTABLE'),
    component: TokenSpan,
  },
  {
    strategy: getEntityStrategy('MUTABLE'),
    component: TokenSpan,
  },
  {
    strategy: getEntityStrategy('SEGMENTED'),
    component: TokenSpan,
  }
])

import {
  ADD_QUESTIONS,
  QUESTIONS_LOADING_STATUS,
  QUESTIONS_NOMORE_STATUS,
  ADD_NEW_QUESTIONS_LIST
} from '../constants/QuestionsTypes'

// 添加问题
function addQuestions(name, questions, unshift) {
  return { type: ADD_QUESTIONS, questions, name, unshift }
}

function loadingQuestions(name, status) {
  return { type: QUESTIONS_LOADING_STATUS, name, status }
}

function nomoreQuestion(name, status) {
  return { type: QUESTIONS_NOMORE_STATUS, name, status }
}


function addNewQuestionList(name, perPage, filters) {
  return { type: ADD_NEW_QUESTIONS_LIST, name, perPage, filters }
}

// 添加新的问题列表
export function addNewQuestionsList({ name, filters }) {
  return (dispatch, getState) => {
    dispatch({ type: ADD_NEW_QUESTIONS_LIST, name, filters })
  }
}

// 重置问题列表
export function resetNewQuestionList({ name, filters = null }) {
  return (dispatch, getState) => {

    if (!getState().questions[name]) {
      return
    }

    if (!filters) {
      filters = getState().questions[name].filters
      filters.date = new Date()
    }

    dispatch({ type: 'RESET_QUESTIONS_LIST', name, filters })
  }
}

export function deleteQuestionList({ name }) {
  return (dispatch, getState) => {
    dispatch({ type: 'DELETE_QUESTIONS_LIST', name })
  }
}

// 获取问题列表
export function loadQuestionsByName(name) {
  return (dispatch, getState) => {

    const questions = getState().questions[name]
    let accessToken = getState().sign.accessToken

    if (questions.nomore || questions.loading) {
      return
    }

    dispatch(loadingQuestions(name, true))

    API.getQuestions({
      accessToken,
      data: questions.filters,
      callback:(questions)=>{
        dispatch(loadingQuestions(name, false))

        if (!questions) {
          return
        }

        if (questions.length == 0) {
          dispatch(nomoreQuestion(name, true))
        } else {

          for (let i = 0, max = questions.length; i < max; i++) {
            let answers = questions[i].answers
            for (let n = 0, length = answers.length; n < length; n++) {

              let e = EditorState.createWithContent(convertFromRaw(JSON.parse(answers[n].content)), decorator)
              const content = e.getCurrentContent()
              let raw = convertToRaw(content)

              // console.log(raw.entityMap)

              let text = ''

              for (let x in raw.blocks) {
                text += raw.blocks[x].text
              }

              if (text.length > 140) {
                text = text.slice(0, 140)
                text = text.replace(/\n/g,"")+'...'
              }

              questions[i].answers[n].content = text
              questions[i].answers[n].media = raw.entityMap[0] ? raw.entityMap[0].data.src : ''

            }
          }

          dispatch(addQuestions(name, questions))
        }

      }
    })
  }
}

// 添加问题
export function addQuestion({ title, detail, nodeId, device, callback }) {
  return (dispatch, getState) => {

    let accessToken = getState().sign.accessToken

    API.addQuestion({
      title,
      detail,
      nodeId,
      device,
      accessToken,
      callback: function(err, question){
        if (err) return callback(err)
        dispatch(addQuestions('home', [question], true))
        callback(null, question)
      }
    })
  }
}

// 通过id获取指定问题
export function loadQuestionById({ questionId, callback }) {
  return (dispatch, getState) => {

    var data = {
      question_id: questionId,
      or: 0
    }

    let accessToken = getState().sign.accessToken

    API.getQuestionById({
      accessToken,
      data,
      callback: (err, question)=>{

        if (question) {
          dispatch({ type: 'ADD_QUESTION', question: question })
        }

        callback(err, question)

      }
    })
  }
}
