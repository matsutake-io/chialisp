# Matsutake Chialisp

Compile Chialisp to CLVM and serialize as hex from your web browser.

```TypeScript
const exampleProgram = `
(mod (password new_puzhash amount)
    (defconstant CREATE_COIN 51)

    (if (= (sha256 password) (q . 0x2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824))
        (list (list CREATE_COIN new_puzhash amount))
        (x)
    )
)`;
const chialisp = new Chialisp(exampleProgram);
const hex = await chialisp.hex();

expect(hex).toBe('4843c869bba5f65aa1e806cd372dae5668ca3b69640d067e86837ca96b324e71');
```

The hex form can be used to spend coins on the Chia Blockchain. Please enjoy!

[matsutake.io](https://www.matsutake.io)