import observe from './observe';
import Watcher from './Watcher';
var obj = {
    a: {
        m: {
            n: 5
        }
    },
    b: 10,
    c: [10, 23, 23, 32]
};



observe(obj);
obj.a = 10;
obj.c.push(1);

