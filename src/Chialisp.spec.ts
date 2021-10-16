import { Chialisp } from './Chialisp';

const exampleProgram = `
(mod (password new_puzhash amount)
    (defconstant CREATE_COIN 51)

    (if (= (sha256 password) (q . 0x2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824))
        (list (list CREATE_COIN new_puzhash amount))
        (x)
    )
)`;

describe('Chialisp', () => {
    it('compiles a Chialisp program to CLVM', async () => {
        const chialisp = new Chialisp(exampleProgram);

        const clvm = await chialisp.clvm();

        expect(clvm.toString()).toBe('(a (q 2 (i (= (sha256 5) (q . 0x2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824)) (q 4 (c 2 (c 11 (c 23 ()))) ()) (q 8)) 1) (c (q . 51) 1))');
    });

    it('serializes a Chialisp program as hex', async () => {
        const chialisp = new Chialisp(exampleProgram);
        const hex = await chialisp.hex();

        expect(hex).toBe('4843c869bba5f65aa1e806cd372dae5668ca3b69640d067e86837ca96b324e71');
    });
});
