import React from 'react';

import './Message.css';

const Message = ({ type, children }) => {
  const className =
    'message rounded text-centered p-2 my-1' + (type ? ` message-${type}` : '');
  return <div className={className}>{children}</div>;
};

Message.defaultProps = {
  type: 'info',
};

export default Message;
