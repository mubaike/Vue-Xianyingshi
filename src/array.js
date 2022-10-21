import { def } from "./utils";

// 得到Array.prototype
const arrayPrototype = Array.prototype;

//以Array.prototype为原型创建arrayMethods对象
//暴露
export const arrayMethods = Object.create(arrayPrototype);

//要被改写的7个数组方法
const methodsNeedChange = [
    'push',
    'pop',
    'shift',
    'unshift',
    'splice',
    'sort',
    'reverse'
];

methodsNeedChange.forEach(methodName => {
    //备份原来的方法，因为push，pop等7个函数的功能不能被剥夺
    const original = arrayPrototype[methodName];

    //定义新的方法
    def(arrayMethods, methodName, function () {
        //恢复原来的功能
        const result = original.apply(this, arguments);

        //把类数组对象变为数组
        const args = [...arguments];

        //把这个数组身上的__ob__取出来
        const ob = this.__ob__;

        // 有三种方法push\unshift\splice 能够插入新项，现在要把插入的新项也要变为observe的
        let inserted = [];

        switch (methodName) {
            case 'push':
            case 'unshift':
                inserted = args;
                break;
            case 'splice':
                //splice格式是splice（下标，数量，插入的新项）
                inserted = args.slice(2);
                break;
        }

        //判断有没有要插入的新项，让新项也变为响应的
        if (inserted) {
            ob.observeArray(inserted);
        }

        console.log('啦啦啦');

        ob.dep.notify();
        
        return result;
    }, false);
})