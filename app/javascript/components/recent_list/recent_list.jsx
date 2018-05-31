import React from 'react'
import PropTypes from'prop-types'
import RecentItem from './recent_item'

const RecentList = ({ recent, handleClick }) => {
  return recent.map((e, i) =>
    <RecentItem
      key={i}
      expression={e.expression}
      result={e.result}
      handleClick={() => handleClick(e.expression, e.result)}
    />
  )
}

RecentList.propTypes = {
  recent: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleClick: PropTypes.func
}

export default RecentList