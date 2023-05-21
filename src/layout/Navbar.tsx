import { Menu } from 'antd';
import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
    <Menu style={{backgroundColor:'#1a1a1a', color:'#1F51FF',display: 'flex', justifyContent: 'center', height:'3rem'}} mode="horizontal" className='nav-bar'>
      <Menu.Item key='nav2' className='nav-item'>
        <Link role='link' id="kategorije-link" to="/" >Početna</Link>
      </Menu.Item>
      <Menu.Item key='nav2' className='nav-item'>
        <Link role='link' id="kategorije-link" to="/categories" >Kategorije videoigara</Link>
      </Menu.Item>
      <Menu.Item key="nav3" className='nav-item'>
        <Link to="/publishers" >Proizvođači videoigara</Link>
      </Menu.Item>
    </Menu>
  );
};

export default Navbar;