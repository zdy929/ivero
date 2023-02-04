import React, { useState } from 'react'
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons'
import { Menu } from 'antd';
// import { history } from 'umi'
import './MainLayOut.less'
import Bread from './components/Bread';

export default function MainLayOut(props) {
    const { history } = props
    // 控制展开
    const [openKeys, setOpenKeys] = useState(['sub1']);
    // menu 选中
    const [selected, setSelected] = useState(['/detail']);

    // // 展开的事件监听
    // const onOpenChange = (keys) => {
    //     // console.log(keys, '1111');
    //     // openKeys // [sub1]
    //     // keys // ['sub1', 'sub2'] 
    //     const value = keys.filter(dt => dt !== openKeys[0])
    //     setOpenKeys(value)
    // };

    function getItem(label, key, icon, children, type) {
        return {
            key,
            icon,
            children,
            label,
            type,
        };
    }

    const items = [
        // sub1 是 key 选中用的
        getItem('练习一', 'sub1', <MailOutlined />, [
            getItem('首页', '/detail'),
            getItem('统计', '/form'),
            getItem('推荐', '2'),
        ]),
        getItem('分类', 'sub2', <AppstoreOutlined />, [
            getItem('更多', 'sub3', null, [
                getItem('分类 7', '7'),
                getItem('分类 8', '8'),
            ]),
        ]),
    ];

    // 点击切换 menu 选中

    const rootSubmenuKeys = ['sub1', 'sub2'];

    const onOpenChange = (keys) => {
        const latestOpenKey = keys.find(key => !openKeys.includes(key));
        if (!rootSubmenuKeys.includes(latestOpenKey)) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    }

    const onSelect = (item) => {
        const { selectedKeys, key } = item
        setSelected(selectedKeys) // 修改选中的 menu
        history.push(key)
    }


    return (
        <div className="MainLayOutBox">
            <Menu
                mode="inline"
                openKeys={openKeys} // 默认展开哪个菜单
                onOpenChange={onOpenChange} // 展开 menu 的监听
                onSelect={onSelect} // 点击选中的监听
                selectedKeys={selected} // selectedKeys 菜单选中
                style={{ width: 270 }}
                items={items} // menu 数据
            />

            {/* 右侧的布局 */}
            <div className="MainLayOutRight">
                <div className='MainLayOutRightTop'>
                    <Bread />
                </div>
                <div className='MainLayOutRightBoom'>
                    {props.children}
                </div>
            </div>
        </div>
    )
}

