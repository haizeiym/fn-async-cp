type fp = Function | ((args?: any) => Promise<any>);

export default class FnAsyncExe {
    private _curCount: number;
    private _allCount: number;

    private _endCall: fp;

    public get curCount(): number {
        return this._curCount;
    }

    public get allCount(): number {
        return this._allCount;
    }

    constructor(allCount: number, endCall: fp) {
        this._curCount = 0;
        this._allCount = allCount;
        this._endCall = endCall;
    }

    public fnExe(fn?: fp) {
        let res = fn && fn(this._curCount);
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

    public reset() {
        this._curCount = 0;
    }

    public setAllCount(nCount: number) {
        this._allCount = nCount;
    }

    private _exe() {
        this._curCount++;
        if (this._curCount === this._allCount) {
            this._curCount = 0;
            this._endCall();
        }
    }
}