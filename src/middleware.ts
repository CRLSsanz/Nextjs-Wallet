export { default } from "next-auth/middleware";

export const config = { matcher: ["/about"] };

// Solo funciona en LOCAL--- mejor quitar los accesos, no poner nada
//export const config = { matcher: ["/analytics", "/form", "/history"] };
