# 🔐 Sistema de Autenticación - Next.js + Material-UI

Sistema de login profesional con arquitectura escalable y limpia.

## 📁 Estructura del Proyecto

```
├── app/
│   ├── page.tsx                  # ✅ Login (Página principal)
│   └── layout.tsx                # Layout global
├── components/
│   └── auth/
│       └── LoginForm.tsx         # Componente del formulario
├── hooks/
│   └── useAuth.ts                # Hook de autenticación
├── services/
│   └── auth.service.ts           # ⚠️ CONFIGURA AQUÍ TU API
├── lib/
│   └── api.ts                    # Cliente HTTP base
└── types/
    └── auth.types.ts             # Tipos TypeScript
```

## 🚀 Inicio Rápido

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar variables de entorno

Crea un archivo `.env.local`:

```env
NEXT_PUBLIC_API_URL=https://tu-api.com
```

### 3. Configurar tu endpoint

Edita `services/auth.service.ts` línea 17:

```typescript
const response = await apiClient.post<ILoginResponse>(
  '/api/auth/login', // 👈 CAMBIA ESTO por tu endpoint
  credentials
);
```

### 4. Ejecutar el proyecto

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

## 📋 API Response Format

Tu API debe responder con este formato:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": "3600"
}
```

Si tu API usa un formato diferente, actualiza `types/auth.types.ts`:

```typescript
export interface ILoginResponse {
  access_token: string;
  token_type: string;
  expires_in: string;
}
```

## ✨ Características

✅ **Arquitectura Limpia**
- Separación de responsabilidades
- Service Layer Pattern
- Custom Hooks

✅ **Material-UI**
- Componentes modernos y responsive
- Validación en tiempo real
- Estados de carga y error

✅ **TypeScript**
- Type-safe en todas las capas
- Interfaces bien definidas

✅ **Seguridad**
- Manejo automático de tokens
- Timeout en peticiones
- Error handling robusto

## 🔧 Configuración Adicional

### Cambiar ruta de redirección post-login

Edita `hooks/useAuth.ts` línea 27:

```typescript
router.push('/dashboard'); // 👈 CAMBIA ESTO
```

### Personalizar validaciones

Edita `components/auth/LoginForm.tsx` en la función `validateForm()`.

## 📦 Tecnologías

- **Next.js 16** - Framework React
- **Material-UI 7** - Componentes UI
- **TypeScript** - Type safety
- **React 19** - Library

## 🧪 Testing con Mock

Para probar sin API, puedes usar un mock temporal en `auth.service.ts`:

```typescript
// Comentar la llamada real y descomentar esto:
return new Promise((resolve) => {
  setTimeout(() => {
    resolve({
      access_token: 'mock-token-123',
      token_type: 'Bearer',
      expires_in: '3600'
    });
  }, 1000);
});
```

## 📝 Próximos Pasos

1. ✅ Configurar tu endpoint de API
2. ✅ Ajustar la respuesta según tu backend
3. ⬜ Crear página de dashboard
4. ⬜ Implementar refresh token
5. ⬜ Agregar recuperación de contraseña

---

💡 **Nota**: El login está en la ruta principal `/` del proyecto.
