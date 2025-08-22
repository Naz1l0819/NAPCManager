import Protected from '../../components/Protected';

export const metadata = {
  title: 'Dashboard | Not a Parent Company'
};

export default function ManageLayout({ children }: { children: React.ReactNode }) {
  return (
    <Protected>
      <div className="container">
        <h1 style={{marginTop:'2rem'}}>Dashboard</h1>
        <p className="muted" style={{marginTop:'-0.4rem'}}>Where the real (boring) power lives.</p>
        <nav style={{display:'flex', gap:'0.8rem', flexWrap:'wrap', margin:'1.25rem 0'}}>
          {[
            ['/', '← Site'],
            ['/manage', 'Overview'],
            ['/manage/budgets', 'Budgets'],
            ['/manage/capital', 'Capital'],
            ['/manage/dividends', 'Dividends'],
            ['/manage/meetings', 'Meetings'],
            ['/manage/invoicing', 'Invoicing'],
            ['/manage/statements', 'Statements'],
            ['/manage/staff', 'Staff'],
            ['/manage/settings', 'Settings']
          ].map(([href,label]) => (
            <a key={href} href={href} style={{fontSize:'0.7rem', letterSpacing:'0.08em', textTransform:'uppercase'}}>{label}</a>
          ))}
        </nav>
        {children}
      </div>
    </Protected>
  );
}