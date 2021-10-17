import { go, setPrintFunction } from 'clvm_tools/browser';
import { Clvm } from './Clvm';
import { Program } from '../src/Program';

export class Chialisp implements Program {
    constructor(private readonly chialisp: string) {}

    public async hex(): Promise<string> {
        const clvm = await this.clvm();

        return clvm.hex();
    }

    public async hash(): Promise<string> {
        const clvm = await this.clvm();

        return clvm.hash();
    }

    public async clvm(): Promise<Clvm> {
        return new Promise(resolve => {
            setPrintFunction(clvm => resolve(new Clvm(clvm)));
            go('run', this.chialisp);
        });
    }
}
