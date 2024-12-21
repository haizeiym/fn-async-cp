type AsyncFunction = (() => Promise<void>) | (() => void);
type CallbackFunction = (count: number) => Promise<void> | void | undefined | null;

export default class FnAsync {
    private readonly _initialCount: number = 0;
    private _curCount: number = this._initialCount;
    private _allCount: number = 0;
    private _endCall?: AsyncFunction;

    constructor(allCount: number = 0) {
        this.allCount = allCount;
    }

    /**
     * 获取总计数
     */
    public get allCount(): number {
        return this._allCount;
    }

    /**
     * 设置总计数
     */
    public set allCount(count: number) {
        if (count < 0) {
            console.warn('allCount cannot be negative, setting to 0');
            this._allCount = 0;
            return;
        }
        this._allCount = count;
    }

    /**
     * 执行传入的函数，并在适当时机触发计数器
     * @param fn 要执行的回调函数
     */
    public async fnExe(fn?: CallbackFunction): Promise<void> {
        if (!fn) {
            this._exe();
            return;
        }

        const result = fn(this._curCount);
        if (result instanceof Promise) {
            await result.catch(error => {
                console.error('Error in async callback:', error);
            });
        }
        
        this._exe();
    }

    /**
     * 重置计数器到初始状态
     */
    public reset = (): void => {
        this._curCount = this._initialCount;
    }

    /**
     * 设置结束回调函数
     * @param endCall 结束时要调用的函数
     */
    public setEndCall = (endCall: AsyncFunction): void => {
        this._endCall = endCall;
    }

    /**
     * 内部执行函数，处理计数逻辑
     */
    private _exe(): void {
        this._curCount++;
        if (this._curCount === this._allCount) {
            this._curCount = this._initialCount;
            this._endCall?.();
        }
    }

    /**
     * 获取当前计数
     */
    public get curCount(): number {
        return this._curCount;
    }

    /**
     * 设置当前计数
     */
    private set curCount(value: number) {
        this._curCount = value;
    }
}