
## 行内搜索组件(表格)

### searchoptions
> 类型: `Array`
 - **input**
    ```
        {
            type: 'input',  // 必填
            placeholder: '请输入姓名', //非必填 默认为 请输入
            key: 'name', // 必填
            label: '姓名', // 必填
            defaultVal: '测试' // 非必填 默认值
        }
    ```
- **select**
    ```
    {
        type: 'select', // 必填
        placeholder: '请选择', //非必填 默认为 请选择
        key: 'role', // 必填
        filterable: true, // 非必填 默认为true
        multiple: true,  // 非必填 多选
        label: '角色', // 必填
        options: [ //必填 选项数组
            {
                value: '1',
                label: '角色1'
            }
        ],
        defaultVal: ['1', '5'] // 非必填 默认值
    }
    ```
- **datepicker**
    ```
    {
        type: 'datetimerange', // 必填 'daterange', 'datetimerange', 'timerange'
        startPlaceholder: '选择开始时间', //非必填 默认为 开始时间
        endPlaceholder: '选择结束时间', //非必填 默认为 结束时间
        key: 'datetime', // 必填
        label: '日期时间', // 必填
        defaultVal: ['2021-06-12 12:00:00', '2021-06-13 17:05:03']// 非必填 默认值
    }
    ```

### @search
> 类型: Function
> 返回: Object  筛选项中所有值, 涉及到时间的均转换为key+StartTime/EndTime