export interface Program {
    hex(): Promise<string>;
    hash(): Promise<string>;
}
