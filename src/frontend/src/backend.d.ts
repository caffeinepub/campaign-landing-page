import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Signup {
    name: string;
    email: string;
}
export interface backendInterface {
    addSupporter(name: string, email: string): Promise<void>;
    getSignups(): Promise<Array<Signup>>;
    getSupporterCount(): Promise<bigint>;
}
