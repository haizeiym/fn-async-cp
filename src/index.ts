type p = () => Promise<any>;
export default class FnAsyncExe {
    private _curCount: number;
    private _allCount: number;

    private _endCall: Function | null;

    constructor(allCount: number, endCall: Function) {
        this._curCount = 0;
        this._allCount = allCount;
        this._endCall = endCall;
    }

    public fnExe(fn: Function | p | null = null) {
        let res = fn && fn();
        if (res) {
            if (res instanceof Promise) {
                res.then(() => {
                    this._exe();
                });
                return;
            }
        }
        this._exe();
    }

    public desFn() {
        this._curCount = 0;
        this._allCount = 0;
        this._endCall = null;
    }

    private _exe() {
        this._curCount++;
        if (this._curCount === this._allCount) {
            this._curCount = 0;
            this._endCall && this._endCall();
        }
    }
}