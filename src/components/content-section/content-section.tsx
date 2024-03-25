import { PropsWithChildren } from 'react';
import s from './content-section.module.css';

export const ContentSection = (props: PropsWithChildren) => {
  return <main className={s['section-container']}>{props.children}</main>;
};
