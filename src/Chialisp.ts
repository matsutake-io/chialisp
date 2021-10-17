import { go, setPrintFunction } from 'clvm_tools';
import { go as browserGo, setPrintFunction as browserSetPrintFunction } from 'clvm_tools/browser';
import { Clvm } from './Clvm';
import { Program } from './Program';

export class Chialisp implements Program {
    constructor(private readonly chialisp: string, private readonly browser = true) {}

    public async hex(): Promise<string> {
        const clvm = await this.clvm(this.browser);

        return clvm.hex();
    }

    public async clvm(browser: boolean = true): Promise<Clvm> {
        return new Promise(resolve => {
            if (this.browser) {
                browserSetPrintFunction(clvm => resolve(new Clvm(clvm, browser)));
                browserGo('run', this.chialisp);

                return;
            }

            setPrintFunction(clvm => resolve(new Clvm(clvm, browser)));
            go('run', this.chialisp);
        });
    }
}
