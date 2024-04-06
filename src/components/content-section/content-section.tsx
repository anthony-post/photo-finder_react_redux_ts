import { PropsWithChildren } from 'react';
import s from './content-section.module.css';

export const ContentSection = (props: PropsWithChildren) => {
  return <main className={s['content-section']}>{props.children}</main>;
};
