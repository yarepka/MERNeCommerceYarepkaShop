import React from 'react';

import './Message.css';

const Message = ({ type, children, size }) => {
  const className =
    'message text-centered p-1 my-1' +
    (type ? ` message-${type}` : '') +
    (size ? ` message-${size}` : '');
  return <div className={className}>{children}</div>;
};

Message.defaultProps = {
  type: 'info',
};

export default Message;
