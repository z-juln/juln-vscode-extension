import { memo } from 'react';
import './style/index.less';

export interface <%= name.changeCase('upper-camel-case') %>Props {}

export const <%= name.changeCase('upper-camel-case') %>: React.FC<<%= name.changeCase('upper-camel-case') %>Props> = () => {

  return (
    <div className='<%= name %>'>
      <%= name.changeCase('upper-camel-case') %>
    </div>
  );
};

export default memo(<%= name.changeCase('upper-camel-case') %>);
