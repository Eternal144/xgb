import React from 'react';
import '../../styles/common/Loading.scss';

const Load = () => {
    return (
        <div id="loadbg">
            <div id="load">
                <div>天</div>
                <div>津</div>
                <div>大</div>
                <div>学</div>
                <div>党</div>
                <div>委</div>
                <div>学</div>
                <div>工</div>
                <div>部</div>
            </div>
            <div id="load-alert">若长时间未加载成功<br></br>请检查网络设置</div>
        </div>
    )
}

export default Load;