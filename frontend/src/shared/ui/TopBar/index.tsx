/** @jsxImportSource @emotion/react */
import { TopBarProps } from './TopBar.types';
import { base } from './TopBar.styles';
import { IoIosArrowBack, IoIosClose } from 'react-icons/io';
import { Icon } from '../Icon';
import { Typography } from '../Typography';

export const TopBar = ({
  children = '테스트',
  type = 'modal',
  iconHandler = () => {},
  ...props
}: TopBarProps) => {
  return (
    <div css={base(type)} {...props}>
      {type === 'page' && (
        <>
          <Typography color="light" size="1.25" weight={600}>
            {children}
          </Typography>
        </>
      )}
      {type === 'iconpage' && (
        <>
          <Icon size={2}>
            <IoIosArrowBack
              onClick={() => iconHandler()}
              style={{ marginRight: '0.5rem' }}
            />
          </Icon>
          <Typography color="light" size="1.25" weight={600}>
            {children}
          </Typography>
        </>
      )}
      {type === 'modal' && (
        <>
          <Typography
            style={{ flexGrow: 1, textAlign: 'center' }}
            color="light"
            size="1.25"
            weight={600}
          >
            {children}
          </Typography>
          <Icon size={2}>
            <IoIosClose onClick={() => iconHandler()} />
          </Icon>
        </>
      )}
    </div>
  );
};
