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

    it('compiles to CLVM and serializes as hex', async () => {
        const chialisp = new Chialisp(exampleProgram);
        const hex = await chialisp.hex();

        expect(hex).toBe('ff02ffff01ff02ffff03ffff09ffff0bff0580ffff01a02cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b982480ffff01ff04ffff04ff02ffff04ff0bffff04ff17ff80808080ff8080ffff01ff088080ff0180ffff04ffff0133ff018080');
    });

    it('compiles to CLVM and gets the tree hash', async () => {
        const chialisp = new Chialisp(exampleProgram);
        const hash = await chialisp.hash();

        expect(hash).toBe('4843c869bba5f65aa1e806cd372dae5668ca3b69640d067e86837ca96b324e71');
    });
});
