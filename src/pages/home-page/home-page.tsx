import s from './home-page.module.css';
// import logo from '../../logo.svg';

const mockPhotoList = [
  {
    id: 'nIQXvHCTXa4',
    url: 'https://images.unsplash.com/photo-1708133244400-8037fac6addb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NzMxNzF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MTA1ODkxOTV8&ixlib=rb-4.0.3&q=80&w=400'
  },
  {
    id: 'iFrZ1gJxp0U',
    url: 'https://images.unsplash.com/photo-1708194950241-a3c16872e29c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NzMxNzF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MTA1ODkxOTV8&ixlib=rb-4.0.3&q=80&w=400'
  },
  {
    id: 'KN4qjbqsMps',
    url: 'https://images.unsplash.com/photo-1708793699440-67fa853abd4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NzMxNzF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MTA1ODkxOTV8&ixlib=rb-4.0.3&q=80&w=400'
  },
  {
    id: 'jaINb9O8cKs',
    url: 'https://images.unsplash.com/photo-1708920789029-fa319c7adb4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NzMxNzF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MTA1ODkxOTV8&ixlib=rb-4.0.3&q=80&w=400'
  }
];

export const HomePage = () => {
  return (
    <main className={s.home}>
      <h1 className={s['home-title']}>Home Page</h1>
      <section className={s['home-section']}>
        <ul className={s.list}>
          {mockPhotoList.map(item => (
            <li key={item.id}>
              <img src={item.url} />
              {/* <p>{item.alt_description}</p> */}
            </li>
          ))}
        </ul>
      </section>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header> */}
    </main>
  );
};
