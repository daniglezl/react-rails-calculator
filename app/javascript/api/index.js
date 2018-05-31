import axios from 'axios'

export const getEvalExpression = (expression) => {
  return axios.get("/api/calculator/eval", {
    params: {
      expression
    }
  })
}