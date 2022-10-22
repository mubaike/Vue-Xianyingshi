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
new Watcher(obj, 'a.m.n', (val) => {
    console.log('aaaa',val);
});

obj.a.m.n = 88;


