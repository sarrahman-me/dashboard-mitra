const formRegister = [
  {
    type: "text",
    label: "Nama",
    name: "nama",
    placeholder: "Jhon Doe",
  },
  {
    type: "email",
    label: "Email",
    name: "email",
    placeholder: "contoh@email.com",
  },
  {
    type: "number",
    label: "Whatsapp",
    name: "whatsapp",
    placeholder: "08123456789",
  },
  {
    type: "password",
    label: "Password",
    name: "password",
    placeholder: "******",
  },
];

const formVerifyEmail = [
  {
    type: "number",
    label: "Kode verifikasi",
    name: "code",
    placeholder: "* * * * *",
  },
];

const formLogin = [
  {
    type: "text",
    label: "Akun",
    name: "akun",
    placeholder: "Email atau Whatsapp",
  },
  {
    type: "password",
    label: "Password",
    name: "password",
    placeholder: "******",
  },
];

export { formRegister, formVerifyEmail, formLogin };
