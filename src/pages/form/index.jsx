import React, { useEffect, useState } from 'react';
import './style.less';
import { history } from "umi"
import { Input, Form, Upload, DatePicker, Checkbox, Button, Space, Col, Row, message } from 'antd';
import { connect } from "dva"
import shortid from "shortid"
const { RangePicker } = DatePicker
import moment from "moment"


function MyForm(props) {
    const { dispatch, data, dataSource, count } = props;
    const [form] = Form.useForm();
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
    const { id } = props.match.params;

    useEffect(() => {
        dispatch({
            type: "form/fetchsampleInfo",
            payload: {
                token: "yKVp8WvwJLVt4KcxlN69lEjtHHTby8Nu",
                id
            }
        })
    }, [])

    useEffect(() => {
        form.setFieldsValue({
            ...data,
            timedate: moment(data.timedate),
            id,
           
        })
        const imagesx =data.images
        // const arr = imagesx.map(url =>({
            
        //         uid: shortid.generate(),//uid必须唯一
        //         name: "image.png",
        //         status: "done",
        //         url,
            
        // }))
        console.log(imagesx)
        // setFilelist(arr)
        // console.log(data.images[0])
        // setFilelist([
        //     // ...fileList,
        //     {
        //         uid: shortid.generate(),//uid必须唯一
        //         name: "image.png",
        //         status: "done",
        //         url: data.images[0],
        //     }
        // ])
        // const images = JSON.parse(data.info).images;
        // console.log(images)
        // form.setFieldValue(data)
    }, [data])


    const timer = v => new Date(v).getTime();

    // 提交按钮
    const onFinishFn = value => {
        // 判断id是否添加或回填
        if (id) {
            dispatch({
                type: "form/fetchsampleInfo",
                payload: {
                    token: "yKVp8WvwJLVt4KcxlN69lEjtHHTby8Nu",
                    info: {
                        id,
                        ...value,
                        timedate: moment(data.timedate),
                        // timerone,
                        // images: fileList.map(v => v.url),
                    }
                }
            })
            console.log(data)

        } else {
            const timerone = timer(value.date);
            console.log(timerone, '31112123132')
            dispatch({
                type: "form/fetchAddtable",
                payload: {
                    info: {
                        timedate: moment(data.timedate),
                        images: fileList.map(v => v.url),
                        ...value,
                    },
                    token: "yKVp8WvwJLVt4KcxlN69lEjtHHTby8Nu",
                }
            })
            history.push('/detail')
        }
    }

    // console.log(fileList, 'setFilelist');

    return (
        <Form
            form={form}
            onFinish={onFinishFn}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 10 }}
            className="FormBox"
        >
            {/* 标题 */}
            <Form.Item
                label="标题"
                name="title"
                rules={[{ required: true, message: '标题为必填字段' }]}
            >
                <Input placeholder="标题" />
            </Form.Item>

            {/* 日期 */}
            <Form.Item
                label="日期"
                name="timedate"
                rules={[{ required: true, message: '日期为必填字段' }]}
            >
                <DatePicker format="YYYY/MM/DD" />
            </Form.Item>

            {/* 上传 */}
            <Form.Item
                label="上传图片"
                rules={[{ required: true, message: "上传图片为必填字段" }]}
            >
                <Upload
                    fileList={fileList} // fileList 展示上传缩略图列表
                    beforeUpload={onBeforeUpload} // 上传之前的钩子
                    onRemove={onRemove} // 删除事件
                    listType="picture-card"
                >
                    <Button>上传</Button>
                </Upload>
            </Form.Item>

            {/* tag */}
            <Form.Item
                name="tag"
                label="tag"
                rules={[
                    { required: true, message: "tag为必填字段" }
                ]}
            >
                {/* <Checkbox>详情</Checkbox> */}
                <Checkbox.Group>
                    <Row>
                        <Col span={8}>
                            <Checkbox value="详情" style={{ lineHeight: '32px' }}>
                                详情
                            </Checkbox>
                        </Col>
                        <Col span={8}>
                            <Checkbox value="作者" style={{ lineHeight: '32px' }}>
                                作者
                            </Checkbox>
                        </Col>
                        <Col span={8}>
                            <Checkbox value="国家" style={{ lineHeight: '32px' }}>
                                国家
                            </Checkbox>
                        </Col>
                        <Col span={8}>
                            <Checkbox value="类型" style={{ lineHeight: '32px' }}>
                                类型
                            </Checkbox>
                        </Col>
                        <Col span={8}>
                            <Checkbox value="热度" style={{ lineHeight: '32px' }}>
                                热度
                            </Checkbox>
                        </Col>
                        <Col span={8}>
                            <Checkbox value="URL" style={{ lineHeight: '32px' }}>
                                URL
                            </Checkbox>
                        </Col>
                    </Row>
                </Checkbox.Group>
            </Form.Item>

            {/* 文本域 */}
            <Form.Item
                name="textfild"
                label="文本域"
                rules={[{ required: true, message: '文本域为必填字段' }]}
            >
                <Input.TextArea placeholder="请输入你要输入的内容" />
            </Form.Item>

            {/* 按钮提交 */}
            <Form.Item wrapperCol={{ offset: 10 }}>
                <Space>
                    <Button htmlType='submit' type="primary">提交</Button>
                    <Button type="link">取消</Button>
                </Space>
            </Form.Item>
        </Form>
    );
}

export default connect((state) => {
    return {
        dataSource: state.form.dataSource,
        count: state.form.count,
        data: state.form.data
    }
})(MyForm);
