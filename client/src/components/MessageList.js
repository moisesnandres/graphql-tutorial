import React from 'react';
import {
    gql,
    graphql,
} from 'react-apollo';

import AddMessage from './AddMessage';
import NotFound from './NotFound';

const MessageList = ({ data: {loading, error, messages } }) => {
  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  if(!messages){
    return <NotFound />
  }

  return (
    <div className="messagesList">
      { messages.map( message =>
        (<div key={message.id} className={'message ' + (message.id < 0 ? 'optimistic' : '')}>
            {message.message}
        </div>)
      )}
      <AddMessage />
    </div>
  );
};

export const messageQuery = gql`
  query MessageQuery($channelId : ID!) {
    messages(channelId: $channelId) {
      id
      message
    }
  }
`;

export default (graphql(messageQuery, {
  options: (props) => ({
    pollInterval: 5000,
    variables: { channelId: props.match.params.channelId },
  }),
})(MessageList));