type fp = Function | undefined | null;

export default class FnAsync {
    private _curCount: number;
    private _allCount: number | undefined;

    private _endCall: fp;

    public get allCount(): number | undefined {
        return this._allCount;
    }

    public set allCount(value: number) {
        this._allCount = value;
    }

    public get curCount(): number {
        return this._curCount;
    }

    constructor(a1?: fp, a2?: number) {
        this._curCount = 0;
        this._endCall = a1;
        this._allCount = a2;
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

    public reset = () => this._curCount = 0;

    public setEndCall = (endCall: fp) => this._endCall = endCall;

    private _exe() {
        this._curCount++;
        if (this._curCount === this._allCount) {
            this._curCount = 0;
            this._endCall && this._endCall();
        }
    }
}