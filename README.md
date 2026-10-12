# Scientific Conference Manager

Aplicación web para la gestión de datos de una conferencia científica.

## 📋 Requisitos previos

Antes de comenzar, asegúrate de tener instaladas las siguientes herramientas:

- **Python 3.10 o superior**
- **Node.js (versión LTS)**
- **Git**
- Acceso a las credenciales de Supabase del proyecto

## 🚀 Instalación y configuración

Sigue los pasos a continuación para ejecutar el proyecto en tu entorno local.

### 1. Clonar el repositorio

Abre una terminal y ejecuta los siguientes comandos:

```bash
git clone https://github.com/jaiver-qe/scientific-conference-manager.git
cd scientific-conference-manager
```

### 2. Crear y activar el entorno virtual de Python

Desde la carpeta raíz del proyecto, crea un entorno virtual para instalar las dependencias del backend.

**Windows (PowerShell):**

```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
```

**macOS / Linux:**

```bash
python3 -m venv venv
source venv/bin/activate
```

> **Nota:** Mantén el entorno virtual activado mientras trabajas con el backend.

### 3. Instalar las dependencias del backend

Con el entorno virtual activado, ejecuta:

```bash
pip install -r backend/requirements.txt
```

Este comando instalará las dependencias necesarias para el backend desarrollado con Django REST Framework.

### 4. Configurar las variables de entorno

1. Ingresa a la carpeta `backend/`.
2. Busca el archivo `.env.example`.
3. Crea una copia y nómbrala exactamente `.env`.
4. Configura las credenciales de conexión a Supabase.

Reemplaza el marcador `[TU_CONTRASEÑA_DE_SUPABASE]` por la credencial proporcionada por el grupo. Si es necesario, solicita la variable `DATABASE_URL` completa a través del canal privado del equipo.

**Importante:** No compartas las credenciales ni subas el archivo `.env` al repositorio.

### 5. Ejecutar las migraciones de la base de datos

Desde la raíz del proyecto, ingresa a la carpeta del backend:

```bash
cd backend
```

Ejecuta las migraciones para sincronizar la estructura de la base de datos:

```bash
python manage.py migrate
```

### 6. Iniciar el servidor del backend

Desde la carpeta `backend/`, ejecuta:

```bash
python manage.py runserver
```

El servidor de Django estará disponible en:

http://127.0.0.1:8000/

Deja esta terminal abierta mientras utilizas la aplicación.

### 7. Instalar las dependencias del frontend

Abre una **nueva terminal** y regresa a la carpeta raíz del proyecto. Si estás en la carpeta `backend/`, ejecuta:

```bash
cd ..
```

Luego, ingresa a la carpeta del frontend:

```bash
cd frontend
```

Instala las dependencias de Node.js:

```bash
npm install
```

### 8. Iniciar el servidor del frontend

Desde la carpeta `frontend/`, ejecuta:

```bash
npm run dev
```

La aplicación web estará disponible en:

http://localhost:5173/

## 🖥️ Tecnologías utilizadas

- **Backend:** Python y Django REST Framework
- **Base de datos:** Supabase
- **Frontend:** React y Vite
- **Control de versiones:** Git

## ✅ Ejecución del proyecto

Para utilizar la aplicación, asegúrate de que ambos servidores estén funcionando:

| Componente | Comando | Dirección local |
|---|---|---|
| Backend | `python manage.py runserver` | http://127.0.0.1:8000/ |
| Frontend | `npm run dev` | http://localhost:5173/ |

**Importante:** Ejecuta cada servidor en su propia terminal. El entorno virtual de Python debe estar activado en la terminal del backend.

