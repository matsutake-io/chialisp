import { go, setPrintFunction } from 'clvm_tools';
import { go as browserGo, setPrintFunction as browserSetPrintFunction } from 'clvm_tools/browser';
import { Program } from './Program';

export class Clvm implements Program {
    public constructor(private readonly clvm: string, private readonly browser = true) {}

    public async hex(): Promise<string> {
        return new Promise(resolve => {
            if (this.browser) {
                browserSetPrintFunction(hex => resolve(hex));
                browserGo('opc', '-H', this.clvm);

                return;
            }

            setPrintFunction(hex => resolve(hex));
            go('opc', '-H', this.clvm);
        });
    }

    public toString(): string {
        return this.clvm;
    }
}
