// @flow

import * as React from 'react';

type PrimaryButtonPropsT = {
  title: string,
  active?: boolean,
  icon?: React.ComponentType<*>,
  callback?: () => void,
  italics?: boolean
};

export default (props: PrimaryButtonPropsT) => {
  const { active, title, icon, callback, italics } = props;

  const Icon = icon;

  return (
    <div
      data-test="primary-button"
      style={{
        display: 'flex',
        flex: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '14px',
        fontStyle: italics ? 'italic' : 'normal',
        cursor: callback && 'pointer',
        padding: '20px 0'
      }}
      onClick={callback}
    >
      {Icon !== undefined ? (
        <Icon
          style={{ marginRight: '5px' }}
          color={active ? 'secondary' : 'primary'}
        />
      ) : null}
      <span>{title}</span>
    </div>
  );
};
