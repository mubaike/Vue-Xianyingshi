import lookup from "./lookup";
import renderTemplate from "./renderTemplate";
/*
    处理数组，结合renderTemplate实现递归
*/

export default function parseArray(token, data) {
    //得到整体数据data中这个数组要使用的部分
    var v = lookup(data, token[1]);
    //结果字符串
    var resultStr = '';
    //遍历数组，v一定是数组
    for (let i = 0; i < v.length; i++) {
        //这里要补一个“.”属性
        //拼接
        resultStr += renderTemplate(token[2], {
            ...v[i],
            '.': v[i]
        });
    }
    return resultStr;
}