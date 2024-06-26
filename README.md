```javascript
import FnAsync from "fn-async-cp";

let endCall = () => {
  consloe.log("结束");
};

let _fnAsync = new FnAsync(endCall, 5);

_fnAsync.fnExe();

setTimeout(() => {
  _fnAsync.fnExe((index: number) => {
    consloe.log(index);
  });
}, 2000);
_fnAsync.fnExe();

_fnAsync.fnExe(
  (index: number) =>
    new Promise((reslove, reject) => {
      setTimeout(() => {
        reslove(index);
      }, 3000);
    })
);
_fnAsync.fnExe();


```
