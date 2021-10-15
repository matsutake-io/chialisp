import { Clvm } from './Clvm';

const exampleProgram = '(a (q 2 (i (= (sha256 5) (q . 0x2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824)) (q 4 (c 2 (c 11 (c 23 ()))) ()) (q 8)) 1) (c (q . 51) 1))';

describe('Clvm', () => {
    it('serializes a Clvm program as hex', async () => {
        const clvm = new Clvm(exampleProgram);
        const hex = await clvm.hex();

        expect(hex).toBe('4843c869bba5f65aa1e806cd372dae5668ca3b69640d067e86837ca96b324e71');
    });
});
