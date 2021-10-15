import { go, setPrintFunction } from 'clvm_tools';
import { Program } from './Program';

export class Clvm implements Program {
    public constructor(private readonly clvm: string) {}

    public async hex(): Promise<string> {
        return new Promise(resolve => {
            setPrintFunction(hex => resolve(hex));
            go('opc', '-H', this.clvm);
        });
    }

    public toString(): string {
        return this.clvm;
    }
}
