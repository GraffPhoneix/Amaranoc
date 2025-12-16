'use client'

import localConfigs from "@.../configs/local.configs";
import { useState, useEffect } from "react";

export function RegisterFields() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  function handleChange(field: string, value: string) {
    switch (field) {
      case 'fullName':
        setFullName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'phone':
        setPhone(value);
        break;
      case 'password':
        setPassword(value);
        break;
    }
  }

  useEffect(() => {
    localStorage.setItem(
      'userRegisterData',
      JSON.stringify({
        fullName,
        email,
        phone,
        password,
      })
    );
  }, [fullName, email, phone, password]);

  return localConfigs.registerFormFilds.map((field) => (
    <div key={field.content}>
      <input
        type={field.type}
        placeholder={field.placeholderContent}
        value={
          field.content === 'fullName' ? fullName :
          field.content === 'email' ? email :
          field.content === 'phone' ? phone :
          field.content === 'password' ? password :
          ''
        }
        onChange={(e) => handleChange(field.content, e.target.value)}
        className="w-full rounded-lg border px-3 py-2.5"
      />
    </div>
  ));
}
