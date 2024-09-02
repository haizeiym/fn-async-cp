type fp = Function | undefined | null;

export default class FnAsync {
    public curCount: number = 0;
    public allCount: number = 0;

    private _endCall: fp;

    public fnExe(fn?: fp) {
        let res = fn && fn(this.curCount);
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

    public reset = () => this.curCount = 0;

    public setEndCall = (endCall: fp) => this._endCall = endCall;

    private _exe() {
        this.curCount++;
        if (this.curCount === this.allCount) {
            this.curCount = 0;
            this._endCall && this._endCall();
        }
    }
}