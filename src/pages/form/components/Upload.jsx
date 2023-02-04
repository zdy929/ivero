import React, { useState } from 'react'
import shortid from "shortid"
import { Upload, Button, } from 'antd';


function MyUpload() {

    const [fileList, setFilelist] = useState([]);

    // 上传图片
    // 大小  60kb 以内 1kb===102字节
    // 图片格式  只支持 png
    // 图片最多上传3张
    const onBeforeUpload = async file => {
        const { type, size } = file;

        if (!['image/png', 'image/jpeg'].includes(type)) {
            message.warning('图片只支持 JPG和png,请重新上传')
            return false;
        }


        // 大小10kb以内
        if (size > 60 * 1024) {
            message.warning('您的图片大于108k,请重新上传')
            return false;
        }

        if (fileList.length > 2) {
            message.warning('最多上传三张')
            return false;
        }

        const formData = new FormData();
        formData.append('file', file);



        // 请求上传接口
        // dispatch  返回一个 promise
        const imageUrl = await dispatch({
            type: "form/fetchUpload",
            payload: formData,
        })

        setFilelist([
            ...fileList,
            {
                uid: shortid.generate(),//uid必须唯一
                name: "image.png",
                status: "done",
                url: imageUrl,
            }
        ])


        // 自动取请求不触发
        return false
    }

    // 清空上传图片方式
    const onRemove = file => {
        setFilelist(fileList.filter(dt => dt.uid != file.uid))
    }
    return (
        <Upload
            fileList={fileList} // fileList 展示上传缩略图列表
            beforeUpload={onBeforeUpload} // 上传之前的钩子
            onRemove={onRemove} // 删除事件
            listType="picture-card"
        >
            <Button>上传</Button>
        </Upload>
    )
}

export default MyUpload