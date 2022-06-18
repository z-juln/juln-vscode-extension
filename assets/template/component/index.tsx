import { memo } from 'react';
import './style/index.less';

export interface <%= changeCase(name, 'upper-camel-case') %>Props {}

export const <%= changeCase(name, 'upper-camel-case') %>: React.FC<<%= changeCase(name, 'upper-camel-case') %>Props> = () => {

  return (
    <div className='<%= name %>'>
      <%= changeCase(name, 'upper-camel-case') %>
    </div>
  );
};

export default memo(<%= changeCase(name, 'upper-camel-case') %>);
