
## 表格组件(带分页)

### tableConfig : 表格配置文件
> **类型: `Object`**
```
 {
    align: 'center', // 不必填 默认为center
    selection: 'single', // 不必填 多选: multiple  单选: single  默认为 normal
    index: true, // 不必填 序号
    pagination: true, // 不必填 分页 默认为true
    column: [
        {
            label: '姓名', // 必填
            prop: 'archivesInfoId.name', // 必填
            sortable: true, // 不必填 排序字段, 默认为true
            formatter: (row, column) => {
              return row.name
            }
          },
        {
        slot: 'handle', // 不必填 单列插槽
        label: '操作', // 必填
        fixed: 'right', // 不必填 固定列  left right
        width: '150' // 不必填
        }
    ]
}
```
### tableData : 数据数组
> **类型: `Array`**

 备注:若需要单行增加类名,需在单条数据中增加`className`字段


### total : 数据总量
> **类型: `Number`**


### @updatePage : 更新`pageNo`或`pageSize`时调用