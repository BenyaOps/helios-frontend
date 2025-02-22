import { Badge } from 'antd'
import AvatarComponent from './Navbar/Avatar'
import {  DownOutlined } from '@ant-design/icons';

const Navbar = () => {
  return (
    <div className='navbar'>
        <div className="left">
        <div className="logo">
            <h2>Logo</h2>
        </div>  
        <div className="options">
            <ul>
                <li>Dashboard</li>
                <li>Organizacion</li>
                <li>Modelos <DownOutlined /></li>
                <li>Seguimiento <DownOutlined /></li>
            </ul>
        </div>
        </div>
        <div className="right">
        <div className="utils">
            <div className="settings">
                <ul>
                    <li>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            fill="currentColor"
                        >
                            <path d="M21 7h-1V6c0-1.1-.9-2-2-2H6C4.9 4 4 4.9 4 6v1H3c-1.1 0-2 .9-2 2v9c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zM6 6h12v1H6V6zm15 12H3v-9h18v9zM8 11h8v2H8v-2z" />
                        </svg>
                    </li>
                    <li>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            fill="currentColor"
                        >
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                        </svg>
                    </li>
                    <li className='button_notification'>
                    <Badge size="small" count={4}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            fill="currentColor"
                        >
                            <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5S10 3.17 10 4v.68C7.13 5.36 5.5 7.92 5.5 11v5l-1.7 1.7c-.14.14-.3.3-.3.6v.5h16v-.5c0-.3-.16-.46-.3-.6L18 16zM16 17H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z" />
                        </svg>
                    </Badge>
                    </li>
                </ul>
            </div>
            <div className="avatar">
                <AvatarComponent />
            </div>
        </div>
        </div>
    </div>
  )
}

export default Navbar